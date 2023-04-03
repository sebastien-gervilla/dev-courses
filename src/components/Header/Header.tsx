import React, { useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineMoon, HiSun } from 'react-icons/hi';
import { Link, IconButton } from '@/components';
import { ThemeContext } from '@/contexts';

const Header = () => { // TODO: Searchbar ?

    const { isDark, toggleDark } = useContext(ThemeContext);

    const displayNavigation = () =>
        NAVIGATION.map(navLink => (
            <li key={navLink}>
                <Link 
                    className="animated" 
                    href={`/${navLink}`}
                    showIfActive
                >
                    {navLink}
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
                <div className="header-nav">
                    <div className="brand">
                        <Link href="/">
                            Seb Dev
                        </Link>
                    </div>
                    <nav className="app-navigation">
                        <ul>
                            {displayNavigation()}
                        </ul>
                    </nav>
                </div>
                <div className="buttons">
                    {displayDarkModeButton()}
                    <IconButton aria-label='Rechercher un article'>
                        <AiOutlineSearch className='animated' />
                    </IconButton>
                </div>
            </div>
        </header>
    );
};

const NAVIGATION = ['accueil', 'tutoriels', 'blog', 'contact'];

export default Header;