import React, { useContext, useRef } from 'react';
import { HiOutlineMoon, HiSun } from 'react-icons/hi';
import { Link, IconButton, Popover } from '@/components';
import { ThemeContext } from '@/contexts';
import { useModal } from '@/hooks';
import UserContext from '@/contexts/AuthContext';
import { Request } from '@/api';
import { MdAccountCircle } from 'react-icons/md';
import AccountMenu from './AccountMenu';
import Image from 'next/image';

const Header = () => {

    const { isDark, toggleDark } = useContext(ThemeContext);
    const { user, refresh, openAuthModal } = useContext(UserContext);

    const accountPopover = useModal();

    const accountButtonRef = useRef<HTMLButtonElement | null>(null);

    const logout = async () => {
        const res = await Request.make('/user/logout', 'POST');
        
        res.ok && refresh();
    }

    const displayNavigation = () =>
        NAVIGATION.map(navLink => (
            <li key={navLink.title}>
                <Link 
                    className="animated" 
                    href={navLink.path}
                    showIfActive
                >
                    {navLink.title}
                </Link>
            </li>
        ));

    const displayAccountSection = () => {
        if (!user) return (
            <div className="auth">
                <button 
                    className='animated-link' 
                    onClick={() => openAuthModal('login')}
                >
                    Se connecter
                </button>
                <button 
                    className='animated' 
                    onClick={() => openAuthModal('signup')}>
                    S'inscrire
                </button>
            </div>
        )

        return (
            <div className="auth">
                <button className='animated-link' onClick={logout}>
                    Se déconnecter
                </button>
                <IconButton ref={accountButtonRef} onClick={accountPopover.open}>
                    <MdAccountCircle className='animated' />
                </IconButton>
            </div>
        );
    }   

    const displayDarkModeButton = () =>
        <IconButton aria-label='Changer de thème' onClick={toggleDark}>
            {isDark ? 
                <HiSun className='animated' /> :
                <HiOutlineMoon className='animated' />}
        </IconButton>

    return (
        <header className={'app-header ' + (isDark ? 'dark' : 'light')}>
            <div className="header-content">
                <div className="brand">
                    <Image 
                        src='/images/logo.svg'
                        alt='Some stuff'
                        width={20}
                        height={20}
                        className='logo-img'
                    />
                    <Link href="/" className='logo'>
                        Dev Courses
                    </Link>
                    <div className="buttons">
                        {displayDarkModeButton()}
                    </div>
                </div>
                <nav className="navigation">
                    <ul>
                        {displayNavigation()}
                    </ul>
                </nav>
                {displayAccountSection()}
            </div>
            {!!user && <Popover 
                id='account-popover'
                anchor={accountButtonRef.current}
                isOpen={accountPopover.isOpen}
                onClose={accountPopover.close}
                position={{
                    origin: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    },
                    transform: {
                        horizontal: 'right',
                    },
                    gap: {
                        vertical: 20
                    }
                }}
                body={<AccountMenu isAdmin={user.isAdmin} logout={logout} />}
                addArrow
            />}
        </header>
    );
};

const NAVIGATION = [
    {
        title: 'accueil',
        path: '/'
    },
    {
        title: 'tutoriels',
        path: '/tutoriels'
    },
    {
        title: 'contact',
        path: '/contact'
    }
];

export default Header;