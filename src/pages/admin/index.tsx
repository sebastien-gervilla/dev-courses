import { PageLayout, Stars } from '@/components'
import { SeoModel } from '@/api/models'
import { BsClockHistory } from 'react-icons/bs'
import { GiProgression } from 'react-icons/gi'
import { SlBriefcase } from 'react-icons/sl'

const Admin = () => {

    const displayTechnologies = () => technologies.map(
        technology => (
            <div key={technology} className="card">
                <p>{technology}</p>
            </div>
        )
    );

    return (
        <PageLayout id='admin-page' seo={adminPageSeo}>
            
        </PageLayout>
    )
}

const technologies = ['react', 'node.js', 'next.js', 'vue.js', '.NET', 'Nuxt.js']

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