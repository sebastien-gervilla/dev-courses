import React, { useRef } from 'react';
import { CSS } from '@/helpers';
import { HiChevronDown } from 'react-icons/hi';
import { useClickOutside } from '@/hooks';

interface FormSelectProps {
    label: string,
    name: string,
    value: string,
    options: string[],
    onChange: (name: string, value: string) => void,
    isDark?: boolean
}

const FormSelect = ({ label, name, value, options, onChange, isDark = false }: FormSelectProps) => {

    const optionsRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(
        optionsRef, 
        () => CSS.removeClass('opened', optionsRef.current),
        false
    );
    

    const displayOptions = () => {
        if (!options.length) return;

        return options.map(option => (
            <button
                key={option}
                className='option'
                onClick={() => onChange(name, option)}
            >
                {option}
            </button>
        ))
    }

    const handleToggleOptions = () => CSS.toggleClass('opened', optionsRef.current);

    return (
        <div className={"form-select" + (isDark ? ' dark' : ' light')}>
            {label ? <p className='label'>
                {label}
            </p> : null}
            <button 
                className='toggle-button'
                onClick={handleToggleOptions}
            >
                {value}
                <HiChevronDown />
            </button>
            <div 
                ref={optionsRef} 
                className='options'
            >
                {displayOptions()}
            </div>
        </div>
    )
}

export default FormSelect;