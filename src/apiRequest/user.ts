import { useQuery } from "@tanstack/react-query";
import http from "services/http";

const userApiRequest = {
    getUserInfo: async () => {
        return await http.get<any>(`/nguoidung`);
    },
    getUserList : async () => {
        return await http.get<any>(`/nguoidung/nguoidungtheodiaphuong`);
    }
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
        staleTime: 0,
        retry: 1,
    });
};

export const useGetUserList = () => {
    return useQuery({
        queryKey: ["userList"],
        queryFn: async () => {
            try {
                const res = await userApiRequest.getUserList();

                return res.data;
            } catch (error) {
                console.error("Lỗi khi lấy người dùng theo địa phương:", error);
                throw error;
            }
        },
        staleTime: 0,
        retry: 1,
    });
};