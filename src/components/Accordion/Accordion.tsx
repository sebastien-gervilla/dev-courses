import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface AccordionProps {
    title: string,
    text: string
}

const Accordion = ({ title, text }: AccordionProps) => {

    const [show, setShow] = useState(false);

    const handleToggleShow = () => setShow(!show);

    return (
        <div 
            onClick={handleToggleShow}
            className={'accordion' + (show ? ' opened' : '')}   
        >
            <div className="head">
                <p>{title}</p>
                <HiChevronDown />
            </div>
            <div className='text'>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Accordion;