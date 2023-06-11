import { useState, useMemo } from 'react';

export default function usePagination(pages: number, options: PaginationOption = defaultOptions) {
    const [page, setPage] = useState(options.page || 1);

    const [from, to] = useMemo(() => {
        const pageSize = options?.pageSize || 8;
        return [
            (page - 1) * pageSize,
            page * pageSize
        ]
    }, [page, options.pageSize]);

    const change = (newPage: number) => {
        if (newPage < 1 || newPage > pages)
            return;

        setPage(newPage);
        options.onPageChange?.();
    };

    const reset = () => change(options.page || 1);

    return {
        page,
        pages,
        from,
        to,
        change,
        reset
    }
}

type PaginationOption = {
    page?: number
    onPageChange?: () => void
    pageSize?: number
}

const defaultOptions: PaginationOption = {
    page: 1,
    pageSize: 8
}