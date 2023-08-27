import React, { useState, useContext } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { Request, SeoModel, TutorialModel } from "@/api";
import { Breadcrumb, PageLayout } from "@/components";
import { GetServerSideProps } from "next";
import { redirect } from "@/utils/next-utils";
import { SnackbarContext } from "@/contexts";

interface TutorialProps {
    tutorial: TutorialModel
    isCompleted: boolean
}

const Tutorial = ({ tutorial, isCompleted }: TutorialProps) => {

    const [completed, setCompleted] = useState(isCompleted);

    const snackbar = useContext(SnackbarContext);

    const handleCompleteTutorial = async () => {
        const res = await Request.post(`/tutorial/${tutorial._id}/complete`);
        if (res.ok) setCompleted(true);

        snackbar.open({
            message: res.ok
                ? 'Tutoriel complété.'
                : 'Une erreur est survenue.'
        });
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
                {!completed && 
                    <div className="tutorial-end">
                        <button 
                            className="animated" 
                            onClick={handleCompleteTutorial}
                        >
                            J'ai terminé
                        </button>
                    </div>}
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
    const completedRes = await Request.srvGet('/tutorial/' + slug + '/isCompleted', cookie);

    if (!completedRes.ok)
        return redirect('/tutoriels');

    return {
        props: {
            tutorial,
            isCompleted: completedRes.data
        }
    }
}

const tutorialPageSeo: SeoModel = {
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

export default Tutorial;