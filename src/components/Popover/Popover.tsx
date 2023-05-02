import { useClickOutside } from '@/hooks';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getPopupStyles, PopupPosition } from './utils';


interface PopoverProps {
    id: string,
    isOpen: boolean,
    anchor: HTMLElement | null,
    position?: PopupPosition,
    onClose: () => void,
    body: ReactNode,
    addArrow?: boolean,
    keepFocus?: boolean,
    darkenBackground?: boolean
}
// TODO: Arrow position depending on position prop
const Popover = ({ id, isOpen, anchor, position, onClose, body, addArrow = false, keepFocus = false }: PopoverProps) => {

    const [hasRendered, setHasRendered] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const popupPosition = getPopupStyles(anchor, position);

    useClickOutside(popoverRef.current, onClose, keepFocus);

    const togglePopover = () => {
        const popover = popoverRef.current;
        if (!popover) return;

        const popoverClass = "popover-background";

        isOpen ?
            popover.className = popoverClass + ' opened' :
            popover.className = popoverClass;
    }

    useEffect(() => { togglePopover() }, [isOpen]);

    useEffect(() => { setHasRendered(true) }, []);

    return hasRendered ? ReactDOM.createPortal(
        <div className='popover-wrapper' id={id}>
            <div 
                className="popover-background" 
                ref={popoverRef}
                style={popupPosition}
            >
                {addArrow &&
                    <div className='arrow-wrapper'>
                        <div className='arrow'></div>
                    </div>}

                <div className="popover">

                    {body}

                </div>
            </div>
        </div>
    , document.body) : <></>;
};

export default Popover;