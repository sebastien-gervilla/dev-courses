import React from "react";
import { Request, SeoModel, TutorialModel } from "@/api";
import { Breadcrumb, PageLayout, Summary } from "@/components";
import { GetServerSideProps } from "next";
import { redirect } from "@/utils/next-utils";
import { useRouter } from "next/router";

interface PreviewProps {
    tutorial: TutorialModel
}

const Preview = ({ tutorial }: PreviewProps) => {

    const router = useRouter();
    
    const handleFollowCourse = async () => {
        const response = await Request.make(`/tutorial/${tutorial._id}/follow`, 'POST');
        if (response.ok) return router.push('/tutoriels/' + tutorial.slug);
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
                        <div className="info">
                            <p>Technologie:</p>
                            <p>{tutorial.technology}</p>
                        </div>
                        <div className="info">
                            <p>Temps estimé:</p>
                            <p>{tutorial.hoursToLearn} {tutorial.hoursToLearn > 1 ? 'Hours' : 'Hour'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

    const slug = params?.slug;
    const { cookie } = req.headers;
    const tutorialRes = await Request.srvGet(`/tutorial/${slug}/preview`, cookie);

    if (!tutorialRes.ok)
        return redirect('/tutoriels');

    const tutorial: TutorialModel = tutorialRes.data;

    return {
        props: {
            tutorial
        }
    }
}

const previewPageSeo: SeoModel = {
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

export default Preview;