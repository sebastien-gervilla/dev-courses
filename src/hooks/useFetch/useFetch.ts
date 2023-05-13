import { Request } from '@/api';
import { useEffect, useState } from 'react';

export default function useFetch(
        url: URL | RequestInfo, 
        defaultValue: any = [], 
        options: RequestOptions = defaultOptions
    ) {

    const [data, setData] = useState(defaultValue);

    const canFetch = () => {
        if (!options.requiredValues?.length)
            return true;
            
        return options.requiredValues.some(
            value => !!value
        );
    }

    const fetch = async () => {
        if (!canFetch())
            return;
            
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
    params?: RequestInit
    requiredValues?: Array<any>
    onSuccess?: (data: any) => void
}

const defaultOptions: RequestOptions = {
    params: {},
    requiredValues: []
}