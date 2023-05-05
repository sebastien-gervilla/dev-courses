import React from 'react';
import { Column, Row, Table } from '.';
import { IconButton } from '../IconButton';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { useFetch, useModal } from '@/hooks';
import { Popover } from '../Popover';
import { ConfirmModal, Modal } from '../Modal';

const UserTable = () => {

    const usersRes = useFetch('/user', []);

    const modal = useModal();
    
    const deleteUser = () => {
        modal.close();
    }

    const columns: Column[] = [
        {
            field: 'fname',
            title: 'Prénom'
        },
        {
            field: 'email',
            title: 'Email',
        },
        {
            field: 'action',
            title: '',
            flex: .1,
            align: 'right',
            renderCell: (row: Row) => {
                return (
                    <React.Fragment>
                        <IconButton onClick={modal.open}>
                            <AiOutlineEdit className='animated' />
                        </IconButton>
                        <IconButton 
                            onClick={() => modal.openWith(
                                <ConfirmModal 
                                    message='Voulez-vous vraiment supprimer cet utilisateur ?'
                                    onCancel={modal.close}
                                    onConfirm={deleteUser}
                                />
                            )} 
                            style={{ marginLeft: 10 }}
                        >
                            <AiFillDelete className='animated' />
                        </IconButton>
                    </React.Fragment>
                )
            }
        }
    ]

    return (
        <div className="user-table">
            <Table 
                columns={columns}
                data={usersRes.data}
            />
            <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={modal.body}
            />
        </div>
    );
};

export default UserTable;