import { Snackbar } from "@/components";
import React, { createContext, useState, ReactNode } from "react";

type ContextType = {
    open: (options: SnackbarOptions) => void
    close: () => void
}

const defaultContext: ContextType = {
    open: () => {
        console.warn("Should have been overriden");
    },
    close: () => {
        console.warn("Should have been overriden");
    }
};

const SnackbarContext = createContext(defaultContext);

export const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [closeDelay, setCloseDelay] = useState<undefined | number>(3500);

    const open = (options: SnackbarOptions) => {
        options = {...defaultOptions, ...options};
        if (closeDelay !== options.closeDelay)
            setCloseDelay(options.closeDelay);

        if (message !== options.message)
            setMessage(options.message);

        setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    const context: ContextType = {
        open,
        close
    };

    return (
        <SnackbarContext.Provider value={context}>
            <Snackbar 
                isOpen={isOpen}
                onClose={close}
                message={message}
                closeDelay={closeDelay}
            />
            {children}
        </SnackbarContext.Provider>
    );
};

type SnackbarOptions = {
    message: string
    className?: string
    closeDelay?: number
}

const defaultOptions: SnackbarOptions = {
    message: '',
    className: undefined,
    closeDelay: 3500
}

export default SnackbarContext;
