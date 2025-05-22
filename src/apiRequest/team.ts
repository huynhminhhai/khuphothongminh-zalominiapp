import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

export type TeamQueryParams = {
    page: number;
    pageSize: number;
    keyword?: string;
    ApId?: number;
    MaXa?: string;
    TinhTrang?: any;
    TenChucVu?: string;
    HoTen?: string;
};

const teamApiRequest = {
    getTeamList: async (param: TeamQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            TextSearch: param.keyword,
            TinhTrang: param.TinhTrang,
            TenChucVu: param.TenChucVu,
            HoTen: param.HoTen,
        });

        return await http.get<any>(`/bandieuhanh${queryString}`);
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
        return await http.put<any>("/bandieuhanh", formData);
    },
}

/**
* GET TEAM LIST
**/
export const useGetTeamListNormal = (param: TeamQueryParams) => {
    return useQuery({
        queryKey: ['teamList', param],
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
export const useGetTeamList = (param: TeamQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['teamList', param.pageSize, param.ApId, param.keyword, param.TinhTrang, param.TenChucVu, param.HoTen, param.MaXa],
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
* PUT TEAM
**/
export const useUpdateTeam = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await teamApiRequest.updateTeam(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông thành viên thành công')

            queryClient.invalidateQueries({ queryKey: ["teamList"] });
            queryClient.invalidateQueries({ queryKey: ["teamDetail"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};