import React from 'react';
import { GrTechnology } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';

interface TutorialPreviewProps {
    slug: string
    title: string
    description: string
    technology: string
    hoursToLearn: number
}

const TutorialPreview = ({ slug, title, description, technology, hoursToLearn }: TutorialPreviewProps) => {
    return (
        <a href={"/tutoriels/" + slug} className="tutorial-preview">
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
        </a>
    );
};

export default TutorialPreview;