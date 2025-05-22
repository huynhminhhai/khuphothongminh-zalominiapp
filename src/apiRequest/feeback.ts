import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

export type FeedbackQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    NguoiThucHienId?: number;
    keyword?: string;
};

const feebackApiRequest = {
    getFeedbackList: async (param: FeedbackQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            NguoiThucHienId: param.NguoiThucHienId,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/phananh${queryString}`);
    },
    getFeebackStatus: async () => {
        return await http.get<any>(`/phananh/danhmuc`);
    },
    createFeedback: async (formData: any) => {
        return await http.postFormData<any>(`/phananh`, formData);
    },
    getFeedbackDetail: async (id: number) => {
        return await http.get<any>(`/phananh/chitiet/${id}`);
    },
    deleteFeedback: async (id: number) => {
        return await http.delete<any>(`/phananh/${id}`);
    },
    updateFeedbackStatus: async (param: { phanAnhId: number; tinhTrangId: number; }) => {
        return await http.put<any>(`/phananh/tinhtrang`, {
            phanAnhId: param.phanAnhId,
            tinhTrangId: param.tinhTrangId
        });
    },
    updateFeedback: async (formData: any) => {
        return await http.putFormData<any>("/phananh", formData);
    },
    deleteFileFeedback: async (id: number) => {
        return await http.delete<any>(`/taptinphananh/${id}`);
    },
    getMyFeedbackList: async (param: FeedbackQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            NguoiThucHienId: param.NguoiThucHienId,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/phananh/cuatoi${queryString}`);
    },
    createFeedbackAnswer: async (formData: any) => {
        return await http.postFormData<any>(`/ketquaxulyphananh`, formData);
    },
    updateFeedbackAnswer: async (formData: any) => {
        return await http.putFormData<any>("/ketquaxulyphananh", formData);
    },
    deleteFileFeedbackAnswer: async (id: number) => {
        return await http.delete<any>(`/taptinketquaxulyphananh/${id}`);
    },
    getFeedbackAnswerDetail: async (id: number) => {
        return await http.get<any>(`/ketquaxulyphananh/chitiet/phananh/${id}`);
    },
}

/**
* GET FEEDBACK LIST
**/
export const useGetFeedbackListNormal = (param: FeedbackQueryParams) => {
    return useQuery({
        queryKey: ['feedbackList', param],
        queryFn: async () => {
            const res = await feebackApiRequest.getFeedbackList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET FEEDBACK LIST (INFINITE)
**/
export const useGetFeedbackList = (param: FeedbackQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['feedbackList', param.pageSize, param.ApId, param.MaXa, param.NguoiTao, param.NguoiThucHienId, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await feebackApiRequest.getFeedbackList({ ...param, page: pageParam });

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
* GET MY FEEDBACK LIST (INFINITE)
**/
export const useGetMyFeedbackList = (param: FeedbackQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['myFeedbackList', param.pageSize, param.ApId, param.MaXa, param.NguoiTao, param.NguoiThucHienId, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await feebackApiRequest.getMyFeedbackList({ ...param, page: pageParam });

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
* GET FEEDBACK STATUS
**/
export const useGetFeedbackStatus = () => {
    return useQuery({
        queryKey: ["feedbackStatus"],
        queryFn: async () => {
            try {
                const res = await feebackApiRequest.getFeebackStatus();
                return res.data
            } catch (error) {
                console.error("Lỗi khi lấy danh mục phản ánh:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 60 * 24,
        // staleTime: 0,
        retry: 1,
    });
};

/**
* POST FEEDBACK
**/
export const useCreateFeeback = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await feebackApiRequest.createFeedback(formData);
        },
        onSuccess: () => {

            showSuccess('Gửi phản ánh thành công');

            queryClient.invalidateQueries({ queryKey: ["feedbackList"] });
            queryClient.invalidateQueries({ queryKey: ["myFeedbackList"] });

            navigate('/feedback');
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET FEEDBACK DETAIL
**/
export const useGetFeebackDetail = (id: number) => {

    return useQuery({
        queryKey: ['feedbackDetail', id],
        queryFn: async () => {
            try {

                const res = await feebackApiRequest.getFeedbackDetail(id);

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
* DELETE FEEDBACK
**/
export const useDeleteFeedback = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await feebackApiRequest.deleteFeedback(id);
        },
        onSuccess: () => {
            showSuccess('Xóa phản ánh thành công');

            queryClient.invalidateQueries({ queryKey: ["feedbackList"] });
            queryClient.invalidateQueries({ queryKey: ["myFeedbackList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(`Lỗi: ${error}`)
        },
    });
};

/**
* PUT FEEDBACK STATUS
**/
export const useUpdateFeedbackStatus = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { phanAnhId: number; tinhTrangId: number; }) => {
            return await feebackApiRequest.updateFeedbackStatus(param);
        },
        onSuccess: () => {

            showSuccess('Cập nhật trạng thái phản ánh thành công');

            queryClient.invalidateQueries({ queryKey: ["feedbackDetail"] });
            queryClient.invalidateQueries({ queryKey: ["feedbackList"] });

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT FEEDBACK
**/
export const useUpdateFeedback = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await feebackApiRequest.updateFeedback(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật phản ánh thành công');

            queryClient.invalidateQueries({ queryKey: ["feedbackDetail"] });
            queryClient.invalidateQueries({ queryKey: ["feedbackList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE FILE FEEDBACK
**/
export const useDeleteFileFeedback = () => {
    const { showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await feebackApiRequest.deleteFileFeedback(id);
        },
        onSuccess: () => {

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST FEEDBACK ANSWER
**/
export const useCreateFeebackAnswer = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await feebackApiRequest.createFeedbackAnswer(formData);
        },
        onSuccess: () => {

            showSuccess('Gửi phản hồi thành công');

            queryClient.invalidateQueries({ queryKey: ["feedbackAnswerList"] });
            queryClient.invalidateQueries({ queryKey: ["feedbackDetail"] });
            queryClient.invalidateQueries({ queryKey: ["feedbackAnswerDetail"] });

            // navigate('/feedback');
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT FEEDBACK ANSWER
**/
export const useUpdateFeedbackAnswer = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await feebackApiRequest.updateFeedbackAnswer(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật phản hồi thành công');

            queryClient.invalidateQueries({ queryKey: ["feedbackDetail"] });
            queryClient.invalidateQueries({ queryKey: ["feedbackAnswerDetail"] });
            queryClient.invalidateQueries({ queryKey: ["feedbackAnswerList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE FILE FEEDBACK ANSWER
**/
export const useDeleteFileFeedbackAnswer = () => {
    const { showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await feebackApiRequest.deleteFileFeedbackAnswer(id);
        },
        onSuccess: () => {

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET FEEDBACK ANSER DETAIL
**/
export const useGetFeebackAnswerDetail = (id: number) => {

    return useQuery({
        queryKey: ['feedbackAnswerDetail', id],
        queryFn: async () => {
            try {

                const res = await feebackApiRequest.getFeedbackAnswerDetail(id);

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