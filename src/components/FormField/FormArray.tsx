import React, { useState } from 'react';
import { IconButton } from '..';
import { GoDiffRemoved, GoDiffAdded } from 'react-icons/go';

interface FormArrayProps {
    label: string
    name: string
    onChange: (name: string, value: string[]) => void
}

const FormArray = ({ label, name, onChange }: FormArrayProps) => {

    const [fields, setFields] = useState<FieldType[]>([]);

    const handleChanges = (nextFields: FieldType[]) => 
        onChange(name, nextFields.map(field => field.value));

    const handleChangeField = (fieldId: string, value: string) => {
        const newFields = fields.map(field => 
            field.id === fieldId ? {...field, value} : field);

        setFields(newFields);
        handleChanges(newFields);
    }

    const handleAddField = () => {
        const nextFields = [...fields, {
            id: crypto.randomUUID(), 
            value: ''
        }];

        setFields(nextFields);
        handleChanges(nextFields);
    }

    const handleRemoveField = (fieldId: string) =>
        setFields(fields.filter(field => field.id !== fieldId));

    const displayFields = () => {
        return fields.map(field => (
            <div className="array-element">
                <IconButton onClick={() => handleRemoveField(field.id)}>
                    <GoDiffRemoved className='animated' />
                </IconButton>
                <input 
                    key={field.id}
                    value={field.value}
                    onChange={event => handleChangeField(field.id, event.target.value)}
                    onBlur={() => handleChanges(fields)}
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

type FieldType = {
    id: string
    value: string
}

export default FormArray;