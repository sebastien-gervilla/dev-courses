import React, { CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";

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

    const handleChanges = (newValue: string) => onChange(name, newValue);

    return (
        <div className='form-editor form-field'>
            {label ? <p className='label'>{label}</p> : null}
            <MarkdownEditor 
                value={value}
                onChange={handleChanges}
                style={{ height: 400, ...style }}
            />
        </div>
    );
};

export default FormEditor;