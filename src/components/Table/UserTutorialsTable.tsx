import React, { useState } from 'react';
import { Column, Table } from '.';
import { useFetch, useModal } from '@/hooks';
import { Link, Modal } from '@/components';
import { TutorialModel } from '@/api';
import { FormField } from '../FormField';
import { FormSelect } from '../FormSelect';
import technologies from '../../docs/technologies.json';
import FormCheckable from '../FormField/FormCheckable';

const UserTutorialsTable = () => {

    const [filters, setFilters] = useState(defaultFilters);

    const tutorialsRes = useFetch('/tutorial', []);

    const modal = useModal();

    const handleChangeFilters = (name: string, value: string | boolean | null) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const getFilteredTutorials = () => {
        if (!tutorialsRes.data?.length) return;

        return tutorialsRes.data.filter((tutorial: TutorialModel) =>
            tutorial.title.includes(filters.title) &&
            tutorial.technology.includes(filters.technology)
        );
    }

    const columns: Column[] = [
        {
            field: 'title',
            title: 'Titre',
            renderCell: row => {
                return (
                    <Link 
                        href={'/tutoriels/' + row.slug} 
                        className='animated'
                        target='_blank'
                    >
                        {row.title}
                    </Link>
                )
            }
        },
        {
            field: 'technology',
            title: 'Technologie',
            flex: .5,
            renderCell: row => {
                return (
                    <p>{row.technology}</p>
                )
            }
        },
        {
            field: 'isCompleted',
            title: 'Complété',
            flex: .4,
            renderCell: row => {
                return (
                    <p>{row.isPremium ? 'Oui' : 'Non'}</p>
                )
            }
        }
    ]

    return (
        <div className='tutorials-table'>
            <div className="table-filters">
                <FormField 
                    label=''
                    name='title'
                    placeholder='Titre'
                    value={filters.title}
                    onChange={handleChangeFilters}
                />
                <FormSelect
                    label=''
                    name='technology'
                    value={filters.technology}
                    options={technologies.all}
                    onChange={handleChangeFilters}
                />
                <FormCheckable 
                    label='Complété'
                    name='completed'
                    state={filters.completed}
                    onChange={handleChangeFilters}
                    style={{ marginLeft: 'auto' }}
                />
            </div>
            <Table
                getRowId={row => row._id}
                columns={columns}
                data={getFilteredTutorials() || []}
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
    title: '',
    technology: 'React',
    completed: null
}

interface CurrentRow {
    anchor: HTMLButtonElement | null
    rowId: string
    slug: string
}

export default UserTutorialsTable;