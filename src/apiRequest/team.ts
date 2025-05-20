import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

const teamApiRequest = {
    getTeamList: async (param: {
        page: number;
        pageSize: number;
        ApId: number;
        keyword: string;
        TinhTrang: any;
        TenChucVu: string;
        HoTen: string;
    }) => {
        return await http.get<any>(`/bandieuhanh?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}&TinhTrang=${param.TinhTrang}&TenChucVu=${param.TenChucVu}&HoTen=${param.HoTen}`);
    },
    getTeamType: async () => {
        return await http.get<any>(`/bandieuhanh/danhmuc`);
    },
    getTeamDetail: async (id: number) => {
        return await http.get<any>(`/bandieuhanh/chitiet/${id}`);
    },
    deleteTeam: async (id: number) => {
        return await http.delete<any>(`/bandieuhanh/${id}`)
    },
    createTeam: async (formData: any) => {
        return await http.post<any>("/bandieuhanh", formData);
    },
    updateTeam: async (formData: any) => {
        return await http.put<any>("/thuchi", formData);
    },
}

/**
* GET TEAM LIST
**/
export const useGetTeamListNormal = (param: {
    page: number;
    pageSize: number;
    ApId: number;
    keyword: string;
    TinhTrang: any;
    TenChucVu: string;
    HoTen: string;
}) => {
    return useQuery({
        queryKey: ['teamList', param.page, param.pageSize, param.ApId, param.keyword, param.TinhTrang, param.TenChucVu, param.HoTen],
        queryFn: async () => {
            const res = await teamApiRequest.getTeamList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET TRANSACTION LIST (INFINITE)
**/
export const useGetTeamList = (param: {
    page: number;
    pageSize: number;
    ApId: number;
    keyword: string;
    TinhTrang: any;
    TenChucVu: string;
    HoTen: string;
}) => {

    return useInfiniteQuery({
        queryKey: ['teamList', param.page, param.pageSize, param.ApId, param.keyword, param.TinhTrang, param.TenChucVu, param.HoTen],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await teamApiRequest.getTeamList({ ...param, page: pageParam });

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, allPages) => {
            return lastPage.length === param.pageSize ? allPages.length + 1 : undefined;
        },
        staleTime: 0,
        retry: 1,
    })
};

/**
* GET TRANSACTION TYPE
**/
export const useGetTeamType = () => {
    return useQuery({
        queryKey: ["teamType"],
        queryFn: async () => {
            try {
                const res = await teamApiRequest.getTeamType();
                return res.data
            } catch (error) {
                console.error("Lỗi khi lấy danh mục ban điều hành:", error);
                throw error;
            }
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET TEAM DETAIL
**/
export const useGetTeamDetail = (id: number) => {

    return useQuery({
        queryKey: ['teamDetail', id],
        queryFn: async () => {
            try {

                const res = await teamApiRequest.getTeamDetail(id);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!id,
        staleTime: 0,
        retry: 1,
    });
};

/**
* DELETE TEAM
**/
export const useDeleteTeam = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await teamApiRequest.deleteTeam(id);
        },
        onSuccess: () => {
            showSuccess('Xóa thành viên thành công')

            queryClient.invalidateQueries({ queryKey: ["teamList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST TEAM
**/
export const useCreateTeam = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await teamApiRequest.createTeam(formData);
        },
        onSuccess: () => {
            showSuccess('Thêm thành viên thành công')

            queryClient.invalidateQueries({ queryKey: ["teamList"] });

            navigator('/team-management')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT TRANSACTION
**/
export const useUpdateTeam = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await teamApiRequest.updateTeam(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionDetail"] });
            queryClient.invalidateQueries({ queryKey: ["transactionList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};