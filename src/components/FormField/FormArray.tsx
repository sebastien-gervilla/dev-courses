import React from 'react';
import { IconButton } from '..';
import { GoDiffRemoved, GoDiffAdded } from 'react-icons/go';

interface FormArrayProps {
    label: string
    name: string
    values: string[]
    onChange: (name: string, value: string[]) => void
}

const FormArray = ({ label, name, values, onChange }: FormArrayProps) => {

    const handleChangeField = (position: number, newValue: string) => {
        const newValues = values.map((value, index) => 
            position === index ? newValue : value);

        onChange(name, newValues)
    }

    const handleAddField = () => onChange(name, [...values, '']);

    const handleRemoveField = (position: number) =>
        onChange(name, values.filter((value, index) => position !== index));

    const displayFields = () => {
        return values.map((value, index) => (
            <div className="array-element" key={index}>
                <IconButton onClick={() => handleRemoveField(index)}>
                    <GoDiffRemoved className='animated' />
                </IconButton>
                <input 
                    value={value}
                    onChange={event => handleChangeField(index, event.target.value)}
                />
            </div>
        ))
    }
    
    return (
        <div className='form-array'>
            <div className="label">{label}</div>
            {displayFields()}
            <div className="array-element">
                <IconButton onClick={handleAddField}>
                    <GoDiffAdded className='animated' />
                </IconButton>
            </div>
        </div>
    );
};

export default FormArray;