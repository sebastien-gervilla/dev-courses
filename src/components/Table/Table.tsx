import { usePagination } from '@/hooks';
import React, { ReactNode } from 'react';
import { Pagination } from '../Pagination';

interface TableProps {
    getRowId: (row: Row) => string | number
    columns: Array<Column>
    data: Array<Row>
    pageSize?: number
}

const Table = ({ getRowId, columns, data, pageSize = 8 }: TableProps) => {

    const pagination = usePagination(Math.ceil(data.length / pageSize));

    const getTemplateColumns = () => {
        return columns.reduce((template, column) =>
            template + (column.flex ? column.flex : 1) + 'fr '
        , '');
    }

    const displayHeader = () => {
        if (!columns.length) return;

        return (
            <div 
                className="table-header"
                style={{ gridTemplateColumns: getTemplateColumns() }}    
            >
                {columns.map(column => 
                    <p key={column.field}>{column.title}</p>
                )}
            </div>
        );
    }

    const displayRows = () => {
        if (!columns.length || !data.length)
            return;

        const { from, to } = pagination;
        const rows = data.slice(from, to);

        return rows.map(row => displayColumns(row));
    }

    const displayColumns = (row: Row) => {
        return columns.map(column => {
            const value = row[column.field];
            
            return (
                <div 
                    key={column.field + ' ' + getRowId(row)}
                    className="column"
                    style={{ justifyContent: FlexAlignment[column.align || 'left'] }}
                >
                    {column.renderCell ? 
                        column.renderCell(row) :
                        <p>{value}</p>}
                </div>
            )
        });
    }

    return (
        <div className="table">
            {displayHeader()}
            <div 
                className="rows"
                style={{ gridTemplateColumns: getTemplateColumns() }}
            >
                {displayRows()}
            </div>
            <Pagination 
                page={pagination.page}
                pages={pagination.pages}
                changePage={pagination.change}
            />
        </div>
    );
};

export interface Column {
    field: string
    title: string
    renderCell?: (row: Row) => ReactNode
    flex?: number
    align?: Alignment
}

export type Row = { [key: string]: any }

type Alignment = 'left' | 'center' | 'right';

enum FlexAlignment {
    'left' = 'flex-start',
    'center' = 'center',
    'right' = 'flex-end'
}

export default Table;