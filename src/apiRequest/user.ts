import { useQuery } from "@tanstack/react-query";
import http from "services/http";

const userApiRequest = {
    getUserInfo: async () => {
        return await http.get<any>(`/nguoidung`);
    },
}

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            try {
                const res = await userApiRequest.getUserInfo();

                return res.data;
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};