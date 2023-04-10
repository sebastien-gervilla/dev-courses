export interface PopupPosition {
    origin?: {
        vertical?: VerticalPosition,
        horizontal?: HorizontalPosition
    },
    transform?: {
        vertical?: VerticalPosition,
        horizontal?: HorizontalPosition
    },
    gap?: {
        vertical?: number,
        horizontal?: number
    }
}

export enum Position {
    'top' = 0,
    'left' = 0,
    'center' = 0.5,
    'right' = 1,
    'bottom' = 1
}

type VerticalPosition = 'top' | 'center' | 'bottom';
type HorizontalPosition = 'left' | 'center' | 'right';

export const getPopupStyles = (anchor: HTMLElement | null, popupPosition: PopupPosition = defaultAnchoredPosition) => {
    if (!anchor) return defaultPosition;

    const position = getPopupRect(anchor, popupPosition);
    const transform = getPopupTransform(popupPosition);

    return {
        top: position.top,
        left: position.left,
        transform
    }
}

const getPopupRect = (anchor: HTMLElement, position: PopupPosition) => {
    const rect = anchor.getBoundingClientRect();
    const topOrigin = Position[position?.origin?.vertical || 'center'] || 0;
    const leftOrigin = Position[position?.origin?.horizontal || 'right'] || 0;
    const top = rect.top + rect.height * topOrigin;
    const left = rect.left + rect.width * leftOrigin;

    return {
        top: Math.ceil(top + (position?.gap?.vertical || 0)) + 'px',
        left: Math.ceil(left + (position?.gap?.horizontal || 0)) + 'px'
    }
}

const getPopupTransform = (position: PopupPosition) => {
    const xOrigin = Position[position?.transform?.horizontal || 'top'] || 0;
    const yOrigin = Position[position?.transform?.vertical || 'left'] || 0;
    const transformX = -100 * xOrigin;
    const transformY = -100 * yOrigin;
    return `translate(${transformX}%, ${transformY}%)`;
}

const defaultPosition = {
    top: 0,
    left: 0
}

const defaultAnchoredPosition: PopupPosition = {
    origin: {
        vertical: 'bottom',
        horizontal: 'center'
    },
    transform: {
        vertical: 'top',
        horizontal: 'left'
    },
    gap: {
        vertical: 20,
        horizontal: 0
    }
}