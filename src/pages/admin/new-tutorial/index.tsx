import { Breadcrumb, PageLayout } from '@/components'
import { SeoModel } from '@/api/models'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { FormCheckbox, FormField, FormNumber, FormTextArea } from '@/components/FormField'
import { useState } from 'react'
import { FormSelect } from '@/components/FormSelect'

const NewTutorial = () => {

    const [newTutorial, setNewTutorial] = useState(defaultNewTutorial);

    const handleChangeTutorial = (name: string, value: string | boolean | number) => {
        setNewTutorial({
            ...newTutorial,
            [name]: value
        });
    }

    const handleSubmitTutorial = async () => {
        const response = await Request.make('/tutorial', 'POST', newTutorial);
        console.log(response);
        
        if (response.ok)
            setNewTutorial(defaultNewTutorial);
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
                        <div className="form-row">
                            <FormField 
                                label='Titre'
                                name='title'
                                value={newTutorial.title}
                                onChange={handleChangeTutorial}
                            />
                            <FormField 
                                label='Slug'
                                name='slug'
                                value={newTutorial.slug}
                                onChange={handleChangeTutorial}
                            />
                        </div>
                        <div className="form-row" style={{ flexGrow: 0 }}>
                            <FormSelect 
                                label='Technologie'
                                name='technology'
                                value={newTutorial.technology}
                                options={['React', 'Node.js']}
                                onChange={handleChangeTutorial}
                            />
                            <FormNumber
                                label='Temps (heures)'
                                name='hoursToLearn'
                                value={newTutorial.hoursToLearn}
                                onChange={handleChangeTutorial}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <FormTextArea 
                            label='Description'
                            name='description'
                            value={newTutorial.description}
                            onChange={handleChangeTutorial}
                            height={100}
                        />
                    </div>
                    <div className="form-row">
                        <FormTextArea 
                            label='Contenu'
                            name='content'
                            value={newTutorial.content}
                            onChange={handleChangeTutorial}
                            height={350}
                        />
                    </div>
                    <div className="form-row">
                        <FormCheckbox 
                            label='Premium'
                            name='isPremium'
                            checked={newTutorial.isPremium}
                            onChange={handleChangeTutorial}
                        />
                    </div>
                    <button 
                        onClick={handleSubmitTutorial} 
                        className='animated filled'
                    >
                        Valider
                    </button>
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
    slug: '',
    description: '',
    content: '',
    technology: 'React',
    hoursToLearn: 1,
    isPremium: true
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