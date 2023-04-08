type ApiResponse = {
    data: any,
    meta: Object
}

// Typical Request:
// data: Object | Array
// meta: Object
// error: message | null ?

export default class Request {
    static async get(url: URL | RequestInfo, options: RequestInit = defaultOptions): Promise<ApiResponse> {
        try {
            const response = await fetch(API_URL + url, {
                ...defaultOptions,
                ...options
            });
            
            return await response.json();
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