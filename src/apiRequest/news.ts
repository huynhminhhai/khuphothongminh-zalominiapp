import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';

const newsApiRequest = {
    getNewsList: async (param: { page: number; pageSize: number }) => {
        return await http.get<any[]>(`/posts?_page=${param.page}&_limit=${param.pageSize}`);
    },
    getNewsDetail: async (id: number) => {
        return await http.get<any>(`/posts/${id}`);
    },
};

export const useGetNewsList = (param: { page: number; pageSize: number }) => {

    return useInfiniteQuery({
        queryKey: ['newsList', param.pageSize],
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
        staleTime: 1000 * 60 * 5,
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
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};