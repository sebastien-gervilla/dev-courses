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
        const mergedOptions: RequestInit = {
            ...defaultOptions,
            ...options,
            headers: {
                "Content-Type": 'application/json',
                ...options.headers
            }
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

    static async make(url: URL | RequestInfo, method: Method, data?: Object, options: RequestInit = defaultOptions): Promise<ApiResponse> {
        const mergedOptions: RequestInit = {
            ...defaultOptions,
            ...options,
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
                ...options.headers
            },
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

    static async post(url: URL | RequestInfo, data?: Object, options: RequestInit = defaultOptions) {
        return await Request.make(url, 'POST', data, options);
    }

    static async put(url: URL | RequestInfo, data?: Object, options: RequestInit = defaultOptions) {
        return await Request.make(url, 'PUT', data, options);
    }

    static async delete(url: URL | RequestInfo, options: RequestInit = defaultOptions) { // TODO: Separate function
        return await Request.make(url, 'PUT', undefined, options);
    }

    // Methods for cookies
    static async srvGet(url: URL | RequestInfo, cookies?: string, options: RequestInit = defaultOptions): Promise<ApiResponse> {
        return Request.get(url, {
            ...options,
            headers: {
                Cookie: cookies || ''
            }
        })
    }
}

const defaultOptions: RequestInit = {
    credentials: 'include'
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const defaultResponse: ApiResponse = {
    ok: false,
    status: 404,
    statusText: "Error",
    data: null,
    meta: {}
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';