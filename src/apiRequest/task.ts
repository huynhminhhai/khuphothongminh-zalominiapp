import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

const taskApiRequest = {
    getTaskList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; TieuDe?: string; }) => {
        return await http.get<any>(`/nhiemvu?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}&TieuDe=${param.TieuDe}`);
    },
    getMyTaskList: async (param: { page: number; pageSize: number; nguoiThucHienId: number; ApId: number; keyword: string; TieuDe?: string; }) => {
        return await http.get<any>(`/nhiemvu/cuatoi?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&NguoiThucHienId=${param.nguoiThucHienId}&TextSearch=${param.keyword}&TieuDe=${param.TieuDe}`);
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
    }
}

/**
* GET TASK LIST
**/
export const useGetTaskListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string; TieuDe?: string; }) => {
    return useQuery({
        queryKey: ['taskList', param.page, param.pageSize, param.ApId, param.keyword, param.TieuDe],
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
export const useGetMyTaskListNormal = (param: { page: number; pageSize: number; nguoiThucHienId: number; ApId: number; keyword: string, TieuDe?: string; }) => {
    return useQuery({
        queryKey: ['myTaskList', param.page, param.pageSize, param.ApId, param.keyword, param.nguoiThucHienId, param.TieuDe],
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
export const useGetMyTaskList = (param: { page: number; pageSize: number; nguoiThucHienId: number; ApId: number; keyword: string; TieuDe?: string; }) => {

    return useInfiniteQuery({
        queryKey: ['myTaskList', param.pageSize, param.nguoiThucHienId, param.ApId, param.keyword, param.TieuDe],
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