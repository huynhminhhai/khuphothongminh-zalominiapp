import envConfig from "envConfig";
import { getDataFromStorage, removeDataFromStorage } from "./zalo";

const request = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    isFormData: boolean = false
): Promise<T> => {

    // const fullUrl = `/api${url}`;
    const fullUrl = `${envConfig.API_ENDPOINT}${url}`;

    const storedData = await getDataFromStorage(["accessToken", "refreshToken"]);
    const accessToken = storedData?.accessToken || null;
    const refreshToken = storedData?.refreshToken || null;

    const headers: HeadersInit = isFormData
        ? (accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        : {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        };

    const options: RequestInit = {
        method,
        headers,
        body: isFormData ? body : JSON.stringify(body),
    };

    try {
        const response = await fetch(fullUrl, options);
        const data: T = await response.json();

        if (!response.ok) {
            if (response.status === 401) {

                removeDataFromStorage(['account', 'accessToken', 'refreshToken']);
                window.location.href = '/login';
                throw new Error('accessToken hết hạn (request)');
            }

            if (response.status === 500) {
                throw new Error((data as any)?.message || 'Lỗi hệ thống, vui lòng thử lại sau! (request)');
            }

            window.location.href = '/';
            throw new Error((data as any)?.message || 'Lỗi không xác định (request)');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

const http = {
    get: <T>(url: string) => request<T>('GET', url),
    post: <T>(url: string, body: any) => request<T>('POST', url, body),
    put: <T>(url: string, body: any) => request<T>('PUT', url, body),
    delete: <T>(url: string) => request<T>('DELETE', url),
    postFormData: <T>(url: string, formData: FormData) => request<T>('POST', url, formData, true),
    putFormData: <T>(url: string, formData: FormData) => request<T>('PUT', url, formData, true),
};

export default http;