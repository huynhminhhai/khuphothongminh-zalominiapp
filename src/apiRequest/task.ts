import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "components/task/type";
import http from "services/http";
import { useNavigate, useSnackbar } from "zmp-ui";

const taskApiRequest = {
    getTaskList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/nhiemvu?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}`);
    },
    getMyTaskList: async (param: { page: number; pageSize: number; nguoiThucHienId: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/nhiemvu/cuatoi?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&NguoiThucHienId=${param.nguoiThucHienId}&TextSearch=${param.keyword}`);
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
export const useGetTaskListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['taskList', param.page, param.pageSize, param.ApId, param.keyword],
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
export const useGetMyTaskListNormal = (param: { page: number; pageSize: number; nguoiThucHienId: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['myTaskList', param.page, param.pageSize, param.ApId, param.keyword, param.nguoiThucHienId],
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
export const useGetMyTaskList = (param: { page: number; pageSize: number; nguoiThucHienId: number; ApId: number; keyword: string }) => {

    return useInfiniteQuery({
        queryKey: ['myTaskList', param.pageSize, param.nguoiThucHienId, param.ApId, param.keyword],
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
        staleTime: 0, // Dữ liệu sẽ không fetch lại trong 10 phút
        retry: 1, // Thử lại 1 lần nếu lỗi
    });
};

/**
* PUT TASK STATUS
**/
export const useUpdateTaskStatus = () => {

    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { nhiemVuId: number; tinhTrangId: number; }) => {
            return await taskApiRequest.updateTaskStatus(param);
        },
        onSuccess: () => {

            openSnackbar({
                icon: true,
                text: "Cập nhật trạng thái thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["taskList"] });
            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });

        },
        onError: (error: string) => {
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

/**
* DELETE TASK
**/ 
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await taskApiRequest.deleteTask(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa nhiệm vụ thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["taskList"] });
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
* POST TASK
**/ 
export const useCreateTask = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await taskApiRequest.createTask(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Tạo nhiệm vụ thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["taskList"] });

            navigator('/task-management')
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
* PUT TASK
**/
export const useUpdateTask = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await taskApiRequest.updateTask(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Cập nhật nhiệm vụ thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });
            queryClient.invalidateQueries({ queryKey: ["taskList"] });
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
* POST FILE TASK
**/ 
export const useAddFileTask = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await taskApiRequest.addFileTask(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Thêm tập tin nhiệm vụ thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });
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
* DELETE File TASK
**/ 
export const useDeleteFileTask = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await taskApiRequest.deleteFileTask(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa tập tin thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["taskDetail"] });
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