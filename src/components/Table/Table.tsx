import React, { ReactNode } from 'react';

interface TableProps {
    columns: Array<Column>
    data: Array<Row>
}

const Table = ({ columns, data }: TableProps) => {

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
                {columns.map(column => <p>{column.title}</p>)}
            </div>
        );
    }

    const displayRows = () => {
        if (!columns.length || !data.length)
            return;

        return data.map(row => displayColumns(row));
    }

    const displayColumns = (row: Row) => {
        return columns.map(column => {
            const value = row[column.field];
            
            return (
                <div 
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