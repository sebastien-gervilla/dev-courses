import React, { useState, MouseEvent } from 'react';
import { Column, Table } from '.';
import { useFetch, useModal } from '@/hooks';
import { ConfirmModal, IconButton, Link, Modal, Popover } from '@/components';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Request, UserModel } from '@/api';
import { FormField } from '../FormField';

const UsersTable = () => {

    const [filters, setFilters] = useState(defaultFilters);

    const usersRes = useFetch('/user', []);

    const modal = useModal();
    const moreMenu = useModal();

    const [currentRow, setCurrentRow] = useState<CurrentRow>(defaultCurrentRow)

    const handleChangeFilters = (name: string, value: string | boolean) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const deleteUser = async () => {
        const id = currentRow.rowId;
        if (!id) return;

        const response = await Request.make('/user/' + id, 'DELETE');
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
                const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
                    setCurrentRow({
                        anchor: event.currentTarget,
                        rowId: row._id,
                        slug: row.slug
                    });
                    moreMenu.open();
                }

                return (
                    <IconButton onClick={handleOpenMenu}>
                        <BsThreeDotsVertical className='animated' />
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
            <Popover 
                id='user-table-menu'
                anchor={currentRow.anchor}
                isOpen={moreMenu.isOpen}
                onClose={moreMenu.close}
                position={{
                    origin: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    },
                    transform: {
                        horizontal: 'right',
                    },
                    gap: {
                        horizontal: 8,
                        vertical: 24
                    }
                }}
                body={
                    <div className='menu'>
                        <Link href={'/admin/editor?id=' + currentRow.rowId}>
                            Editer
                        </Link>
                        <button 
                            onClick={() => modal.openWith(
                                <ConfirmModal 
                                    message='Voulez-vous vraiment supprimer cet utilisateur ?'
                                    onCancel={modal.close}
                                    onConfirm={deleteUser}
                                />
                            )}
                        >
                            Supprimer
                        </button>
                    </div>
                }
                addArrow
            />
        </div>
    );
};

const defaultFilters = {
    fname: '',
    lname: '',
    email: ''
}

interface CurrentRow {
    anchor: HTMLButtonElement | null
    rowId: string
    slug: string
}

const defaultCurrentRow: CurrentRow = {
    anchor: null,
    rowId: '',
    slug: ''
}

export default UsersTable;