import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Feedback } from "constants/utinities";
import http from "services/http";
import { useNavigate, useSnackbar } from "zmp-ui";

const feebackApiRequest = {
    getFeedbackList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/phananh?current=${param.page}&size=${param.pageSize}&${param.ApId}&TextSearch=${param.keyword}`);
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
}

/**
* GET FEEDBACK LIST
**/ 
export const useGetFeedbackListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['feedbackList', param.page, param.pageSize, param.ApId, param.keyword],
        queryFn: async () => {
            const res = await feebackApiRequest.getFeedbackList(param);
            return res
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

/**
* GET FEEDBACK LIST (INFINITE)
**/ 
export const useGetFeedbackList = (param: { page: number; pageSize: number, ApId: number; keyword: string }) => {

    return useInfiniteQuery({
        queryKey: ['feedbackList', param.pageSize, param.ApId, param.keyword],
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
        staleTime: 1000 * 60 * 5,
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
                return res.data.tinhTrangs
            } catch (error) {
                console.error("Lỗi khi lấy danh mục phản ánh:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
};

/**
* POST FEEDBACK
**/ 
export const useCreateFeeback = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await feebackApiRequest.createFeedback(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Gửi phản ánh thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["feedbackList"] });

            navigate('/feedback');
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
* GET FEEDBACK DETAIL
**/ 
export const useGetFeebackDetail = (id: number) => {

    return useQuery({
        queryKey: ['feedbackDetail', id],
        queryFn: async () => {
            try {

                const res = await feebackApiRequest.getFeedbackDetail(id);

                return res.data as Feedback
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};