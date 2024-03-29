import { Link, PageLayout, Stars } from '@/components'
import { SeoModel } from '@/api/models'
import { BsClockHistory } from 'react-icons/bs'
import { GiProgression } from 'react-icons/gi'
import { SlBriefcase } from 'react-icons/sl'
import { FaNodeJs, FaReact, FaVuejs } from 'react-icons/fa';
import { SiNextdotjs, SiNuxtdotjs, SiTypescript } from 'react-icons/si';

const Home = () => {

    const displayTechnologies = () => technologies.map(
        (technology) => (
            <div key={technology.name} className="card">
                <div className='filler'></div>
                <Link href='/tutoriels'>
                    {technology.icon}
                    <p>{technology.name}</p>
                </Link>
            </div>
        )
    );

    return (
        <PageLayout id='home-page' seo={homePageSeo}>
            <div className="hero wrapper">
                <div className="hero-content">
                    <div className="action">
                        <h1>
                            Passez au niveau <span>supérieur</span> grâce à des technologies <span>modernes</span>.
                        </h1>
                        <p>
                            Devenez et restez un développeur web compétitif sur le marché, grâce à des tutoriels gratuits
                            et à jour, le tout sur les technologies de demain !

                        </p>
                        <div className="buttons">
                            <Link className='animated-button filled' href='/tutoriels'>
                                Découvrir notre sélection
                            </Link>
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
                                Gardez le contrôle durant votre formation, et proggessez à votre rythme,
                                en totale autonomie.
                            </p>
                        </div>
                        <div className="argument">
                            <GiProgression />
                            <h3>Accessible</h3>
                            <p>
                                Quelque soit votre niveau, vous trouverez des cours adaptés qui vous
                                permettront de progresser vers l'étape supérieure.
                            </p>
                        </div>
                        <div className="argument">
                            <SlBriefcase />
                            <h3>Prêt à l'emploi</h3>
                            <p>
                                Restez compétitif sur le marché du travail grâce à des tutoriels créés par des développeurs actifs, 
                                avec des technologies d'actualité.
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
                                <p>Maxime</p>
                                <Stars rating={5} />
                            </div>
                            <p>
                                L'apprentissage en ligne est beaucoup plus exigeant et difficile que l'apprentissage sur site. 
                                Dev Courses m'a parfaitement accompagné durant toute la formation. Il ne faut pas hésiter à les solliciter.
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
                                <p>Hugo</p>
                                <Stars rating={5} />
                            </div>
                            <p>
                                Je n'aurais jamais cru que, la cinquantaine entamée, je pourrais étudier si facilement. 
                                Les technologies sont modernes, les cours précis mais digestes, on travaille en autonomie et à son rythme.
                            </p>
                        </div>
                    </div>
                    <Link href='/tutoriels' className='animated-button'>
                        Se lancer
                    </Link>
                </div>
            </div>
        </PageLayout>
    )
}

const technologies = [
    {
        name: 'React',
        icon: <FaReact />
    },
    {
        name: 'Next.js',
        icon: <SiNextdotjs />
    },
    {
        name: 'Node.js',
        icon: <FaNodeJs />
    },
    {
        name: 'Vue',
        icon: <FaVuejs />
    },
    {
        name: 'Nuxt.js',
        icon: <SiNuxtdotjs />
    },
    {
        name: 'Typescript',
        icon: <SiTypescript />
    }
]

const homePageSeo: SeoModel = {
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

export default Home;