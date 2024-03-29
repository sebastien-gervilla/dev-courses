import { Breadcrumb, PageLayout, Tabs } from '@/components'
import { SeoModel } from '@/api/models'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { TutorialsTable, UsersTable } from '@/components/Table'

const Admin = () => {

    const [tab, setTab] = useState<TabType>('Tutoriels');

    const changeTab = (name: string, value: string) => setTab(value as TabType);

    const displayTable = () => {
        if (tab === 'Utilisateurs')
            return <UsersTable />;
        if (tab === 'Tutoriels')
            return <TutorialsTable />;
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

            <div className="categories wrapper">
                <Tabs 
                    name='tab'
                    value={tab}
                    options={allTabs}
                    onChange={changeTab}
                />
            </div>

            <div className="datagrid wrapper">
                {displayTable()}
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

const allTabs = ['Tutoriels', 'Utilisateurs'];

type TabType = 'Tutoriels' | 'Utilisateurs';

const adminPageSeo: SeoModel = {
    metaTitle: 'Dev Courses',
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