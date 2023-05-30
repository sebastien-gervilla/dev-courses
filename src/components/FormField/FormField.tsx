import React, { ChangeEvent } from 'react';

export interface FormFieldProps {
    label?: string, 
    name: string,
    type?: InputType,
    fieldType?: string,
    value: string,
    onChange: (name: string, value: string) => void,
    placeholder?: string,
    hasError?: boolean,
    validator?: string, // ValidationFunction
    widget?: JSX.Element,
    isDark?: boolean,
    disabled?: boolean
}

const FormField = ({ 
        label, 
        name, 
        type = 'text', 
        fieldType = type, 
        value, 
        onChange, 
        placeholder, 
        hasError = false, 
        validator = '',
        widget,
        isDark,
        disabled = false
    }: FormFieldProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value);

    return (
        <div className="form-field">
            {label ? <p className="label">{label}</p> : null}
            <div className={
                "input-wrapper " + fieldType + 
                (hasError ? ' error' : '') + 
                (isDark ? ' dark' : ' light') + 
                (disabled ? ' disabled' : '')
            }>
                <input 
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className='animated'
                    disabled={disabled}
                />
                {!!widget && 
                    <div className="widget">
                        {widget}
                    </div>}
            </div>
            <p className='validator'>{validator}</p>
        </div>
    )
}

type InputType = React.HTMLInputTypeAttribute;

export default FormField;