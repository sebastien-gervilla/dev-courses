import { PageLayout, Stars } from '@/components'
import { SeoModel } from '@/api/models'
import { BsClockHistory } from 'react-icons/bs'
import { GiProgression } from 'react-icons/gi'
import { SlBriefcase } from 'react-icons/sl'

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
            <div className="selling wrapper">
                <div className="selling-content">
                    <h2>Un apprentissage maîtrisé</h2>
                    <div className="arguments">
                        <div className="argument">
                            <BsClockHistory />
                            <h3>Flexible</h3>
                            <p>
                                Ceci est un sous-text marketing qui donne envie d'acheter les cours également. 
                                Et voici une suite de ce texte marketing.
                            </p>
                        </div>
                        <div className="argument">
                            <GiProgression />
                            <h3>Accessible</h3>
                            <p>
                                Ceci est un sous-text marketing qui donne envie d'acheter les cours également. 
                                Et voici une suite de ce texte marketing.
                            </p>
                        </div>
                        <div className="argument">
                            <SlBriefcase />
                            <h3>Prêt à l'emploi</h3>
                            <p>
                                Ceci est un sous-text marketing qui donne envie d'acheter les cours également. 
                                Et voici une suite de ce texte marketing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-feedback wrapper">
                <div className="user-feedback-content">
                    <h2>Ils parlent de nous</h2>
                    <div className="feedbacks">
                        <div className="feedback">
                            <div className="head">
                                <p>Sébastien</p>
                                <Stars rating={5} />
                            </div>
                            <p>
                                Des formations riches, variées, sur des sujets actuels, maintenues à jour, 
                                à la fois accessibles et d'un très bon niveau, faciles à mettre en pratique, 
                                reposant sur des vidéos, des cours écrits, des projets réels d'excellente qualité.
                            </p>
                        </div>
                        <div className="feedback">
                            <div className="head">
                                <p>Sébastien</p>
                                <Stars rating={5} />
                            </div>
                            <p>
                                Des formations riches, variées, sur des sujets actuels, maintenues à jour, 
                                à la fois accessibles et d'un très bon niveau, faciles à mettre en pratique, 
                                reposant sur des vidéos, des cours écrits, des projets réels d'excellente qualité.
                            </p>
                        </div>
                        <div className="feedback">
                            <div className="head">
                                <p>Sébastien</p>
                                <Stars rating={5} />
                            </div>
                            <p>
                                Des formations riches, variées, sur des sujets actuels, maintenues à jour, 
                                à la fois accessibles et d'un très bon niveau, faciles à mettre en pratique, 
                                reposant sur des vidéos, des cours écrits, des projets réels d'excellente qualité.
                            </p>
                        </div>
                    </div>
                    <button className='animated'>
                        Se lancer
                    </button>
                </div>
            </div>
        </PageLayout>
    )
}

const technologies = ['react', 'node.js', 'next.js', 'vue.js', '.NET', 'Nuxt.js']

const homePageSeo: SeoModel = {
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

export default Home;