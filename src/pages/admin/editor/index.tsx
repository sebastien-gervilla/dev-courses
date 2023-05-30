import { Breadcrumb, PageLayout } from '@/components'
import { SeoModel, TutorialModel } from '@/api/models'
import { GetServerSideProps } from 'next'
import { Request } from '@/api'
import { FormArray, FormCheckbox, FormField, FormNumber, FormTextArea, FormSelect } from '@/components/FormField'
import { useState } from 'react'

interface EditorProps {
    initialTutorial: TutorialModel
}

const Editor = ({ initialTutorial }: EditorProps) => {

    const [tutorial, setTutorial] = useState(initialTutorial);

    const handleChangeTutorial = (name: string, value: string | boolean | number | string[]) => {
        setTutorial({
            ...tutorial,
            [name]: value
        });
    }

    const handleSubmitTutorial = async () => {
        if (!initialTutorial._id)
            return createTutorial();

        const response = await Request.make('/tutorial/' + tutorial._id, 'PUT', tutorial);
        console.log(response);
    }

    const createTutorial = async () => {
        const { _id, summary, ...sentData } = tutorial;
        const response = await Request.make('/tutorial', 'POST', {
            ...sentData, summary: summary.filter(element => !!element)
        });
        
        if (response.ok)
            setTutorial(defaultTutorial);
    }

    return (
        <PageLayout id='editor-page' seo={editorPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <Breadcrumb links={[
                        {
                            title: 'Editeur',
                            href: '/admin/editor'
                        }
                    ]} />
                    <h1>
                        {initialTutorial._id ? 
                            'Modifier un tutoriel' : 
                            'Créer un tutoriel'}
                    </h1>
                </div>
            </div>

            <div className="tutorial-form wrapper">
                <div className="app-form">
                    <div className="form-row">
                        <div className="form-row">
                            <FormField 
                                label='Titre'
                                name='title'
                                value={tutorial.title}
                                onChange={handleChangeTutorial}
                            />
                            <FormField 
                                label='Slug'
                                name='slug'
                                value={tutorial.slug}
                                onChange={handleChangeTutorial}
                            />
                        </div>
                        <div className="form-row" style={{ flexGrow: 0 }}>
                            <FormSelect 
                                label='Technologie'
                                name='technology'
                                value={tutorial.technology}
                                options={['React', 'Node.js']}
                                onChange={handleChangeTutorial}
                            />
                            <FormNumber
                                label='Temps (heures)'
                                name='hoursToLearn'
                                value={tutorial.hoursToLearn}
                                onChange={handleChangeTutorial}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <FormTextArea 
                            label='Description'
                            name='description'
                            value={tutorial.description}
                            onChange={handleChangeTutorial}
                            height={100}
                        />
                    </div>
                    <div className="form-row">
                        <FormArray
                            label='Sommaire'
                            name='summary'
                            values={tutorial.summary}
                            onChange={handleChangeTutorial}
                        />
                    </div>
                    <div className="form-row">
                        <FormTextArea 
                            label='Contenu'
                            name='content'
                            value={tutorial.content}
                            onChange={handleChangeTutorial}
                            height={350}
                        />
                    </div>
                    <div className="form-row spaced">
                        <FormCheckbox 
                            label='Premium'
                            name='isPremium'
                            checked={tutorial.isPremium}
                            onChange={handleChangeTutorial}
                        />
                        <button 
                            onClick={handleSubmitTutorial} 
                            className='animated filled'
                        >
                            Valider
                        </button>
                    </div>
                </div>
            </div>

        </PageLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { cookie } = context.req?.headers;
    const userRes = await Request.srvGet('/user/auth', cookie);

    if (!userRes.ok)
        return {
            props: {},
            redirect: {
                destination: '/'
            }
        }

    const { id } = context.query;
    const tutorialRes = await Request.srvGet('/tutorial/editor/' + id, cookie);
    
    const initialTutorial = tutorialRes.ok ? 
        tutorialRes.data : defaultTutorial

    return {
        props: {
            initialTutorial
        }
    };
}

const defaultTutorial: TutorialModel = {
    _id: '',
    title: '',
    slug: '',
    description: '',
    summary: [],
    content: '',
    technology: 'React',
    hoursToLearn: 1,
    isPremium: true
}

const editorPageSeo: SeoModel = {
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

export default Editor;