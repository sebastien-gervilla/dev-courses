import React, { DetailedHTMLProps } from 'react';

const IconButton = (props: ButtonProps) => {
    return (
        <button {...props} className='icon-button'>
            {props.children}
        </button>
    );
};

type ButtonProps = DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, 
    HTMLButtonElement
>

export default IconButton;