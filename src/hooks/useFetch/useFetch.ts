import { Request } from '@/api';
import { useEffect, useState } from 'react';

export default function useFetch(
        url: URL | RequestInfo, 
        defaultValue = [], 
        options: RequestOptions = defaultOptions
    ) {

    const [data, setData] = useState(defaultValue);

    const fetch = async () => {
        const response = await Request.get(url, options.params);
        setData(response.data || defaultValue);
    }

    useEffect(() => {
        fetch();
    }, [url]);

    return {
        data,
        refresh: fetch
    }
}

interface RequestOptions {
    params: RequestInit
}

const defaultOptions: RequestOptions = {
    params: {}
}