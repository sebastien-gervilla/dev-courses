import { PageLayout } from '@/components'
import { SeoModel } from '@/api/models'

const Admin = () => {
    return (
        <PageLayout id='admin-page' seo={adminPageSeo}>
            
        </PageLayout>
    )
}

const adminPageSeo: SeoModel = {
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

export default Admin;