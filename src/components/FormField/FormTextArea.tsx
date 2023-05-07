import React, { ChangeEvent } from 'react';

export interface FormTextAreaProps {
    label: string, 
    name: string,
    value: string,
    onChange: (name: string, value: string) => void,
    placeholder?: string
    height?: number
}

const FormTextArea = ({ label, name, value, onChange, placeholder, height = 150 }: FormTextAreaProps) => {

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => onChange(name, event.target.value);

    return (
        <div className="form-field">
            <p className="label">{label}</p>
            <textarea
                name={name}
                className='form-field textarea'
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                style={{ height }}
            />
        </div>
    );
};

export default FormTextArea;