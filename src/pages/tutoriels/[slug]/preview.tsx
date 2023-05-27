import React from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { Request, SeoModel, TutorialModel } from "@/api";
import { Breadcrumb, PageLayout, Summary } from "@/components";

interface PreviewProps {
    tutorial: TutorialModel
}

const Preview = ({ tutorial }: PreviewProps) => {

    const handleFollowCourse = async () => {
        const response = await Request.make(`/tutorial/${tutorial._id}/follow`, 'POST');
        if (!response.ok)
            console.log(response)
    }

    return (
        <PageLayout id='preview-page' seo={previewPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <Breadcrumb links={[
                        {
                            title: 'Tutoriels',
                            href: '/tutoriels'
                        }
                    ]} />
                    <h1>{tutorial.title}</h1>
                </div>
            </div>
            <div className="preview wrapper">
                <div className="preview-content">
                    <div className="main-infos">
                        <p>{tutorial.description}</p>
                        {tutorial.summary.length > 0 && 
                            <Summary elements={tutorial.summary} />}
                        <button 
                            className="animated filled"
                            onClick={handleFollowCourse}
                        >
                            Suivre le cours
                        </button>
                    </div>
                    <div className="additional-infos">
                        <h3>Informations</h3>
                        <p>{tutorial.technology}</p>
                        <p>{tutorial.hoursToLearn} Hours</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export async function getStaticPaths() {
    const tutorialsRes = await Request.get('/tutorial');

    if (!Array.isArray(tutorialsRes.data)) 
        return { paths: [], fallback: false };

    return {
        paths: tutorialsRes.data.map((tutorial: TutorialModel) => ({
            params: {
                slug: tutorial.slug
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {

    const tutorialRes = await Request.get('/tutorial/' + params.slug);

    if (!tutorialRes.ok)
        return {
            redirect: {
                destination: '/tutoriels' // TODO: 404 Page
            }
        }

    const tutorial: TutorialModel = tutorialRes.data;

    return {
        props: {
            tutorial
        }
    }
}

const previewPageSeo: SeoModel = {
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

export default Preview;