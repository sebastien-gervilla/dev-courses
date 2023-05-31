import { Request, SeoModel, TutorialModel } from "@/api";
import { PageLayout, TutorialPreview, Pagination } from "@/components";
import { FormSelect } from "@/components/FormField";
import { useContext, useState } from "react";
import { AuthContext } from '../../contexts'
import { GetServerSideProps } from "next";
import { usePagination } from "@/hooks";
import { scrollUp } from "@/utils/window-utils";

interface TutorialsProps {
    tutorials: TutorialModel[]
}

const PAGE_AMOUNT = 6;

const Tutorials = ({ tutorials }: TutorialsProps) => {

    const pages = Math.ceil(tutorials.length / PAGE_AMOUNT);

    const user = useContext(AuthContext);

    const pagination = usePagination(pages, { onPageChange: scrollUp });

    const [filters, setFilters] = useState(defaultFilters);

    const handleChangeFilters = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value
        });
    }

    const displayTutorials = () => {
        if (!tutorials.length) return;

        const displayedTutorials = tutorials.slice(
            ((pagination.page - 1) * PAGE_AMOUNT),
            Math.min((pagination.page * PAGE_AMOUNT), tutorials.length)
        )

        return displayedTutorials.map(tutorial => (
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
            <div className="tutorials wrapper">
                <div className="tutorials-content">
                    {displayTutorials()}
                </div>
                <div className="tutorials-pagination">
                    <Pagination 
                        page={pagination.page}
                        pages={pagination.pages}
                        changePage={pagination.change}
                    />
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