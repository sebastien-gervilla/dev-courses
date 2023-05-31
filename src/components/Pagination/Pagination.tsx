import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PaginationProps {
    page: number
    pages: number
    changePage: (newPage: number) => void
}

const Pagination = ({ page, pages, changePage }: PaginationProps) => {

    const displayPagination = () => {
        let pagination = [];
        const minPage = Math.min(3, pages);
        for (let i = 1; i < minPage + 1; i++)
            pagination.push(
                <button 
                    key={i}
                    onClick={() => changePage(i)}
                    className={'page' + (page === i ? ' selected' : '')}
                >
                    {i}
                </button>
            )
        
        if (minPage >= 3)
            pagination.push(
                <>
                    <div className="page-separator">
                        <BsThreeDots />
                    </div>
                    <button 
                        onClick={() => changePage(pages)}
                        className='page'
                    >
                        {pages}
                    </button>
                </>
            )
        
        return pagination;
    }

    return (
        <div className='pagination'>
            <button onClick={() => changePage(page - 1)}>
                <HiChevronLeft />
            </button>
            {displayPagination()}
            <button onClick={() => changePage(page + 1)}>
                <HiChevronRight />
            </button>
        </div>
    );
};

export default Pagination;