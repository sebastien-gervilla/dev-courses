import React, { useState } from 'react';
import { Column, Table } from '.';
import { useFetch, useModal } from '@/hooks';
import { Link, Modal } from '@/components';
import { Request, TutorialModel } from '@/api';
import { FormField } from '../FormField';
import { FormSelect } from '../FormSelect';
import technologies from '../../docs/technologies.json';
import FormCheckable from '../FormField/FormCheckable';

const UserCoursesTable = () => {

    const [filters, setFilters] = useState(defaultFilters);

    const coursesRes = useFetch('/tutorial', []);

    const modal = useModal();

    const handleChangeFilters = (name: string, value: string | boolean | null) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const getFilteredCourses = () => {
        if (!coursesRes.data?.length) return;

        return coursesRes.data.filter((tutorial: TutorialModel) =>
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
            renderCell: row => {
                return (
                    <p>{row.technology}</p>
                )
            }
        },
        {
            field: 'isCompleted',
            title: 'Complété',
            renderCell: row => {
                return (
                    <p>{row.isPremium ? 'Oui' : 'Non'}</p>
                )
            }
        }
    ]

    return (
        <div className='courses-table'>
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
                />
            </div>
            <Table
                getRowId={row => row._id}
                columns={columns}
                data={getFilteredCourses() || []}
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

export default UserCoursesTable;