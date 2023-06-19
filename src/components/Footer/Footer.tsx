import React from 'react';
import { Link } from '..';
import Image from 'next/image';

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
                    <div className="brand-logo">
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
                    </div>
                    <p>© 2023 Dev Courses.</p>
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