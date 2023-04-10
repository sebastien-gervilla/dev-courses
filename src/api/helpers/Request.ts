type ApiResponse = {
    ok: boolean,
    status: number,
    statusText: string,
    data: any,
    meta: Object
}

type ApiResponseBody = {
    data: any,
    meta: Object
}

export default class Request {
    static async get(url: URL | RequestInfo, options: RequestInit = defaultOptions): Promise<ApiResponse> {
        const mergedOptions = {
            ...defaultOptions,
            ...options
        }

        try {
            const response = await fetch(API_URL + url, mergedOptions);
            const { ok, status, statusText } = response;

            const responseInfos = { ok, status, statusText, data: null, meta: {} };

            if (!ok || status === 204)
                return responseInfos;
            
            const responseBody: ApiResponseBody = await response.json();

            return {
                ...responseInfos,
                ...responseBody,
            };
        } catch (error) {
            console.log(`\x1b[33mError while fetching with url : ${url}\x1b[37m`);
            console.log(error);
        }

        return defaultResponse;
    }

    static async make(url: URL | RequestInfo, method: string, data?: Object, options: RequestInit = defaultOptions): Promise<ApiResponse> {
        const mergedOptions: RequestInit = {
            ...defaultOptions,
            ...options,
            method,
            body: JSON.stringify(data)
        };
        
        try {
            const response = await fetch(API_URL + url, mergedOptions);
            const { ok, status, statusText } = response;

            const responseInfos = { ok, status, statusText, data: null, meta: {} };

            if (!ok || status === 204)
                return responseInfos;

            const responseBody: ApiResponseBody = await response.json();

            return {
                ...responseInfos,
                ...responseBody,
            };
        } catch (error) {
            console.log(`\x1b[33mError while fetching with url : ${url}\x1b[37m`);
            console.log(error);
        }

        return defaultResponse;
    }
}

const defaultOptions: RequestInit = {
    headers: {
        "Content-Type": 'application/json'
    }
}

const API_URL = process.env.API_URL ?? 'http://localhost:8000';

const defaultResponse: ApiResponse = {
    data: null,
    meta: {}
}