import React from 'react';
import { Snackbar } from '../Snackbar';
import { useModal } from '@/hooks';

interface CopyableFieldProps {
    text: string
}

const CopyableField = ({ text }: CopyableFieldProps) => {

    const snackbar = useModal();

    const handleCopyField = () => {
        navigator.clipboard.writeText(text);
        snackbar.open();
    };

    return (
        <div 
            className='copyable-field'
            onClick={handleCopyField}
        >
            <p>
                {text}
            </p>
            <Snackbar 
                isOpen={snackbar.isOpen}
                onClose={snackbar.close}
                message='Texte copié !'
                closeDelay={2500}
            />
        </div>
    );
};

export default CopyableField;