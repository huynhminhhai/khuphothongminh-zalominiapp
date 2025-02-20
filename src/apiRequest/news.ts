import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';

const newsApiRequest = {
    getNewsList: async (param: { page: number; pageSize: number }) => {
        console.log('call api:', param)
        return await http.get<any[]>(`/posts?_page=${param.page}&_limit=${param.pageSize}`);
    },
    getNewsDetail: async (id: number) => {
        try {
            const response = await http.get<any>(`/posts/${id}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export const useGetNewsList = (param: { page: number; pageSize: number }) => {

    return useInfiniteQuery({
        queryKey: ['newsList', param.page, param.pageSize],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                return await newsApiRequest.getNewsList({ page: pageParam, pageSize: param.pageSize });
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === param.pageSize ? allPages.length + 1 : undefined;
        },
        staleTime: 1000 * 60 * 15,
        retry: 1,
    })
};

export const useGetNewsDetail = (id: number) => {

    return useQuery({
        queryKey: ['newsDetail', id],
        queryFn: async () => {
            try {
                return await newsApiRequest.getNewsDetail(id);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!id, // Only call the API if id is valid
        staleTime: 15 * 60 * 1000,
        retry: 1,
    });
};