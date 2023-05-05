import React from 'react';
import { RiAlertLine } from 'react-icons/ri';

interface ConfirmModalProps {
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <div className="confirm-modal">
            <div className="title">
                <RiAlertLine />
                <p>Action irréversible</p>
            </div>
            <p>{message}</p>
            <div className="buttons">
                <button onClick={onCancel} className='animated-link'>
                    Annuler
                </button>
                <button onClick={onConfirm} className='animated filled'>
                    Confirmer
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;