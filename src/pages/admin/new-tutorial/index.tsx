import { Breadcrumb, PageLayout } from '@/components'
import { SeoModel } from '@/api/models'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { FormField } from '@/components/FormField'
import { useState } from 'react'

const NewTutorial = () => {

    const [newTutorial, setNewTutorial] = useState(defaultNewTutorial);

    const handleChangeTutorial = (name: string, value: string) => {
        setNewTutorial({
            ...newTutorial,
            [name]: value
        });
    }

    return (
        <PageLayout id='new-tutorial-page' seo={newTutorialPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <Breadcrumb links={[
                        {
                            title: 'Création Tutoriel',
                            href: '/new-tutorial'
                        }
                    ]} />
                    <h1>Nouveau Tutoriel</h1>
                </div>
            </div>

            <div className="tutorial-form wrapper">
                <div className="app-form">
                    <div className="form-row">
                        <FormField 
                            label='Slug'
                            name='slug'
                            value={newTutorial.slug}
                            onChange={handleChangeTutorial}
                        />
                        <FormField 
                            label='Titre'
                            name='title'
                            value={newTutorial.title}
                            onChange={handleChangeTutorial}
                        />
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

const defaultNewTutorial = {
    title: '',
    slug: ''
}

const newTutorialPageSeo: SeoModel = {
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

export default NewTutorial;