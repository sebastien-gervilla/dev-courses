import React, { useContext } from 'react';
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import { AuthContext } from '@/contexts';
import { useRouter } from 'next/router';
import { getFullDate } from '@/utils/date-utils';

interface TutorialPreviewProps {
    slug: string
    title: string
    description: string
    technology: string
    hoursToLearn: number
    createdAt: string
}

const TutorialPreview = ({ slug, title, description, technology, hoursToLearn, createdAt }: TutorialPreviewProps) => {

    const creationDate = getFullDate(createdAt);

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
                    <MdDateRange />
                    <p>{creationDate}</p>
                </div>
                <p className="desc">{description}</p>
            </div>
            <div className="icon">
                <p>Commencer</p>
                <BsArrowRightShort />
            </div>
        </div>
    );
};

export default TutorialPreview;