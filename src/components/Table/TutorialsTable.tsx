import React from 'react';
import { Column, Row, Table } from '.';
import { useFetch, useModal } from '@/hooks';
import { Link, Modal } from '@/components';

const TutorialsTable = () => {

    const tutorialsRes = useFetch('/tutorial', []);

    const modal = useModal();

    const columns: Column[] = [
        {
            field: 'title',
            title: 'Title'
        },
        {
            field: 'action',
            title: '',
            renderCell: (row: Row) => {
                return (
                    <p>OK</p>
                )
            }
        }
    ]

    return (
        <div className='tutorials-table'>
            <Link 
                href='/admin/new-tutorial'
                className='animated'
            >
                Créer un tutoriel
            </Link>
            <Table
                columns={columns}
                data={tutorialsRes.data}
            />
            <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={modal.body}
            />
        </div>
    );
};

export default TutorialsTable;