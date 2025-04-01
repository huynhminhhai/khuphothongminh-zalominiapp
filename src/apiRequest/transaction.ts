import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TransactionsType } from "constants/utinities";
import http from "services/http";

const transactionApiRequest = {
    getTransactionList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/thuchi?current=${param.page}&size=${param.pageSize}&${param.ApId}&TextSearch=${param.keyword}`);
    },
    getTransactionType: async () => {
        return await http.get<any>(`/thuchi/danhmuc`);
    },
    getTransactionDetail: async (id: number) => {
        return await http.get<any>(`/thuchi/chitiet/${id}`);
    },
}

/**
* GET TRANSACTION LIST
**/ 
export const useGetTransactionListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['transactionList', param.page, param.pageSize, param.ApId, param.keyword],
        queryFn: async () => {
            const res = await transactionApiRequest.getTransactionList(param);
            return res
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

/**
* GET TRANSACTION LIST (INFINITE)
**/ 
export const useGetTransactionList = (param: { page: number; pageSize: number, ApId: number; keyword: string }) => {

    return useInfiniteQuery({
        queryKey: ['transactionList', param.pageSize, param.ApId, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await transactionApiRequest.getTransactionList({ ...param, page: pageParam });

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
* GET TRANSACTION TYPE
**/ 
export const useGetTransactionType = () => {
    return useQuery({
        queryKey: ["transactionType"],
        queryFn: async () => {
            try {
                const res = await transactionApiRequest.getTransactionType();
                return res.data.loaiGiaoDichTaiChinhs
            } catch (error) {
                console.error("Lỗi khi lấy danh mục thu/chi:", error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 10, 
        retry: 1,
    });
};

/**
* GET TRANSACTION DETAIL
**/ 
export const useGetTransactionDetail = (id: number) => {

    return useQuery({
        queryKey: ['transactionDetail', id],
        queryFn: async () => {
            try {

                const res = await transactionApiRequest.getTransactionDetail(id);

                return res.data as TransactionsType
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