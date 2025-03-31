import http from "services/http";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "zmp-ui";

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
    getChuHosList: async () => {
        return await http.get<any>(`/dancu/chuhos`);
    },
    createResident: async (data: any) => {
        return await http.post<any>(`/dancu`, data);
    },
    deleteResident: async (id: number) => {
        return await http.delete<any>(`/dancu/${id}`);
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

/**
* GET CHU HO LIST
**/ 
export const useGetChuHosList = () => {
    return useQuery({
        queryKey: ['chuhosList'],
        queryFn: async () => {
            try {
                const res = await residentApiRequest.getChuHosList();

                return res.data
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hộ dân:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

/**
* POST RESIDENT
**/ 
export const useCreateResident = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await residentApiRequest.createResident(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Tạo dân cư thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["residentList"] });
        },
        onError: (error: string) => {
            openSnackbar({
                icon: true,
                text: `Lỗi: ${error}`,
                type: "error",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        },
    });
};

/**
* DELETE NEWS
**/ 
export const useDeleteResident = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await residentApiRequest.deleteResident(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa dân cư thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["residentList"] });
        },
        onError: (error: string) => {
            openSnackbar({
                icon: true,
                text: `Lỗi: ${error}`,
                type: "error",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        },
    });
};