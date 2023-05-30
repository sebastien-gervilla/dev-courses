import { Breadcrumb, PageLayout } from '@/components'
import { SeoModel } from '@/api/models'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { UserTutorialsTable } from '@/components/Table'
import { AccountForm } from '@/components/Form'
import { useContext } from 'react'
import { AuthContext } from '@/contexts'

const Account = () => {

    const { user } = useContext(AuthContext);

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
                    <div className="infos">
                        <h2>Informations</h2>
                        <AccountForm initialUser={user} />
                    </div>
                    <div className="courses">
                        <h2>Tutoriels suivis</h2>
                        <UserTutorialsTable />
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const userRes = await Request.get('/user/auth', {
        headers: {
            'Content-Type': 'application/json',
            Cookie: context.req?.headers.cookie || ''
        }
    });

    if (!userRes.ok)
        return {
            props: {},
            redirect: {
                destination: '/'
            }
        }

    return {
        props: {}
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