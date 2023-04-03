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
                            Ceci est un texte qui donne envie d'acheter les cours.
                        </h1>
                        <p>
                            Ceci est un sous-text marketing qui donne envie d'acheter les cours également. 
                            Et voici une suite de ce texte marketing pour la longueur. Quelques mots clés ici.
                        </p>
                        <div className="buttons">
                            <button className='animated filled'>
                                Découvrir les cours
                            </button>
                        </div>
                    </div>
                    <img src="/images/web-developper.svg" alt="A web developper" />
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