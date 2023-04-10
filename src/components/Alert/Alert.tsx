import React, { ReactNode } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { BiErrorAlt, BiCheckCircle } from 'react-icons/bi';
import { FiInfo } from 'react-icons/fi';
import { HiChevronDoubleUp } from 'react-icons/hi';

interface SkzAlertProps {
    children: ReactNode,
    type: WarningType,
    title?: string,
    colorType?: WarningType,
    hideType?: boolean,
    hideIcon?: boolean
}

const Alert = ({ children, type, title, colorType = type, hideType = false, hideIcon = false }: SkzAlertProps) => {

    const iconStyle = { 
        fill: AlertColors[colorType],
        backgroundColor: ContentColors[colorType] + '18'
    };

    const WarningIcons = {
        'Error': <BiErrorAlt style={iconStyle} />,
        'Warning': <AiOutlineWarning style={iconStyle} />,
        'Info': <FiInfo style={{ 
            color: iconStyle.fill, 
            backgroundColor: iconStyle.backgroundColor 
        }} />,
        'Success': <BiCheckCircle style={iconStyle} />,
        'Upgrade': <HiChevronDoubleUp style={iconStyle} />
    }

    return (
        <div 
            className={"alert" + (hideIcon ? ' --hiden-icon' : '')}
            style={{
                backgroundColor: ContentColors[colorType] + '18',
                borderLeft: '4px solid ' + AlertColors[colorType]
            }}
        >
            {!hideIcon && <div className="alert-icon">
                {WarningIcons[colorType]}
            </div>}
            {!!title && <strong className='title'>{title}</strong>}
            {children}
        </div>
    );
};

const AlertColors = {
    'Error': '#D23232',
    'Warning': '#F08200',
    'Info': '#201dff',
    'Success': '#2D8732',
    'Upgrade': '#C51DFF'
}

const ContentColors = {
    'Error' : '#FF0000',
    'Warning' : '#ff9400',
    'Info' : '#00a7ff',
    'Success' : '#286928',
    'Upgrade': '#E317CA'
}

export type WarningType = 'Error' | 'Warning' | 'Info' | 'Success' | 'Upgrade';

export default Alert;
