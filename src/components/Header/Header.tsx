import React, { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineMoon, HiSun } from 'react-icons/hi';
import { Link, IconButton, Modal } from '@/components';
import { ThemeContext } from '@/contexts';
import { useModal } from '@/hooks';
import { LoginForm, SignupForm } from '../Form';
import UserContext from '@/contexts/AuthContext';
import { Request } from '@/api';

const Header = () => {

    const { isDark, toggleDark } = useContext(ThemeContext);
    const { user, refresh } = useContext(UserContext);

    const authModal = useModal();

    const [modalType, setModalType] = useState<ModalType>('login');

    const switchModal = () => setModalType(type => type === 'login' ? 'signup' : 'login');

    const logout = async () => {
        const res = await Request.make('/user/logout', 'POST');
        
        refresh();
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
                <button className='animated-link' onClick={() => {
                    setModalType('login')
                    authModal.open()
                }}>
                    Se connecter
                </button>
                <button className='animated' onClick={() => {
                    setModalType('signup')
                    authModal.open()
                }}>
                    S'inscrire
                </button>
            </div>
        )

        return (
            <div className="auth">
                <button className='animated-link' onClick={logout}>
                    Se déconnecter
                </button>
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
                {displayAccountSection()}
            </div>
            <Modal 
                isOpen={authModal.isOpen}
                onClose={authModal.close}
                body={
                    modalType === 'login' ? 
                        <LoginForm switchModal={switchModal} refresh={refresh} close={authModal.close} /> :
                        <SignupForm switchModal={switchModal} close={authModal.close} />
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