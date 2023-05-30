import { useClickOutside, useHasMounted } from '@/hooks';
import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    body: ReactNode
}

const Modal = ({ isOpen, onClose, body }: ModalProps) => {

    const modalRef = useRef<HTMLDivElement | null>(null);

    const closeModal = () => isOpen && onClose();

    useClickOutside(modalRef, closeModal);

    const hasMounted = useHasMounted();

    return hasMounted ? ReactDOM.createPortal(
        <div className={"modal-wrapper" + (isOpen ? ' opened' : '')}>
            <div ref={modalRef} className="modal">
                {body}
            </div>
        </div>
    , document.body) : <></>;
};

export default Modal;