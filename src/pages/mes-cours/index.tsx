import { SeoModel } from "@/api";
import { PageLayout } from "@/components";
import { FormSelect } from "@/components/FormSelect";
import { useContext, useState } from "react";
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AuthContext } from '../../contexts'

const MyCourses = () => {

    const user = useContext(AuthContext);

    const [filters, setFilters] = useState(defaultFilters);

    const handleChangeFilters = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value
        });
    }

    return (
        <PageLayout id='my-courses-page' seo={tutorialsPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <h1>Mes cours</h1>
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

export default MyCourses;