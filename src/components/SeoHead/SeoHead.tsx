import Head from "next/head";
import { Media, SeoModel } from "@/api";

const SeoHead = (seo: SeoModel) => { // TODO: I could want not to change the title | Rework

    const fullSeo: SeoModel = {
        ...defaultSeo,
        ...seo
    }

    const sharedImageUrl = Media.get(fullSeo.sharedImage);

    return (
        <Head>
            {fullSeo.metaTitle && (
                <>
                    <title>{fullSeo.metaTitle}</title>
                    <meta property="og:title" content={fullSeo.metaTitle} />
                    <meta name="twitter:title" content={fullSeo.metaTitle} />
                </>
            )}
            {fullSeo.metaDescription && (
                <>
                    <meta name="description" content={fullSeo.metaDescription} />
                    <meta property="og:description" content={fullSeo.metaDescription} />
                    <meta name="twitter:description" content={fullSeo.metaDescription} />
                </>
            )}
            {fullSeo.sharedImage && (
                <>
                    <meta property="og:image" content={sharedImageUrl} />
                    <meta name="twitter:image" content={sharedImageUrl} />
                    <meta name="image" content={sharedImageUrl} />
                </>
            )}
            <meta property="og:type" content={fullSeo.pageType} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};

const defaultSeo: SeoModel = { // TODO: Change this or export to database
    metaTitle: 'Dev Courses',
    metaDescription: 'This is my website',
    sharedImage: {
        _id: "websiteSharedImage",
        url: "/defaultShareImage.png",
        alt: "Image of this website",
        width: 1080,
        height: 720
    },
    pageType: 'website'
}

export default SeoHead;