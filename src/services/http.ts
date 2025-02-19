import envConfig from "envConfig";
import { getDataFromStorage, removeDataFromStorage } from "./zalo";
import { useNavigate } from "zmp-ui";

const request = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any
): Promise<T> => {

    const navigate = useNavigate()

    const fullUrl = `${envConfig.API_ENDPOINT}${url}`;  // Tạo URL đầy đủ cho API

    const token = getDataFromStorage(['token']);  // Lấy token từ Storage

    // Kiểm tra nếu không có token thì redirect đến trang đăng nhập
    if (!token) {
        window.location.href = '/'; 
        navigate('/'); // Chuyển hướng về trang chủ
        throw new Error('Người dùng chưa đăng nhập');  // Ném lỗi để dừng request
    }

    // Thiết lập headers cho request
    const headers: HeadersInit = {
        'Content-Type': 'application/json',  // Xác định kiểu dữ liệu JSON
        Authorization: `Bearer ${token}`,  // Đính kèm token vào header Authorization
    };

    // Cấu hình request
    const options: RequestInit = {
        method,   // Phương thức (GET, POST, PUT, DELETE)
        headers,  // Headers chứa token
        ...(body && { body: JSON.stringify(body) }),  // Chỉ thêm body nếu có
    };

    try {
        const response = await fetch(fullUrl, options);  // Gửi request đến API
        const data: T = await response.json();  // Chuyển response về JSON

        // Nếu request thất bại
        if (!response.ok) {
            if (response.status === 401) {  // Trường hợp token hết hạn hoặc không hợp lệ
                removeDataFromStorage(['token']);  // Xóa token khỏi Storage
                window.location.href = '/';  // Chuyển hướng về trang đăng nhập
                navigate('/');
                throw new Error('Token hết hạn');  // Ném lỗi để dừng request
            }
            throw new Error((data as any).message || 'Lỗi không xác định (request)');  // Xử lý lỗi chung
        }

        return data;  // Trả về dữ liệu nếu request thành công
    } catch (error) {
        console.error('Fetch error:', error);  // Log lỗi ra console
        throw error;  // Ném lỗi để nơi gọi request có thể xử lý tiếp
    }
};


const http = {
    get: <T>(url: string) => request<T>('GET', url),
    post: <T>(url: string, body: any) => request<T>('POST', url, body),
    put: <T>(url: string, body: any) => request<T>('PUT', url, body),
    delete: <T>(url: string) => request<T>('DELETE', url),
};

export default http;