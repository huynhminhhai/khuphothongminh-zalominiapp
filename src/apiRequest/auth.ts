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
    },
    updateAccount: async (formData: any) => {
        return await http.putFormData<any>('/nguoidung/thongtincanhan', formData);
    },
    registerAp: async (formData: any) => {
        return await http.put<any>('/nguoidung/dangkythongtinnguoidung', formData);
    },
    refeshToken: async ({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }) => {
        return await http.post<any>('/xacthuc/refreshtoken', { accessToken, refreshToken });
    },
    changePassword: async (formData: any) => {
        return await http.putFormData<any>('/nguoidung/thongtincanhan', formData);
    },
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

            navigate('/');
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
            showError('Đăng xuất thất bại, vui lòng thử lại!')
        }
    };

    return logout;
};

/**
* PUT ACCOUNT
**/
export const useUpdateAccount = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const { setAccount } = useStoreApp();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await authApiRequest.updateAccount(formData);
        },
        onSuccess: async () => {
            showSuccess('Cập nhật thông tin tài khoản thành công');

            try {
                const res = await authApiRequest.getUserInfo();

                setAccount((res as any).data);
            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }

            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT PASSWORD
**/
export const useChangePassword = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const { setAccount } = useStoreApp();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await authApiRequest.changePassword(formData);
        },
        onSuccess: async () => {
            showSuccess('Cập nhật mật khẩu thành công');

            try {
                const res = await authApiRequest.getUserInfo();

                setAccount((res as any).data);
            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }

            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT ACCOUNT AP
**/
export const useRegisterAp = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const { setAccount, setToken, account, accessToken, refreshToken } = useStoreApp();
    const navigator = useNavigate();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await authApiRequest.registerAp(formData);
        },
        onSuccess: async () => {

            try {
                if (!accessToken || !refreshToken) {
                    throw new Error("Thiếu accessToken hoặc refreshToken");
                }

                const [resUserInfo, resToken] = await Promise.all([
                    authApiRequest.getUserInfo(),
                    authApiRequest.refeshToken({
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }),
                ]);

                const newToken = resToken?.data;
                const userInfo = (resUserInfo as any)?.data;

                if (newToken) {
                    setToken({
                        accessToken: newToken.accessToken,
                        refreshToken: newToken.refreshToken,
                        hanSuDungToken: newToken.hanSuDung,
                    });
                }

                if (userInfo) {
                    setAccount(userInfo);
                }

                showSuccess('Đăng ký thông tin Khu phố/Ấp thành công');

                navigator('/');
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng hoặc refresh token:", error);
            }

            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* REFRESH TOKEN
**/
export const useRefreshToken = () => {
    const { showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const { setAccount, setToken, accessToken, refreshToken } = useStoreApp();

    return useMutation({
        mutationFn: async () => {
            if (!accessToken || !refreshToken) {
                throw new Error("Thiếu accessToken hoặc refreshToken");
            }

            const resToken = await authApiRequest.refeshToken({ accessToken, refreshToken });
            const newToken = resToken?.data;
            if (!newToken) throw new Error("Không nhận được token mới");

            setToken({
                accessToken: newToken.accessToken,
                refreshToken: newToken.refreshToken,
                hanSuDungToken: newToken.hanSuDung,
            });

            const resUserInfo = await authApiRequest.getUserInfo();
            const userInfo = (resUserInfo as any)?.data;

            return { newToken, userInfo };
        },
        onSuccess: async ({ userInfo }) => {
            if (userInfo) setAccount(userInfo);
            queryClient.invalidateQueries({ queryKey: ['account'] });

        },
        onError: (error) => {
            console.error("Lỗi khi refresh token:", error);
            showError(error || 'Lỗi refresh token');
        },
    });
};