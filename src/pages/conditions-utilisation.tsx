import { PageLayout } from '@/components'
import { SeoModel } from '@/api/models'

const TermsOfUse = () => {
    return (
        <PageLayout id='terms-page' seo={termsPageSeo}>
            
        </PageLayout>
    )
}

const termsPageSeo: SeoModel = {
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

export default TermsOfUse;