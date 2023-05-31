import React from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { Request, SeoModel, TutorialModel } from "@/api";
import { Breadcrumb, PageLayout } from "@/components";
import { GetServerSideProps } from "next";
import { redirect } from "@/utils/next-utils";

interface TutorialProps {
    tutorial: TutorialModel
}

const Tutorial = ({ tutorial }: TutorialProps) => {

    const handleCompleteTutorial = async () => {
        const res = await Request.post(`/tutorial/${tutorial._id}/complete`);
        console.log(res)
    }

    return (
        <PageLayout id='tutorial-page' seo={tutorialPageSeo}>
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
            <div className="tutorial wrapper">
                <div className="tutorial-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {tutorial.content}
                    </ReactMarkdown>
                </div>
                <div className="tutorial-end">
                    <button 
                        className="animated" 
                        onClick={handleCompleteTutorial}
                    >
                        J'ai terminé
                    </button>
                </div>
            </div>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

    const slug = params?.slug;
    const { cookie } = req.headers;
    const tutorialRes = await Request.srvGet('/tutorial/' + slug, cookie);

    if (tutorialRes.status === 403)
        return redirect(`/tutoriels/${slug}/preview`);

    if (!tutorialRes.ok)
        return redirect('/tutoriels');

    const tutorial: TutorialModel = tutorialRes.data;

    return {
        props: {
            tutorial
        }
    }
}

const tutorialPageSeo: SeoModel = {
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

export default Tutorial;