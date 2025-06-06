import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionsType } from "constants/utinities";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate, useSnackbar } from "zmp-ui";

export type TransactionQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    keyword?: string;
    LoaiGiaoDichTaiChinhId?: number;
    NoiDung?: string;
};

export type TransactionDetailQueryParams = {
    page: number;
    pageSize: number;
    ThuChiId: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    keyword?: string;
};

const transactionApiRequest = {
    getTransactionList: async (param: TransactionQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
            LoaiGiaoDichTaiChinhId: param.LoaiGiaoDichTaiChinhId,
            NoiDung: param.NoiDung,
        });

        return await http.get<any>(`/thuchi${queryString}`);
    },
    getTransactionPublicList: async (param: TransactionQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
            LoaiGiaoDichTaiChinhId: param.LoaiGiaoDichTaiChinhId,
            NoiDung: param.NoiDung,
        });

        return await http.get<any>(`/thuchi/danhsachcongkhai${queryString}`);
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
    createDetailTransaction: async (formData: any) => {
        return await http.post<any>("/chitietthuchi", formData);
    },
    getTransactionDetailList: async (param: TransactionDetailQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ThuChiId: param.ThuChiId,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
        });

        return await http.get<any>(`/chitietthuchi${queryString}`);
    },
    deleteTransactionDetail: async (id: number) => {
        return await http.delete<any>(`/chitietthuchi/${id}`)
    },
    getTransactionDetailDetail: async (id: number) => {
        return await http.get<any>(`/chitietthuchi/chitiet/${id}`);
    },
    updateTransactionDetail: async (formData: any) => {
        return await http.put<any>("/chitietthuchi", formData);
    },
}

/**
* GET TRANSACTION LIST
**/
export const useGetTransactionListNormal = (param: TransactionQueryParams) => {
    return useQuery({
        queryKey: ['transactionList', param],
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
export const useGetTransactionList = (param: TransactionQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['transactionList', param.pageSize, param.ApId, param.keyword, param.LoaiGiaoDichTaiChinhId, param.NoiDung, param.MaXa, param.NguoiTao],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await transactionApiRequest.getTransactionPublicList({ ...param, page: pageParam });

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
        staleTime: 1000 * 60 * 60 * 24,
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
* DELETE TRANSACTION
**/
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await transactionApiRequest.deleteTransaction(id);
        },
        onSuccess: () => {
            showSuccess('Xóa thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST TRANSACTION
**/
export const useCreateTransaction = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await transactionApiRequest.createTransaction(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionList"] });

            navigator('/transactions-management')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT TRANSACTION
**/
export const useUpdateTransaction = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await transactionApiRequest.updateTransaction(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionDetail"] });
            queryClient.invalidateQueries({ queryKey: ["transactionList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST DETAIL TRANSACTION
**/
export const useCreateTransactionDetail = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await transactionApiRequest.createDetailTransaction(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo chi tiết thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionDetailList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET TRANSACTION LIST
**/
export const useGetTransactionDetailList = (param: TransactionDetailQueryParams) => {
    return useQuery({
        queryKey: ['transactionDetailList', param],
        queryFn: async () => {
            const res = await transactionApiRequest.getTransactionDetailList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* DELETE TRANSACTION DETAIL
**/
export const useDeleteTransactionDetail = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await transactionApiRequest.deleteTransactionDetail(id);
        },
        onSuccess: () => {
            showSuccess('Xóa chi tiết thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionDetailList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET TRANSACTION DETAIL DETAIL
**/
export const useGetTransactionDetailDetail = (id: number) => {

    return useQuery({
        queryKey: ['transactionDetailDetail', id],
        queryFn: async () => {
            try {

                const res = await transactionApiRequest.getTransactionDetailDetail(id);

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
* PUT TRANSACTION DETAIL
**/
export const useUpdateTransactionDetail = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await transactionApiRequest.updateTransactionDetail(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin chi tiết thu/chi thành công')

            queryClient.invalidateQueries({ queryKey: ["transactionDetailDetail"] });
            queryClient.invalidateQueries({ queryKey: ["transactionDetailList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};