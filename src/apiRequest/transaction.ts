import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionsType } from "constants/utinities";
import http from "services/http";
import { useNavigate, useSnackbar } from "zmp-ui";

const transactionApiRequest = {
    getTransactionList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/thuchi?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}`);
    },
    getTransactionType: async () => {
        return await http.get<any>(`/thuchi/danhmuc`);
    },
    getTransactionDetail: async (id: number) => {
        return await http.get<any>(`/thuchi/chitiet/${id}`);
    },
    deleteTransaction: async (id: number) => {
        return await http.delete<any>(`/thuchi/${id}`)
    },
    createTransaction: async (formData: any) => {
        return await http.post<any>("/thuchi", formData);
    },
    updateTransaction: async (formData: any) => {
        return await http.put<any>("/thuchi", formData);
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
        staleTime: 0,
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
        staleTime: 0,
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
        staleTime: 0,
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
        staleTime: 0,
        retry: 1,
    });
};

/**
* DELETE TRANSACTION
**/
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await transactionApiRequest.deleteTransaction(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa thu/chi thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["transactionList"] });
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
* POST TRANSACTION
**/
export const useCreateTransaction = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await transactionApiRequest.createTransaction(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Tạo thu/chi thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["transactionList"] });

            navigator('/transactions-management')
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
* PUT TRANSACTION
**/
export const useUpdateTransaction = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await transactionApiRequest.updateTransaction(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Cập nhật thu/chi thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["transactionDetail"] });
            queryClient.invalidateQueries({ queryKey: ["transactionList"] });
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