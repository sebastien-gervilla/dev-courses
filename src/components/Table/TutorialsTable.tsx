import React, { useState, MouseEvent } from 'react';
import { Column, Table } from '.';
import { useFetch, useModal } from '@/hooks';
import { ConfirmModal, IconButton, Link, Modal, Popover } from '@/components';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Request, TutorialModel } from '@/api';
import { FormField, FormSelect } from '../FormField';
import technologies from '../../docs/technologies.json';

const TutorialsTable = () => {

    const [filters, setFilters] = useState(defaultFilters);

    const tutorialsRes = useFetch('/tutorial', []);

    const modal = useModal();
    const moreMenu = useModal();

    const [currentRow, setCurrentRow] = useState<CurrentRow>(defaultCurrentRow)

    const handleChangeFilters = (name: string, value: string | boolean) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const deleteTutorial = async () => {
        const id = currentRow.rowId;
        if (!id) return;

        const response = await Request.make('/tutorial/' + id, 'DELETE');
        if (!response.ok) // FEEDBACK SNACKBAR ?
            return;

        modal.close();
        tutorialsRes.refresh();
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
            renderCell: row => {
                return (
                    <p>{row.technology}</p>
                )
            }
        },
        {
            field: 'isPremium',
            title: 'Premium',
            renderCell: row => {
                return (
                    <p>{row.isPremium ? 'Oui' : 'Non'}</p>
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
                data={getFilteredTutorials() || []}
            />
            <Modal 
                isOpen={modal.isOpen}
                onClose={modal.close}
                body={modal.body}
            />
            <Popover 
                id='tutorial-table-menu'
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
                                    message='Voulez-vous vraiment supprimer ce tutoriel ?'
                                    onCancel={modal.close}
                                    onConfirm={deleteTutorial}
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
    title: '',
    technology: 'React'
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

export default TutorialsTable;