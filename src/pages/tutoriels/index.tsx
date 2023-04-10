import { SeoModel } from "@/api";
import { PageLayout } from "@/components";
import { FormSelect } from "@/components/FormSelect";
import { useContext, useState } from "react";
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AuthContext } from '../../contexts'

const Tutorials = () => {

    const user = useContext(AuthContext);

    const [filters, setFilters] = useState(defaultFilters);

    const handleChangeFilters = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value
        });
    }

    return (
        <PageLayout id='tutorials-page' seo={tutorialsPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <h1>Les tutoriels</h1>
                </div>
            </div>
            <div className="filter-menu wrapper">
                <div className="filters">
                    <FormSelect 
                        label="Technologie"
                        name="technology"
                        value={filters.technology}
                        options={['React', 'Node.js', 'Next.js']}
                        onChange={handleChangeFilters}
                    />
                </div>
            </div>
            <div className="courses wrapper">
                <div className="courses-content">
                    <a href="/tutoriels/react-beginner-course" className="course">
                        <img src="" alt="" />
                        <div className="infos">
                            <h3>Ceci est un titre de cours</h3>
                            <div className="row">
                                <GrTechnology />
                                <p>React</p>
                                <AiOutlineClockCircle />
                                <p>10 Heures</p>
                            </div>
                            <p className="desc">
                                Ceci est une description de cours React basique fait pour le SEO
                                avec des mots clés marketing pour vendre le cours et son titre.
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </PageLayout>
    );
}

const tutorialsPageSeo: SeoModel = {
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

const defaultFilters = {
    technology: 'React'
}

export default Tutorials;