import { Request, SeoModel, TutorialModel } from "@/api";
import { PageLayout, TutorialPreview } from "@/components";
import { FormSelect } from "@/components/FormSelect";
import { useContext, useState } from "react";
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AuthContext } from '../../contexts'
import { GetServerSideProps } from "next";

interface TutorialsProps {
    tutorials: TutorialModel[]
}

const Tutorials = ({ tutorials }: TutorialsProps) => {

    const user = useContext(AuthContext);

    const [filters, setFilters] = useState(defaultFilters);

    const handleChangeFilters = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value
        });
    }

    const displayTutorials = () => {
        if (!tutorials.length) return;

        return tutorials.map(tutorial => (
            <TutorialPreview 
                key={tutorial._id}
                slug={tutorial.slug}
                title={tutorial.title}
                description={tutorial.description}
                technology={tutorial.technology}
                hoursToLearn={tutorial.hoursToLearn}
            />
        ))
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
                    {displayTutorials()}
                </div>
            </div>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {

    const tutorialsRes = await Request.get('/tutorial');

    return {
        props: {
            tutorials: tutorialsRes.data
        }
    }
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