import React, { useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineMoon, HiSun } from 'react-icons/hi';
import { Link, IconButton, Modal } from '@/components';
import { ThemeContext } from '@/contexts';
import { useModal } from '@/hooks';

const Header = () => { // TODO: Searchbar ?

    const { isDark, toggleDark } = useContext(ThemeContext);

    const authModal = useModal();

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
                    <Link href="/">
                        Seb Dev
                    </Link>
                    <div className="buttons">
                        {displayDarkModeButton()}
                        <IconButton aria-label='Rechercher un article'>
                            <AiOutlineSearch className='animated' />
                        </IconButton>
                    </div>
                </div>
                <nav className="navigation">
                    <ul>
                        {displayNavigation()}
                    </ul>
                </nav>
                <div className="auth">
                    <button className='animated-link'>
                        Se connecter
                    </button>
                    <button className='animated'>
                        S'inscrire
                    </button>
                </div>
            </div>
            <Modal 
                isOpen={authModal.isOpen}
                onClose={authModal.close}
                body={
                    
                }
            />
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
        title: 'blog',
        path: '/blog'
    },
    {
        title: 'contact',
        path: '/contact'
    }
];

type ModalType = 'login' | 'signup';

export default Header;