import React from 'react';
import { Link } from '..';

const Footer = () => {

    const displayLinks = () => {
        return technologies.map(technology => (
            <li key={technology}>
                <Link href='/tutoriels/javascript'>
                    {technology}
                </Link>
            </li>
        ));
    }

    return (
        <footer className='app-footer'>
            <div className="footer-content">
                <div className="brand">
                    <Link href="/">
                        DevCourses
                    </Link>
                    <p>© 2023 DevCourses.</p>
                </div>
                <div className="website-links links">
                    <p>Tutoriels</p>
                    <ul>
                        {displayLinks()}
                    </ul>
                </div>
                <div className="useful-links links">
                    <p>Liens utiles</p>
                    <ul>
                        <li>
                            <Link href='/contact'>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href='/politique-de-confidentialité'>
                                Politique de confidentialité
                            </Link>
                        </li>
                        <li>
                            <Link href='/conditions-utilisation'>
                                Conditions d'utilisation
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

const technologies = [
    'React',
    'Next.js',
    'Node.js',
    'Vue',
    'Nuxt.js',
    'Typescript'
]

export default Footer;