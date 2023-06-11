import React, { useState } from 'react';
import { Column, Table } from '.';
import { useFetch, useModal } from '@/hooks';
import { ConfirmModal, IconButton, Link, Modal, Popover } from '@/components';
import { MdPersonRemoveAlt1 } from 'react-icons/md'
import { Request, UserModel } from '@/api';
import { FormField } from '../FormField';

const UsersTable = () => {

    const [filters, setFilters] = useState(defaultFilters);

    const usersRes = useFetch('/user', []);

    const modal = useModal();

    const handleChangeFilters = (name: string, value: string | boolean) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const deleteUser = async (userId: number) => {
        if (!userId) return;

        const response = await Request.make('/user/' + userId, 'DELETE');
        if (!response.ok) // FEEDBACK SNACKBAR ?
            return;

        modal.close();
        usersRes.refresh();
    }

    const getFilteredUsers = () => {
        if (!usersRes.data?.length) return;

        return usersRes.data.filter((user: UserModel) =>
            user.fname.includes(filters.fname) &&
            user.lname.includes(filters.lname) &&
            user.lname.includes(filters.email)
        );
    }

    const columns: Column[] = [
        {
            field: 'fname',
            title: 'Prénom',
            flex: .6
        },
        {
            field: 'lname',
            title: 'Prénom',
            flex: .6
        },
        {
            field: 'email',
            title: 'Email'
        },
        {
            field: 'isAdmin',
            title: 'Admin',
            flex: .4,
            renderCell: row => {
                return (
                    <p>{row.isAdmin ? 'Oui' : 'Non'}</p>
                )
            }
        },
        {
            field: 'action',
            title: '',
            flex: .1,
            renderCell: row => {
                return (
                    <IconButton onClick={() => modal.openWith(
                        <ConfirmModal 
                            message='Voulez-vous vraiment supprimer cet utilisateur ?'
                            onCancel={modal.close}
                            onConfirm={() => deleteUser(row._id)}
                        />
                    )}>
                        <MdPersonRemoveAlt1 className='animated' />
                    </IconButton>
                )
            }
        }
    ]

    return (
        <div className='users-table'>
            <div className="table-filters">
                <FormField 
                    name='fname'
                    placeholder='Prénom'
                    value={filters.fname}
                    onChange={handleChangeFilters}
                />
                <FormField 
                    name='lname'
                    placeholder='Nom'
                    value={filters.lname}
                    onChange={handleChangeFilters}
                />
                <FormField 
                    name='email'
                    placeholder='Email'
                    value={filters.email}
                    onChange={handleChangeFilters}
                />
                <Link 
                    href='/admin/editor'
                    className='animated-button'
                    style={{ marginLeft: 'auto' }}
                >
                    Ajouter
                </Link>
            </div>
            <Table
                getRowId={row => row._id}
                columns={columns}
                data={getFilteredUsers() || []}
            />
            <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={modal.body}
            />
        </div>
    );
};

const defaultFilters = {
    fname: '',
    lname: '',
    email: ''
}

export default UsersTable;