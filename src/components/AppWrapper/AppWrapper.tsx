import React, { ReactNode, useContext } from 'react';
import { ThemeContext } from '@/contexts';

const AppWrapper = ({ children }: { children: ReactNode }) => {

    const { isDark } = useContext(ThemeContext)

    return (
        <div className={'app-wrapper ' + (isDark ? 'dark' : 'light')}>
            {children}
        </div>
    );
};

export default AppWrapper;