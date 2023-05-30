import React, { useState } from 'react';
import { Column, Table } from '.';
import { useFetch } from '@/hooks';
import { UserTutorialModel } from '@/api';
import { Link } from '@/components';
import { FormField, FormSelect } from '../FormField';
import technologies from '../../docs/technologies.json';
import FormCheckable from '../FormField/FormCheckable';

const UserTutorialsTable = () => {

    const [filters, setFilters] = useState(defaultFilters);

    const tutorialsRes = useFetch('/user/tutorials', []);
    console.log(tutorialsRes);

    const handleChangeFilters = (name: string, value: string | boolean | null) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const getFilteredTutorials = () => {
        if (!tutorialsRes.data?.length) return;

        return tutorialsRes.data.filter((tutorial: UserTutorialModel) =>
            tutorial.infos.title.includes(filters.title) &&
            tutorial.infos.technology.includes(filters.technology)
        );
    }

    const columns: Column[] = [
        {
            field: 'title',
            title: 'Titre',
            renderCell: row => {
                return (
                    <Link 
                        href={'/tutoriels/' + row.infos.slug} 
                        className='animated'
                        target='_blank'
                    >
                        {row.infos.title}
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
                    <p>{row.infos.technology}</p>
                )
            }
        },
        {
            field: 'isCompleted',
            title: 'Complété',
            flex: .4,
            renderCell: row => {
                return (
                    <p>{row.isCompleted ? 'Oui' : 'Non'}</p>
                )
            }
        }
    ]

    return (
        <div className='tutorials-table'>
            <div className="table-filters">
                <FormField 
                    name='title'
                    placeholder='Titre'
                    value={filters.title}
                    onChange={handleChangeFilters}
                />
                <FormSelect
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