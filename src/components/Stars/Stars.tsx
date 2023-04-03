import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface StarsProps {
    rating: number,
}

const Stars = ({ rating }: StarsProps) => {

    const displayStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++)
            stars.push(
                <div className="star" key={i}>
                    {i < rating ?
                        <AiFillStar /> :
                        <AiOutlineStar />
                    }
                </div>
            )
        return stars;
    }

    return (
        <div className="stars">
            {displayStars()}
        </div>
    );
};

export default Stars;