import http from "services/http";
import { useQueries, useQuery } from "@tanstack/react-query";

const residentApiRequest = {
    getFamilyNumber: async () => {
        return await http.get<any>(`/dancu/soluonghogiadinh`);
    },
    getResidentNumber: async () => {
        return await http.get<any>(`/dancu/soluongdancu`);
    },
    getFamilyMembers: async (id: number) => {
        return await http.get<any>(`/dancu/thanhvienhogiadinh/${id}`);
    },
    getResidentDetail: async (id: number) => {
        return await http.get<any>(`/dancu/chitiet/${id}`);
    },
    getResidentCategory: async () => {
        return await http.get<any>(`/dancu/danhmuc`);
    },
    getResidentList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/dancu?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}`);
    },
}

/**
* GET RESIDENT DATA
**/ 
export const useGetResidentData = () => {
    const [familyNumberQuery, residentNumberQuery] = useQueries({
        queries: [
            {
                queryKey: ["familyNumber"],
                queryFn: async () => {
                    const res = await residentApiRequest.getFamilyNumber();
                    return res.data;
                },
                staleTime: 1000 * 60 * 10,
                retry: 1,
            },
            {
                queryKey: ["residentNumber"],
                queryFn: async () => {
                    const res = await residentApiRequest.getResidentNumber();
                    return res.data;
                },
                staleTime: 1000 * 60 * 10,
                retry: 1,
            },
        ],
    });

    return { familyNumberQuery, residentNumberQuery };
};

/**
* GET FAMILY MEMBERS
**/ 
export const useGetFamilyMembers = (id: number) => {
    return useQuery({
        queryKey: ["familyMembers", id],
        queryFn: async () => {
            try {
                const res = await residentApiRequest.getFamilyMembers(id);
                return res.data;
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thành viên hộ gia đình:", error);
                throw error;
            }
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
};

/**
* GET RESIDENT DETAIL
**/ 
export const useGetResidentDetail = (id: number) => {
    return useQuery({
        queryKey: ["residentDetail", id],
        queryFn: async () => {
            try {
                const res = await residentApiRequest.getResidentDetail(id);
                return res.data;
            } catch (error) {
                console.error("Lỗi khi lấy thông tin hộ dân:", error);
                throw error;
            }
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
};

/**
* GET RESIDENT CATEGORY
**/ 
export const useGetResidentCategory = () => {
    return useQuery({
        queryKey: ["residentCategory"],
        queryFn: async () => {
            try {
                const res = await residentApiRequest.getResidentCategory();
                return res.data;
            } catch (error) {
                console.error("Lỗi khi lấy danh mục hộ dân:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
};

/**
* GET RESIDENT LIST
**/ 
export const useGetResidentListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['residentList', param.page, param.pageSize, param.ApId, param.keyword],
        queryFn: async () => {
            try {
                const res = await residentApiRequest.getResidentList(param);
                return res
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hộ dân:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};