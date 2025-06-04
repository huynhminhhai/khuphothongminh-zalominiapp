import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate, useSnackbar } from "zmp-ui";

export type NotificationQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    keyword?: string;
};

const notificationApiRequest = {
    getNotificationSentList: async (param: NotificationQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/thongbao/dagui${queryString}`);
    },
    getNotificationList: async (param: NotificationQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/thongbao${queryString}`);
    },
    deleteNotification: async (id: number) => {
        return await http.delete<any>(`/thongbao/${id}`)
    },
    updateNotificationStatus: async (param: {thongBaoId: number, tinhTrangId: number}) => {
        return await http.put<any>(`/thongbao/capnhattinhtrang`, {
            thongBaoId: param.thongBaoId,
            tinhTrangId: param.tinhTrangId
        })
    },
    createNotification: async (formData: any) => {
        return await http.post<any>("/thongbao", formData);
    },
    updateNotification: async (formData: any) => {
        return await http.put<any>("/thongbao", formData);
    },
    getNotificationDetail: async (id: number) => {
        return await http.get<any>(`/thongbao/chitiet/id/${id}`);
    }
}

/**
* GET NOTIFICATION LIST (INFINITE)
**/
export const useGetNotificationList = (param: NotificationQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['notificationList', param.pageSize, param.ApId, param.keyword, param.MaXa, param.NguoiTao],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await notificationApiRequest.getNotificationSentList({ ...param, page: pageParam });

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
* GET NOTIFICATION LIST
**/
export const useGetNotificationListNormal = (param: NotificationQueryParams) => {
    return useQuery({
        queryKey: ['notificationList', param],
        queryFn: async () => {
            const res = await notificationApiRequest.getNotificationList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* DELETE NOTIFICATION
**/
export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await notificationApiRequest.deleteNotification(id);
        },
        onSuccess: () => {
            showSuccess('Xóa thông báo thành công')

            queryClient.invalidateQueries({ queryKey: ["notificationList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT NOTIFICATION STATUS
**/
export const useUpdateNotificationStatus = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { thongBaoId: number; tinhTrangId: number; }) => {
            return await notificationApiRequest.updateNotificationStatus(param);
        },
        onSuccess: () => {
            showSuccess('Cập nhật trạng thái thông báo thành công');

            queryClient.invalidateQueries({ queryKey: ["notificationList"] });
            queryClient.invalidateQueries({ queryKey: ["notificationDetail"] });

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST NOTIFICATION
**/
export const useCreateNotification = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await notificationApiRequest.createNotification(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo thông báo thành công')

            queryClient.invalidateQueries({ queryKey: ["notificationList"] });

            navigator('/notification-management')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT NOTIFICATION
**/
export const useUpdateNotification = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await notificationApiRequest.updateNotification(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin thông báo thành công')

            queryClient.invalidateQueries({ queryKey: ["notificationDetail"] });
            queryClient.invalidateQueries({ queryKey: ["notificationList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET NOTIFICATION DETAIL
**/
export const useGetNotificationDetail = (id: number) => {

    return useQuery({
        queryKey: ['notificationDetail', id],
        queryFn: async () => {
            try {

                const res = await notificationApiRequest.getNotificationDetail(id);

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