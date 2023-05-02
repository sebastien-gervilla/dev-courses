import React from 'react';
import { Link } from '..';

interface AccountMenuProps {
    isAdmin: boolean
}

const AccountMenu = ({ isAdmin = false }: AccountMenuProps) => {
    return (
        <div className='account-menu'>
            <ul>
                {isAdmin && 
                    <li>
                        <Link href='/admin'>
                            Admin
                        </Link>
                    </li>}
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