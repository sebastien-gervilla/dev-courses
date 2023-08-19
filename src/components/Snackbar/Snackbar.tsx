import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IconButton } from '..';
import { BsCheckCircle } from 'react-icons/bs';

export interface SnackbarProps {
    isOpen: boolean,
    onClose: () => void,
    message: string,
    className?: string,
    closeDelay?: number | null
}

const Snackbar = ({ isOpen, onClose, message, className = '', closeDelay = null }: SnackbarProps) => {

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!closeDelay || closeDelay < 0) return;
        timeoutRef.current && clearTimeout(timeoutRef.current);

        if (isOpen)
            timeoutRef.current = setTimeout(onClose, closeDelay);
    
        return () => { timeoutRef.current && clearTimeout(timeoutRef.current) };
      }, [closeDelay, onClose, isOpen]);

    const handleClose = (event: React.MouseEvent): void => {
        event.preventDefault();
        onClose();
    }

    return isOpen ? ReactDOM.createPortal(
        <div className={'snackbar' + className}>
            <p>
                {message}
            </p>
            <IconButton onClick={handleClose}>
                <BsCheckCircle className='animated' />
            </IconButton>
        </div>
    , document.body) : null;
};

export default Snackbar;