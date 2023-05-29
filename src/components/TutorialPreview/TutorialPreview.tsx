import React, { useContext } from 'react';
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { AuthContext } from '@/contexts';
import { useRouter } from 'next/router';

interface TutorialPreviewProps {
    slug: string
    title: string
    description: string
    technology: string
    hoursToLearn: number
}

const TutorialPreview = ({ slug, title, description, technology, hoursToLearn }: TutorialPreviewProps) => {

    const { user, openAuthModal } = useContext(AuthContext);

    const router = useRouter();

    const handlePreviewClick = () => !user ? 
        openAuthModal('login') : router.push('/tutoriels/' + slug);

    return (
        <div onClick={handlePreviewClick} className="tutorial-preview">
            <img src="" alt="" />
            <div className="infos">
                <h3>{title}</h3>
                <div className="row">
                    <GrTechnology />
                    <p>{technology}</p>
                    <AiOutlineClockCircle />
                    <p>{hoursToLearn} Heures</p>
                </div>
                <p className="desc">{description}</p>
            </div>
        </div>
    );
};

export default TutorialPreview;