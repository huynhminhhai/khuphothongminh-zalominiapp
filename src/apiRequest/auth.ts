import http from 'services/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStoreApp } from 'store/store';
import { useNavigate } from 'zmp-ui';
import envConfig from 'envConfig';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';

const authApiRequest = {
    login: async (username: string, password: string) => {
        const response = await http.post('/xacthuc/dangnhap', { tenDangNhap: username, matKhau: password });

        return response;
    },
    loginZalo: async (token: string, userAccessToken: string) => {
        const response = await http.post('/xacthuc/dangnhap/zalo', {
            userAccessToken,
            token,
            secretKey: envConfig.SECRECT_KEY
        });

        return response;
    },
    getUserInfo: async () => {
        const response = await http.get('/xacthuc/thongtinnguoidung');

        return response;
    },
    logout: async () => {
        const response = await http.post('/xacthuc/dangxuat', {});

        return response;
    }
}

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setToken, setAccount } = useStoreApp();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (credentials: { username: string; password: string }) => {
            return authApiRequest.login(credentials.username, credentials.password);
        },
        onSuccess: async (res: any) => {

            showSuccess('Đăng nhập thành công');

            setToken({ accessToken: res?.data?.accessToken, refreshToken: res?.data?.refreshToken, hanSuDungToken: res?.data?.hanSuDung });
            
            try {
                const res = await authApiRequest.getUserInfo();

                setAccount((res as any).data);
            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }

            queryClient.invalidateQueries({ queryKey: ['account'] });

            navigate('/');
        },
        onError: (error: any) => {
            console.error('Lỗi:', error);
            showError(error?.message);
        },
    });
};

export const useLoginZalo = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();
    const { setToken, setAccount } = useStoreApp();

    return useMutation({
        mutationFn: async (credentials: { token: string, userAccessToken: string }) => {
            return authApiRequest.loginZalo(credentials.token, credentials.userAccessToken);
        },
        onSuccess: async (res: any) => {

            showSuccess('Đăng nhập bằng Zalo thành công');

            setToken({ accessToken: res?.data?.accessToken, refreshToken: res?.data?.refreshToken, hanSuDungToken: res?.data?.hanSuDung });

            try {
                const res = await authApiRequest.getUserInfo();

                setAccount((res as any).data);
            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }

            queryClient.invalidateQueries({ queryKey: ['account'] });

            navigate('/');
        },
        onError: (error: string) => {
            console.error('Lỗi:', error);
            showError(error);
        },
    });
};

export const useLogout = () => {
    const { clearAuth } = useStoreApp();
    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();

    const logout = async () => {
        try {
            await authApiRequest.logout();
            clearAuth();

            showSuccess('Đăng xuất thành công')

            navigate('/login');


        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
            showError('Đăng xuất thất bại, vui lòng thử lại!')
        }
    };

    return logout;
};