import http from 'services/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setDataToStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useSnackbar } from 'zmp-ui';

const accountApiRequest = {
    update: async (data: any) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = data

                resolve(response);
            }, 1500);

        });
        return await http.put<any>('/account/update', data)
    },
}

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();
    const { setAuth, account, token } = useStoreApp();

    return useMutation({
        mutationFn: accountApiRequest.update,
        onSuccess: (data) => {
            openSnackbar({
                icon: true,
                text: "Cập nhật thông tin tài khoản thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            const newData = {...account, ...data}

            queryClient.setQueryData(['account'], newData);

            if (newData) {
                setAuth({account: newData, token})
            }
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