import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionsType } from "constants/utinities";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate, useSnackbar } from "zmp-ui";

export type DocumentQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    keyword?: string;
    SoHieu?: string;
    TrichYeu?: string;
    TenCoQuanBanHanh?: string;
    NgayBanHanhTuNgay?: string;
    NgayBanHanhDenNgay?: string;
};

const documentApiRequest = {
    getDocumentList: async (param: DocumentQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
            SoHieu: param.SoHieu,
            TrichYeu: param.TrichYeu,
            TenCoQuanBanHanh: param.TenCoQuanBanHanh,
            NgayBanHanhTuNgay: param.NgayBanHanhTuNgay,
            NgayBanHanhDenNgay: param.NgayBanHanhDenNgay
        });

        return await http.get<any>(`/vanban${queryString}`);
    },
    getDocumentPublicList: async (param: DocumentQueryParams) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao,
            TextSearch: param.keyword,
            SoHieu: param.SoHieu,
            TrichYeu: param.TrichYeu,
            TenCoQuanBanHanh: param.TenCoQuanBanHanh,
            NgayBanHanhTuNgay: param.NgayBanHanhTuNgay,
            NgayBanHanhDenNgay: param.NgayBanHanhDenNgay
        });

        return await http.get<any>(`/vanban/congkhai${queryString}`);
    },
    getTransactionType: async () => {
        return await http.get<any>(`/thuchi/danhmuc`);
    },
    getDocumentDetail: async (id: number) => {
        return await http.get<any>(`/vanban/chitiet/${id}`);
    },
    getDocumentPublicDetail: async (id: number) => {
        return await http.get<any>(`/vanban/chitietvanbancongkhai/${id}`);
    },
    deleteDocument: async (id: number) => {
        return await http.delete<any>(`/vanban/${id}`)
    },
    createDocument: async (formData: any) => {
        return await http.postFormData<any>("/vanban", formData);
    },
    updateDocument: async (formData: any) => {
        return await http.putFormData<any>("/vanban", formData);
    },
    deleteFileDocument: async (id: number) => {
        return await http.delete<any>(`/taptinvanban/${id}`)
    },
    updateDocumentStatus: async (param: {vanBanId: number, tinhTrangId: number}) => {
        return await http.put<any>(`/vanban/tinhtrang`, {
            vanBanId: param.vanBanId,
            tinhTrangId: param.tinhTrangId
        })
    },
    getSumaryDocument: async (id: number) => {
        return await http.get<any>(`/vanban/tomtat/${id}`);
    },
}

/**
* GET DOCUMENT LIST
**/
export const useGetDocumentListNormal = (param: DocumentQueryParams) => {
    return useQuery({
        queryKey: ['documentList', param],
        queryFn: async () => {
            const res = await documentApiRequest.getDocumentList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET DOCUMENT LIST (INFINITE)
**/
export const useGetDocumentList = (param: DocumentQueryParams) => {

    return useInfiniteQuery({
        queryKey: ['documentList', param.pageSize, param.ApId, param.keyword, param.MaXa, param.NguoiTao, param.SoHieu, param.TrichYeu, param.TenCoQuanBanHanh, param.NgayBanHanhTuNgay, param.NgayBanHanhDenNgay],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await documentApiRequest.getDocumentPublicList({ ...param, page: pageParam });

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
* GET DOCUMENT TYPE
**/
export const useGetTransactionType = () => {
    return useQuery({
        queryKey: ["transactionType"],
        queryFn: async () => {
            try {
                const res = await documentApiRequest.getTransactionType();
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
* GET DOCUMENT DETAIL
**/
export const useGetDocumentDetail = (id: number) => {

    return useQuery({
        queryKey: ['documentDetail', id],
        queryFn: async () => {
            try {

                const res = await documentApiRequest.getDocumentDetail(id);

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
* GET DOCUMENT PUBLIC DETAIL
**/
export const useGetDocumentPublicDetail = (id: number) => {

    return useQuery({
        queryKey: ['documentDetail', id],
        queryFn: async () => {
            try {

                const res = await documentApiRequest.getDocumentPublicDetail(id);

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
* DELETE DOCUMENT
**/
export const useDeleteDocument = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await documentApiRequest.deleteDocument(id);
        },
        onSuccess: () => {
            showSuccess('Xóa văn bản thành công')

            queryClient.invalidateQueries({ queryKey: ["documentList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* POST DOCUMENT
**/
export const useCreateDocument = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await documentApiRequest.createDocument(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo văn bản thành công')

            queryClient.invalidateQueries({ queryKey: ["documentList"] });

            navigator('/document-management')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT DOCUMENT
**/
export const useUpdateDocument = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await documentApiRequest.updateDocument(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin văn bản thành công')

            queryClient.invalidateQueries({ queryKey: ["documentDetail"] });
            queryClient.invalidateQueries({ queryKey: ["documentList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

export const useDeleteFileDocument = () => {
    const { showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await documentApiRequest.deleteFileDocument(id);
        },
        onSuccess: () => {

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};


export const useUpdateDocumentStatus = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { vanBanId: number; tinhTrangId: number; }) => {
            return await documentApiRequest.updateDocumentStatus(param);
        },
        onSuccess: () => {
            showSuccess('Cập nhật trạng thái văn bản thành công');

            queryClient.invalidateQueries({ queryKey: ["documentList"] });
            queryClient.invalidateQueries({ queryKey: ["documentDetail"] });

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};


/**
* GET SUMARY DOCUMENT
**/
export const useGetSummaryDocument = (id: number) => {

    return useQuery({
        queryKey: ['documentSumary', id],
        queryFn: async () => {
            try {

                const res = await documentApiRequest.getSumaryDocument(id);

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