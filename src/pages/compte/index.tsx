import { Breadcrumb, PageLayout } from '@/components'
import { SeoModel } from '@/api/models'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { UserCoursesTable } from '@/components/Table'

const Account = () => {

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
                <div className="app-form">

                </div>
            </div>

            <div className="courses wrapper">
                <UserCoursesTable />
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