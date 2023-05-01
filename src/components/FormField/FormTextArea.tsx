import React, { ChangeEvent } from 'react';

export interface FormTextAreaProps {
    label: string, 
    name: string,
    value: string,
    onChange: (name: string, value: string) => void,
    placeholder?: string
}

const FormTextArea = ({ label, name, value, onChange, placeholder }: FormTextAreaProps) => {

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
            />
        </div>
    );
};

export default FormTextArea;