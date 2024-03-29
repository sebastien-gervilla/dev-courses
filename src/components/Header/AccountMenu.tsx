import React from 'react';
import { Link } from '..';

interface AccountMenuProps {
    isAdmin: boolean
    logout: () => void
}

const AccountMenu = ({ isAdmin = false, logout }: AccountMenuProps) => {
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
                    <Link href='/compte'>
                        Compte
                    </Link>
                </li>
                <li>
                    <button onClick={logout}>
                        Déconnexion
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AccountMenu;