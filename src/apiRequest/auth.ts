import http from 'services/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeDataFromStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useNavigate, useSnackbar } from 'zmp-ui';

const authApiRequest = {
    login: async (username: string, password: string) => {
        const response = await http.post('/xacthuc/dangnhap', { tenDangNhap:username, matKhau:password });

        return response;
    },
    loginZalo: async (token: string, userAccessToken: string) => {
        // const response = await http.post('/auth/login-zalo', { token, userAccessToken });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJ1c2VybmFtZSI6IkpvaG5Eb2UiLCJleHBpcmVkX2F0Ijp0cnVlLCJpYXQiOjE2Mjk5MTMyNzAsImV4cCI6MTYzMDAwNjg3MH0.8JgDRry6sqhQ6y1KmT6a2ij5pHX6zyXbh8qPz8B9lsB',
                    account: {
                        id: 1,
                        fullname: '',
                        role: 'resident',
                        phoneNumber: '0848551555',
                        avatar: ''
                    },
                };

                resolve(response);
            }, 1500);

        });

        // if (response.token) {
        //     localStorage.setItem('token', response.token);
        // }

        // return response;
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
    const { openSnackbar } = useSnackbar();
    const { setToken, setAccount } = useStoreApp();

    return useMutation({
        mutationFn: async (credentials: { username: string; password: string }) => {
            return authApiRequest.login(credentials.username, credentials.password);
        },
        onSuccess: async (res: any) => {

            openSnackbar({
                icon: true,
                text: "Đăng nhập thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
            
            setToken({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });

            try {
                const res = await authApiRequest.getUserInfo();

                setAccount((res as any).data);
            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }

            queryClient.invalidateQueries({ queryKey: ['account'] });

            navigate('/account');
        },
        onError: (error: any) => {
            openSnackbar({
                icon: true,
                text: error?.message === "Sequence contains no elements" ? "Tên đăng nhập hoặc mật khẩu không chính xác" : "Đăng nhập thất bại",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        },
    });
};

export const useLoginZalo = () => {
    const queryClient = useQueryClient();

    const { openSnackbar } = useSnackbar();
    const { setToken } = useStoreApp();

    return useMutation({
        mutationFn: async (credentials: {token: string, userAccessToken: string }) => {
            return authApiRequest.loginZalo(credentials.token, credentials.userAccessToken);
        },
        onSuccess: (data: any) => {

            openSnackbar({
                icon: true,
                text: "Đăng nhập thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
            queryClient.invalidateQueries({ queryKey: ['account'] });

            setToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        },
        onError: (error: string) => {
            console.error('Lỗi:', error);
            openSnackbar({
                icon: true,
                text: error,
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        },
    });
};

export const useLogout = () => {
    const { openSnackbar } = useSnackbar();
    const { clearAuth } = useStoreApp();

    const logout = async () => {
        try {
            await authApiRequest.logout();
            clearAuth();

            openSnackbar({
                icon: true,
                text: "Đăng xuất thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
            openSnackbar({
                icon: true,
                text: "Đăng xuất thất bại, vui lòng thử lại!",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        }
    };

    return logout;
};