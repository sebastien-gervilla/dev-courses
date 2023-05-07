import React, { ChangeEvent } from 'react';

export interface FormFieldProps {
    label: string, 
    name: string,
    value: number,
    onChange: (name: string, value: number) => void
}

const FormNumber = ({ label, name, value, onChange }: FormFieldProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const { value } = event.target;
            const nextValue = parseInt(value, 10);
            onChange(name, nextValue);
        } catch (error) {
            return;
        }
    }

    return (
        <div className="form-field">
            <p className="label">{label}</p>
            <div className="input-wrapper">
                <input 
                    name={name}
                    type='number'
                    value={value}
                    onChange={handleChange}
                    className='animated'
                />
            </div>
        </div>
    );
};

export default FormNumber;