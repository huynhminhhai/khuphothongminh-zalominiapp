import http from 'services/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeDataFromStorage, setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useNavigate, useSnackbar } from 'zmp-ui';

const authApiRequest = {
    login: async (username: string, password: string) => {
        // const response = await http.post<{ token: string }>('/auth/login', { username, password });

        return new Promise((resolve, reject) => {
            // console.log('call api login with: ', { username, password });
            setTimeout(() => {
                const response = {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJ1c2VybmFtZSI6IkpvaG5Eb2UiLCJleHBpcmVkX2F0Ijp0cnVlLCJpYXQiOjE2Mjk5MTMyNzAsImV4cCI6MTYzMDAwNjg3MH0.8JgDRry6sqhQ6y1KmT6a2ij5pHX6zyXbh8qPz8B9lsA',
                    account: {
                        id: 10,
                        fullname: 'Nguyễn Văn A',
                        role: 'admin',
                        phoneNumber: '0848551444',
                        avatar: 'https://tse2.mm.bing.net/th?id=OIP.WJu4G7zRFs7wEFLLLuXU3QHaD4&pid=Api&P=0&h=180',
                        email: 'example@gmail.com',
                        birthDate: '12/12/2000',
                        gender: 1
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
    logout: () => {
        removeDataFromStorage(['token', 'account']);
    }
}

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();
    const { setAuth } = useStoreApp();

    return useMutation({
        mutationFn: async (credentials: { username: string; password: string }) => {
            return authApiRequest.login(credentials.username, credentials.password);
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

            setAuth({
                account: data.account || null,
                token: data.token || null,
            });

            navigate('/account');
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

export const useLoginZalo = () => {
    const queryClient = useQueryClient();

    const { openSnackbar } = useSnackbar();
    const { setAuth } = useStoreApp();

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

            setAuth({
                account: data.account || null,
                token: data.token || null,
            });
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

    const logout = () => {
        authApiRequest.logout();

        clearAuth();

        openSnackbar({
            icon: true,
            text: "Đăng xuất thành công thành công",
            type: 'success',
            action: { text: "Đóng", close: true },
            duration: 3000,
        });
    };

    return logout;
};