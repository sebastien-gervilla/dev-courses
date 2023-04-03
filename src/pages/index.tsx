import { PageLayout } from '@/components'
import { SeoModel } from '@/api/models'

const Home = () => {

    const displayTechnologies = () => technologies.map(
        technology => (
            <div key={technology} className="card">
                <p>{technology}</p>
            </div>
        )
    );

    return (
        <PageLayout id='home-page' seo={homePageSeo}>
            <div className="hero wrapper">
                <div className="hero-content">
                    <div className="action">
                        <h1>
                            Ceci est un texte Ceci est un texte.
                        </h1>
                        <p>
                            Ceci est un texte Ceci est un texte.
                            Ceci est un texte Ceci est un texte.
                            Ceci est un texte Ceci est un texte.
                        </p>
                    </div>
                    <img src="" alt="" style={{ backgroundColor: 'blue' }} />
                </div>
            </div>
            <div className="technologies wrapper">
                <div className="technologies-content">
                    <h2>Des technologies modernes</h2>
                    <div className="cards">
                        {displayTechnologies()}
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

const homePageSeo: SeoModel = {
    metaTitle: 'Seb Dev',
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

export default Home;