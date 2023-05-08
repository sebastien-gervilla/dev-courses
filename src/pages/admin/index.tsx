import { Breadcrumb, PageLayout, Table } from '@/components'
import { SeoModel } from '@/api/models'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { TutorialsTable } from '@/components/Table'

const Admin = () => {

    const [tab, setTab] = useState<AdminTab>('user');

    const displayTable = () => {
        if (tab === 'user')
            return;
    }

    return (
        <PageLayout id='admin-page' seo={adminPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <Breadcrumb links={[
                        {
                            title: 'Administration',
                            href: '/admin'
                        }
                    ]} />
                    <h1>Administration</h1>
                </div>
            </div>

            <div className="tabs wrapper">
                <button>Utilisateurs</button>
                <button>Tutoriels</button>
                <button>Blog</button>
            </div>

            <div className="datagrid wrapper">
                <TutorialsTable />
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

type AdminTab = 'user' | 'tutorial' | 'blog';

const adminPageSeo: SeoModel = {
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

export default Admin;