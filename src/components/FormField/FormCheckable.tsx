import React, { CSSProperties } from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';

interface FormCheckableProps {
    label?: string
    name: string
    state: CheckableState
    onChange: (name: string, value: CheckableState) => void
    style?: CSSProperties
}

const FormCheckable = ({ label, name, state, onChange, style }: FormCheckableProps) => {

    const handleToggleCheckable = () => onChange(name, getNewState());

    const getNewState = () => {
        if (state === null) return true;
        return state ? false : null;
    }

    const displayIcon = () => {
        if (state === null) return;
        return state ? <ImCheckmark /> : <ImCross />;
    }

    return (
        <div 
            className='form-checkbox'
            onClick={handleToggleCheckable}
            style={style}
        >
            <div className="checkbox">
                {displayIcon()}
            </div>
            <p>{label}</p>
        </div>
    );
};

export type CheckableState = boolean | null;

export default FormCheckable;