import { useState } from 'react';

export default function usePagination(pages: number, options: PaginationOption = defaultOptions) {
    const [page, setPage] = useState(options.page || 1);

    const change = (newPage: number) => {
        if (newPage < 1 || newPage > pages)
            return;

        setPage(newPage);
        options.onPageChange?.();
    };

    return {
        page,
        pages,
        change
    }
}

type PaginationOption = {
    page?: number
    onPageChange?: () => void
}

const defaultOptions: PaginationOption = {
    page: 1
}