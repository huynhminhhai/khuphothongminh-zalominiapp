import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

export type SurveyQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    keyword?: string;
};

export type SurveyMemberQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    keyword?: string;
    khaoSatId: number;
};

const surveyApiRequest = {
    getSurveyList: async (param: SurveyQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/khaosat${queryString}`);
    },
    getSurveyPublicList: async (param: SurveyQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/khaosat/nguoidan${queryString}`);
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
    getSurveyMemberList: async (param: SurveyMemberQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            TextSearch: param.keyword,
            khaoSatId: param.khaoSatId,
        });

        return await http.get<any>(`/ketquakhaosat${queryString}`);
    },
    updateSurveyStatus: async (param: { khaoSatId: number; tinhTrangId: number; }) => {
        return await http.put<any>(`/khaosat/tinhtrang`, {
            khaoSatId: param.khaoSatId,
            tinhTrangId: param.tinhTrangId
        });
    },
}

/**
* GET TASK LIST
**/
export const useGetSurveyListNormal = (param: SurveyQueryParams) => {
    return useQuery({
        queryKey: ['surveyList', param],
        queryFn: async () => {
            const res = await surveyApiRequest.getSurveyList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET TASK LIST
**/
export const useGetSurveyMemberListNormal = (param: SurveyMemberQueryParams) => {
    return useQuery({
        queryKey: ['surveyMemberList', param],
        queryFn: async () => {
            const res = await surveyApiRequest.getSurveyMemberList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET TASK PUBLIC LIST
**/
export const useGetSurveyPublicListNormal = (param: SurveyQueryParams) => {
    return useQuery({
        queryKey: ['surveyList', param],
        queryFn: async () => {
            const res = await surveyApiRequest.getSurveyPublicList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};


/**
* GET TASK LIST (INFINITE)
**/
export const useGetSurveyList = (param: SurveyQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['surveyList', param.pageSize, param.ApId, param.MaXa, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await surveyApiRequest.getSurveyPublicList({ ...param, page: pageParam });

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
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await surveyApiRequest.createSurvey(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo khảo sát thành công');

            queryClient.invalidateQueries({ queryKey: ["surveyList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
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
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });
};

/**
* DELETE SURVEY
**/
export const useDeleteSurvey = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await surveyApiRequest.deleteSurvey(id);
        },
        onSuccess: () => {
            showSuccess('Xóa khảo sát thành công');

            queryClient.invalidateQueries({ queryKey: ["surveyList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
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
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await surveyApiRequest.updateSurvey(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin khảo sát thành công');

            queryClient.invalidateQueries({ queryKey: ["surveyDetail"] });
            queryClient.invalidateQueries({ queryKey: ["surveyList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST RESULT SURVEY
**/
export const useCreateResultSurvey = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await surveyApiRequest.createResultSurvey(formData);
        },
        onSuccess: () => {
            showSuccess('Thực hiện khảo sát thành công')

            queryClient.invalidateQueries({ queryKey: ["surveyResultList"] });

            // navigator('/survey')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT SURVEY STATUS
**/
export const useUpdateSurveyStatus = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { khaoSatId: number; tinhTrangId: number; }) => {
            return await surveyApiRequest.updateSurveyStatus(param);
        },
        onSuccess: () => {
            showSuccess('Cập nhật trạng thái thành công');

            queryClient.invalidateQueries({ queryKey: ["surveyList"] });
            queryClient.invalidateQueries({ queryKey: ["surveyDetail"] });

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};