import React from 'react';
import { Link } from '..';

const AccountMenu = () => {
    return (
        <div className='account-menu'>
            <ul>
                <li>
                    <Link href='/mes-cours'>
                        Mes cours
                    </Link>
                </li>
                <li>
                    <Link href='/parametres'>
                        Paramètres
                    </Link>
                </li>
                <li>
                    <button>
                        Déconnexion
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AccountMenu;