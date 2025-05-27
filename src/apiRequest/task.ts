import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

export type TaskQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    NguoiThucHienId?: number;
    TinhTrangId?: number;
    keyword?: string;
    TieuDe?: string;
};

export type TienDoThucHienNhiemVuParams = {
    page: number,
    pageSize: number,
    nhiemVuId: number,
}

const taskApiRequest = {
    getTaskList: async (param: TaskQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            NguoiThucHienId: param.NguoiThucHienId,
            TinhTrangId: param.TinhTrangId,
            TextSearch: param.keyword,
            TieuDe: param.TieuDe,
        });

        return await http.get<any>(`/nhiemvu${queryString}`);
    },
    getMyTaskList: async (param: TaskQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            NguoiThucHienId: param.NguoiThucHienId,
            TinhTrangId: param.TinhTrangId,
            TextSearch: param.keyword,
            TieuDe: param.TieuDe,
        });

        return await http.get<any>(`/nhiemvu/cuatoi${queryString}`);
    },
    getTaskDetail: async (id: number) => {
        return await http.get<any>(`/nhiemvu/chitiet/${id}`);
    },
    getTaskStatus: async () => {
        return await http.get<any>(`/nhiemvu/danhmuc`);
    },
    updateTaskStatus: async (param: { nhiemVuId: number; tinhTrangId: number; }) => {
        return await http.put<any>(`/nhiemvu/tinhtrang`, {
            nhiemVuId: param.nhiemVuId,
            tinhTrangId: param.tinhTrangId
        });
    },
    deleteTask: async (id: number) => {
        return await http.delete<any>(`/nhiemvu/${id}`)
    },
    createTask: async (formData: any) => {
        return await http.post<any>("/nhiemvu", formData);
    },
    updateTask: async (formData: any) => {
        return await http.put<any>("/nhiemvu", formData);
    },
    addFileTask: async (formData: any) => {
        return await http.postFormData<any>("/taptinnhiemvu/many", formData);
    },
    deleteFileTask: async (id: number) => {
        return await http.delete<any>(`/taptinnhiemvu/${id}`)
    },
    getDanhSachTienDoNhiemVu: async (param: TienDoThucHienNhiemVuParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            nhiemVuId: param.nhiemVuId
        });

        return await http.get<any>(`/tiendothuchiennhiemvu${queryString}`);
    },
    getDanhSachTienDoNhiemVuCuaToi: async (param: TienDoThucHienNhiemVuParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            nhiemVuId: param.nhiemVuId
        });

        return await http.get<any>(`/tiendothuchiennhiemvu/cuatoi${queryString}`);
    },
    createTienDoNhiemVu: async (formData: any) => {
        return await http.postFormData<any>("/tiendothuchiennhiemvu", formData);
    },
    deleteTienDoNhiemVu: async (id: number) => {
        return await http.delete<any>(`/tiendothuchiennhiemvu/${id}`)
    },
}

/**
* GET TASK LIST
**/
export const useGetTaskListNormal = (param: TaskQueryParams) => {
    return useQuery({
        queryKey: ['taskList', param],
        queryFn: async () => {
            const res = await taskApiRequest.getTaskList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET MY TASK LIST
**/
export const useGetMyTaskListNormal = (param: TaskQueryParams) => {
    return useQuery({
        queryKey: ['myTaskList', param],
        queryFn: async () => {
            const res = await taskApiRequest.getMyTaskList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET MY TASK LIST (INFINITE)
**/
export const useGetMyTaskList = (param: TaskQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['myTaskList', param.pageSize, param.NguoiThucHienId, param.NguoiTao, param.ApId, param.TinhTrangId, param.MaXa, param.keyword, param.TieuDe],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await taskApiRequest.getMyTaskList({ ...param, page: pageParam });

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
* GET TASK DETAIL
**/
export const useGetTaskDetail = (id: number) => {

    return useQuery({
        queryKey: ['taskDetail', id],
        queryFn: async () => {
            try {

                const res = await taskApiRequest.getTaskDetail(id);

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
* GET TASK STATUS
**/
export const useGetTaskStatus = () => {
    return useQuery({
        queryKey: ["taskStatus"],
        queryFn: async () => {
            try {
                const res = await taskApiRequest.getTaskStatus();
                return res.data.tinhTrangs
            } catch (error) {
                console.error("Lỗi khi lấy danh mục nhiệm vụ:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });
};

/**
* PUT TASK STATUS
**/
export const useUpdateTaskStatus = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { nhiemVuId: number; tinhTrangId: number; }) => {
            return await taskApiRequest.updateTaskStatus(param);
        },
        onSuccess: () => {
            showSuccess('Cập nhật trạng thái thành công')

            queryClient.invalidateQueries({ queryKey: ["taskList"] });
            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE TASK
**/
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await taskApiRequest.deleteTask(id);
        },
        onSuccess: () => {
            showSuccess('Xóa nhiệm vụ thành công')

            queryClient.invalidateQueries({ queryKey: ["taskList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST TASK
**/
export const useCreateTask = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await taskApiRequest.createTask(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo nhiệm vụ thành công')

            queryClient.invalidateQueries({ queryKey: ["taskList"] });

            navigator('/task-management')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT TASK
**/
export const useUpdateTask = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await taskApiRequest.updateTask(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin nhiệm vụ thành công')

            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });
            queryClient.invalidateQueries({ queryKey: ["taskList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST FILE TASK
**/
export const useAddFileTask = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await taskApiRequest.addFileTask(formData);
        },
        onSuccess: () => {
            showSuccess('Thêm tập tin thành công')

            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE File TASK
**/
export const useDeleteFileTask = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await taskApiRequest.deleteFileTask(id);
        },
        onSuccess: () => {
            showSuccess('Xóa tập tin thành công')

            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET TIEN DO THUC HIEN NHIEM VU
**/
export const useGetTienDoThucHienNhiemVu = (param: TienDoThucHienNhiemVuParams) => {

    return useQuery({
        queryKey: ['tienDoThucHienNhiemVu', param],
        queryFn: async () => {
            try {

                const res = await taskApiRequest.getDanhSachTienDoNhiemVu(param);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET TIEN DO THUC HIEN NHIEM VU CUA TOI
**/
export const useGetTienDoThucHienNhiemVuCuaToi = (param: TienDoThucHienNhiemVuParams) => {

    return useQuery({
        queryKey: ['tienDoThucHienNhiemVuCuaToi', param],
        queryFn: async () => {
            try {

                const res = await taskApiRequest.getDanhSachTienDoNhiemVuCuaToi(param);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* POST TIEN DO NHIEM VU
**/
export const useCreateTienDoNhiemVu = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            console.log(formData)
            return await taskApiRequest.createTienDoNhiemVu(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật tiến độ nhiệm vụ thành công')

            queryClient.invalidateQueries({ queryKey: ["tienDoThucHienNhiemVuCuaToi"] });
            queryClient.invalidateQueries({ queryKey: ["tienDoThucHienNhiemVu"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE TASK
**/
export const useDeleteTienDoNhiemVu = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await taskApiRequest.deleteTienDoNhiemVu(id);
        },
        onSuccess: () => {
            showSuccess('Xóa tiến độ nhiệm vụ thành công')

            queryClient.invalidateQueries({ queryKey: ["tienDoThucHienNhiemVuCuaToi"] });
            queryClient.invalidateQueries({ queryKey: ["tienDoThucHienNhiemVu"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};