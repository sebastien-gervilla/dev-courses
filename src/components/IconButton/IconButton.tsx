import React, { DetailedHTMLProps, forwardRef } from 'react';

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return (
        <button {...props} ref={ref} className='icon-button'>
            {props.children}
        </button>
    );
});

type ButtonProps = DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, 
    HTMLButtonElement
>

export default IconButton;