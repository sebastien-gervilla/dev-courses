import React from 'react';
import { Link } from '..';

const Footer = () => {
    return (
        <footer className='app-footer'>
            <div className="footer-content">
                <div className="brand">
                    <Link href="/">
                        Seb Dev
                    </Link>
                    <p>© 2023 Seb Dev.</p>
                </div>
                <div className="website-links links">
                    <p>Tutoriels</p>
                    <ul>
                        <li>
                            <Link href='/tutoriels/react'>
                                React
                            </Link>
                        </li>
                        <li>
                            <Link href='/tutoriels/javascript'>
                                JavaScript
                            </Link>
                        </li>
                        <li>
                            <Link href='/tutoriels/css'>
                                CSS
                            </Link>
                        </li>
                        <li>
                            <Link href='/tutoriels/nodejs'>
                                Node.js
                            </Link>
                        </li>
                        <li>
                            <Link href='/tutoriels/nextjs'>
                                Next.js
                            </Link>
                        </li>
                        <li>
                            <Link href='/tutoriels/react'>
                                React
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="useful-links links">
                    <p>Liens utiles</p>
                    <ul>
                        <li>
                            <Link href='mailto:'>
                                Me contacter
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

export default Footer;