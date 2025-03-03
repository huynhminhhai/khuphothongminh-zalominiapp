import envConfig from "envConfig";
import { getDataFromStorage, removeDataFromStorage } from "./zalo";

const request = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any
): Promise<T> => {

    const fullUrl = `${envConfig.API_ENDPOINT}${url}`;

    const storedData = await getDataFromStorage(['token']);
    const token = storedData?.token;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const options: RequestInit = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    };

    try {
        const response = await fetch(fullUrl, options);
        const data: T = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                removeDataFromStorage(['token']);
                window.location.href = '/account';
                throw new Error('Token hết hạn');
            }
            window.location.href = '/';
            throw new Error((data as any)?.message || 'Lỗi không xác định (request)');
        }
    
        return data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

const http = {
    get: <T>(url: string) => request<T>('GET', url),
    post: <T>(url: string, body: any) => request<T>('POST', url, body),
    put: <T>(url: string, body: any) => request<T>('PUT', url, body),
    delete: <T>(url: string) => request<T>('DELETE', url),
};

export default http;