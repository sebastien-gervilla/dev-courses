import React, { useContext } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { HiSquare3Stack3D } from 'react-icons/hi2';
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
                    <HiSquare3Stack3D />
                    <p>{technology}</p>
                    <AiOutlineClockCircle />
                    <p>{hoursToLearn} {hoursToLearn > 1 ? 'Heures' : 'Heure'}</p>
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