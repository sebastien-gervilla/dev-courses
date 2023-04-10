import React, { useState, ChangeEvent } from 'react';
import { IconButton } from '../IconButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FormField } from '.';

export interface FormPasswordProps {
    label: string, 
    name: string,
    value: string,
    onChange: (name: string, value: string) => void,
    placeholder?: string,
    hasError?: boolean,
    validator?: string, // ValidationFunction
    widget?: JSX.Element,
    isDark?: boolean
}

const FormPassword = ({ 
        label, 
        name,
        value, 
        onChange, 
        placeholder, 
        hasError = false, 
        validator = '',
        widget,
        isDark
    }: FormPasswordProps) => {

    const [show, setShow] = useState(false);

    const toggleShowPassword = () => setShow(isShowing => !isShowing);

    const displayShowButton = () => {
        return (
            <IconButton onClick={toggleShowPassword}>
                {show ?
                    <AiOutlineEye /> :
                    <AiOutlineEyeInvisible />
                }
            </IconButton>
        )
    }

    const handleChange = (name: string, value: string) => onChange(name, value);

    return (
        <FormField 
            label={label}
            name={name}
            value={value}
            type={show ? 'text' : 'password'}
            onChange={handleChange}
            widget={displayShowButton()}
        />
    )
}

type InputType = React.HTMLInputTypeAttribute;

export default FormPassword;