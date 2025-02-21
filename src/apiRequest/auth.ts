import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
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
                    user: {
                        id: 1,
                        fullName: 'Huỳnh Minh Hải',
                        role: 'admin',
                        phoneNumber: '0848551555',
                        avatar: 'https://tse2.mm.bing.net/th?id=OIP.WJu4G7zRFs7wEFLLLuXU3QHaD4&pid=Api&P=0&h=180'
                    },
                };

                if (response.token) {
                    setDataToStorage({ token: response.token });
                }

                if (response.user) {
                    setDataToStorage({ account: JSON.stringify(response.user) })
                }

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
    const { setAccount } = useStoreApp();

    return useMutation({
        mutationFn: async (credentials: { username: string; password: string }) => {
            return authApiRequest.login(credentials.username, credentials.password);
        },
        onSuccess: (data) => {

            openSnackbar({
                icon: true,
                text: "Đăng nhập thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
            queryClient.invalidateQueries({ queryKey: ['user'] });

            setAccount((data as any).user);

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

export const useLogout = () => {
    const { openSnackbar } = useSnackbar();
    const { clearAccount } = useStoreApp();

    const logout = () => {
        // Gọi API logout nếu cần
        authApiRequest.logout();

        clearAccount();

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