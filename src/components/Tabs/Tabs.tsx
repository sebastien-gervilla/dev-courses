import React from 'react';

interface TabsProps {
    name: string
    value: string
    options: string[]
    onChange: (name: string, value: string) => void
}

const Tabs = ({ name, value, options, onChange }: TabsProps) => {

    const handleChangeTab = (newValue: string) => onChange(name, newValue);

    const displayTabs = () => options.map(option => (
        <button 
            className={'tab' + (option === value ? ' active' : '')}
            onClick={() => handleChangeTab(option)}
        >
            {option}
        </button>
    ))

    return (
        <div className='tabs'>
            {displayTabs()}
        </div>
    );
};

export default Tabs;