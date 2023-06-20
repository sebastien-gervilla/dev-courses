import React, { CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { useModal } from '@/hooks';
import { Modal } from '../Modal';
import YoutubeTransformer from '../Form/YoutubeTransformer';

const MarkdownEditor = dynamic(
    () => import('react-simplemde-editor'), 
    { ssr: false }
);

interface FormEditorProps {
    label?: string
    name: string
    value: string
    onChange: (name: string, value: string) => void
    style?: CSSProperties
}

const FormEditor = ({ label, name, value, onChange, style } : FormEditorProps) => {

    const modal = useModal();

    const handleChanges = (newValue: string) => onChange(name, newValue);

    return (
        <div className='form-editor form-field'>
            {label ? <p className='label'>{label}</p> : null}
            <MarkdownEditor 
                value={value}
                onChange={handleChanges}
                style={{ minHeight: 400, ...style }}
            />
            <button 
                className='animated-link colored'
                onClick={modal.open}
            >
                Générer un embed
            </button>
            <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={<YoutubeTransformer />}
            />
        </div>
    );
};

export default FormEditor;