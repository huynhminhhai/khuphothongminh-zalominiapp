import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { useNavigate, useSnackbar } from "zmp-ui";

const surveyApiRequest = {
    getSurveyList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/khaosat?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}`);
    },
    getSurveyDetail: async (id: number) => {
        return await http.get<any>(`/khaosat/chitiet/${id}`);
    },
    createSurvey: async (formData: any) => {
        return await http.post<any>("/khaosat", formData);
    },
    getSurveyStatus: async () => {
        return await http.get<any>(`/khaosat/danhmuc`);
    },
    deleteSurvey: async (id: number) => {
        return await http.delete<any>(`/khaosat/${id}`)
    },
    updateSurvey: async (formData: any) => {
        return await http.put<any>("/khaosat", formData);
    },
    createResultSurvey: async (formData: any) => {
        return await http.post<any>("/ketquakhaosat", formData);
    },
}

/**
* GET TASK LIST
**/ 
export const useGetSurveyListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['surveyList', param.page, param.pageSize, param.ApId, param.keyword],
        queryFn: async () => {
            const res = await surveyApiRequest.getSurveyList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET TASK LIST (INFINITE)
**/ 
export const useGetSurveyList = (param: { page: number; pageSize: number, ApId: number; keyword: string }) => {

    return useInfiniteQuery({
        queryKey: ['surveyList', param.pageSize, param.ApId, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await surveyApiRequest.getSurveyList({ ...param, page: pageParam });

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
* POST SURVEY
**/ 
export const useCreateSurvey = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await surveyApiRequest.createSurvey(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Tạo khảo sát thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["surveyList"] });

            navigator('/survey-management')
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
* GET SURVEY STATUS
**/ 
export const useGetSurveyStatus = () => {
    return useQuery({
        queryKey: ["surveyStatus"],
        queryFn: async () => {
            try {
                const res = await surveyApiRequest.getSurveyStatus();
                return res.data
            } catch (error) {
                console.error("Lỗi khi lấy danh mục khảo sát:", error);
                throw error;
            }
        },
        staleTime: 0, 
        retry: 1,
    });
};

/**
* DELETE SURVEY
**/ 
export const useDeleteSurvey = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await surveyApiRequest.deleteSurvey(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa khảo sát thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["surveyList"] });
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
* GET SURVEY DETAIL
**/ 
export const useGetSurveyDetail = (id: number) => {

    return useQuery({
        queryKey: ['surveyDetail', id],
        queryFn: async () => {
            try {

                const res = await surveyApiRequest.getSurveyDetail(id);

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
* PUT SURVEY
**/
export const useUpdateSurvey = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await surveyApiRequest.updateSurvey(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Cập nhật khảo sát thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["surveyDetail"] });
            queryClient.invalidateQueries({ queryKey: ["surveyList"] });
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
* POST RESULT SURVEY
**/ 
export const useCreateResultSurvey = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await surveyApiRequest.createResultSurvey(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Thực hiện khảo sát thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["surveyResultList"] });

            // navigator('/survey')
        },
        onError: (error: string) => {
            openSnackbar({
                icon: true,
                text: `${error}`,
                type: "error",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        },
    });
};