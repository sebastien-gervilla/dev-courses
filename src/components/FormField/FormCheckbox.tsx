import React from 'react';
import { ImCheckmark } from 'react-icons/im';

interface FormCheckboxProps {
    label?: string
    name: string
    checked: boolean
    onChange: (name: string, value: boolean) => void
}

const FormCheckbox = ({ label, name, checked, onChange }: FormCheckboxProps) => {

    const handleToggleCheckbox = () => onChange(name, !checked);

    return (
        <div 
            className='form-checkbox'
            onClick={handleToggleCheckbox}
        >
            <div className="checkbox">
                {checked && <ImCheckmark />}
            </div>
            <p>{label}</p>
        </div>
    );
};

export default FormCheckbox;