import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import envConfig from "envConfig";
import http from "services/http";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

const zaloApiRequest = {
    getLocationAccount: async (token: string, userAccessToken: string) => {
        const response = await http.post('/zalo/vitrihientai', {
            userAccessToken,
            token,
            secretKey: envConfig.SECRECT_KEY
        });

        return response;
    },
}

export const useGetLocationAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (credentials: { token: string, userAccessToken: string }) => {
            return zaloApiRequest.getLocationAccount(credentials.token, credentials.userAccessToken);
        },
        onSuccess: async (res: any) => {

            showSuccess('Lấy vị trí thành công');

            return res;
        },
        onError: (error: string) => {
            console.error('Lỗi:', error);
            showError(error);
        },
    });
};