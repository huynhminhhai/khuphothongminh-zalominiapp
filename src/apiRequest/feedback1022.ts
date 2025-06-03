import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
import { buildQueryString } from 'utils/handleApi';

type Feedback1022QueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    keyword?: string;
    NguoiThucHienId?: number;
    MaXa1022?: string;
};

export const feedback1022ApiRequest = {
    getFeedback1022List: async (param: Feedback1022QueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            TextSearch: param.keyword,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            NguoiThucHienId: param.NguoiTao,
            MaXa1022: param.MaXa1022
        });

        return await http.get<any>(`/phananh1022${queryString}`);
    },
    getFeedback1022Detail: async (id: string) => {
        return await http.get<any>(`/phananh1022/chitiet/${id}`);
    },
    getFeedback1022File: async (id: string) => {
        return await http.get<any>(`/phananh1022/taptin/${id}`);
    }
}

/**
* GET NEWS LIST
**/
export const useGetFeedback1022ListNormal = (param: Feedback1022QueryParams) => {
    return useQuery({
        queryKey: ['feedback1022List', param],
        queryFn: async () => {
            const res = await feedback1022ApiRequest.getFeedback1022List(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET NEWS LIST (INFINITE)
* QUERYKEY MUST BE NOT CONTAIN PARAM.PAGE AND DO NOT DESTRUCTURING
**/
export const useGetFeedback1022List = (param: Feedback1022QueryParams) => {
    return useInfiniteQuery({
        queryKey: ['feedback1022List', param.pageSize, param.ApId, param.keyword, param.MaXa, param.NguoiTao, param.NguoiThucHienId, param.MaXa1022],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await feedback1022ApiRequest.getFeedback1022List({ ...param, page: pageParam });

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
* GET FEEDBACK 1022 DETAIL
**/
export const useGetFeedback1022Detail = (id: string) => {

    return useQuery({
        queryKey: ['feedback1022Detail', id],
        queryFn: async () => {
            try {

                const res = await feedback1022ApiRequest.getFeedback1022Detail(id);

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
* GET FEEDBACK 1022 DETAIL
**/
export const useGetFeedback1022File = (id: string) => {

    return useQuery({
        queryKey: ['feedback1022File', id],
        queryFn: async () => {
            try {

                const res = await feedback1022ApiRequest.getFeedback1022File(id);

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