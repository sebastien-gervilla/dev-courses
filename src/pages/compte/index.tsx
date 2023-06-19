import { Breadcrumb, ConfirmModal, Modal, PageLayout } from '@/components'
import { SeoModel, UserModel, UserTutorialModel } from '@/api/models'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { UserTutorialsTable } from '@/components/Table'
import { AccountForm } from '@/components/Form'
import { useContext } from 'react'
import { AuthContext } from '@/contexts'
import { redirect } from '@/utils/next-utils'
import PasswordForm from '@/components/Form/PasswordForm'
import { useModal } from '@/hooks'

interface AccountProps {
    userTutorials: UserTutorialModel[]
}

const Account = ({ userTutorials }: AccountProps) => {

    const { user, refresh } = useContext(AuthContext);

    const modal = useModal();

    const handleUnsubscribe = async () => {
        if (!user?._id) return;

        const res = await Request.delete('/user/' + user._id);

        if(res.ok) refresh();
    }

    return (
        <PageLayout id='account-page' seo={accountPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <Breadcrumb links={[
                        {
                            title: 'Compte',
                            href: '/compte'
                        }
                    ]} />
                    <h1>Compte</h1>
                </div>
            </div>
            <div className="account wrapper">
                <div className="account-content">
                    <div className={"infos" + (user?.isAdmin ? ' admin' : '')}>
                        <div className="info">
                            <h2>Informations</h2>
                            <AccountForm initialUser={user} refresh={refresh} />
                        </div>
                        <div className="info">
                            <h2>Sécurité</h2>
                            <PasswordForm userId={user?._id} refresh={refresh} />
                        </div>
                        <div className="info">
                            <h2>Gestion du compte</h2>
                            <button 
                                className='animated filled red'
                                onClick={() => modal.openWith(
                                    <ConfirmModal 
                                        message='Souhaitez-vous vraiment vous désinscrire ?'
                                        onConfirm={handleUnsubscribe}
                                        onCancel={modal.close}
                                    />
                                )}
                            >
                                Se désinscrire
                            </button>
                        </div>
                    </div>
                    {!user?.isAdmin && 
                        <div className="courses">
                            <h2>Tutoriels suivis</h2>
                            <UserTutorialsTable tutorials={userTutorials} />
                        </div>}
                </div>
            </div>
            <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={modal.body}
            />
        </PageLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { cookie } = context.req.headers;
    const userRes = await Request.srvGet('/user/auth', cookie);
    

    if (!userRes.ok) return redirect('/');

    const user: UserModel = userRes.data;
    if (user.isAdmin) return {
        props: { userTutorials: [] }
    };

    const userTutorials = await Request.srvGet('/user/tutorials', cookie);

    return {
        props: {
            userTutorials: userTutorials.data
        }
    };
}

const accountPageSeo: SeoModel = {
    metaTitle: 'devCourses',
    metaDescription: 'This is my website',
    sharedImage: {
        _id: "websiteSharedImage",
        url: "/home-shared-image.png",
        alt: "Image of this website",
        width: 1080,
        height: 720
    },
    pageType: 'website'
}

export default Account;