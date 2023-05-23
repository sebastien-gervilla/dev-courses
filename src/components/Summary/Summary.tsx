import React from 'react';

interface SummaryProps {
    elements: string[]
}

const Summary = ({ elements }: SummaryProps) => {

    const displayElements = () => {
        if (!elements.length) return;

        return elements.map((element, index) => (
            <li key={index}>{element}</li>
        ))
    }

    return (
        <div className="summary">
            <p style={{ paddingLeft: 16, marginBottom: 8 }}>Sommaire :</p>
            <ul className='unordered-list'>
                {displayElements()}
            </ul>
        </div>
    );
};

export default Summary;