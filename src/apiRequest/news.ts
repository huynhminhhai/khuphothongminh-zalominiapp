import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
import { buildQueryString } from 'utils/handleApi';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { useNavigate } from 'zmp-ui';

type NewsQueryParams = {
    page: number;
    pageSize: number;
    ApId?: number;
    MaXa?: string;
    NguoiTao?: number;
    keyword?: string;
    NgayXuatBanTuNgay?: string;
    NgayXuatBanDenNgay?: string;
    TacGia?: string;
    TieuDe?: string;
};

const newsApiRequest = {
    getNewsList: async (param: any) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            TextSearch: param.keyword,
            NgayXuatBanTuNgay: param.NgayXuatBanTuNgay,
            NgayXuatBanDenNgay: param.NgayXuatBanDenNgay,
            TacGia: param.TacGia,
            TieuDe: param.TieuDe,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao
        });

        return await http.get<any>(`/tintuc?${queryString}`);
    },
    getNewsPublicList: async (param: any) => {

        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            TextSearch: param.keyword,
            NgayXuatBanTuNgay: param.NgayXuatBanTuNgay,
            NgayXuatBanDenNgay: param.NgayXuatBanDenNgay,
            TacGia: param.TacGia,
            TieuDe: param.TieuDe,
            MaXa: param.MaXa,
            NguoiTao: param.NguoiTao
        });

        return await http.get<any>(`/tintuc/danhsachxuatban${queryString}`);
    },
    getNewsDetail: async (id: number) => {
        return await http.get<any>(`/tintuc/chitiet/${id}`);
    },
    getNewsStatus: async () => {
        return await http.get<any>(`/tintuc/danhmuc`);
    },
    updateNewsStatus: async (param: { tinTucId: number; tinhTrangId: number; }) => {
        return await http.put<any>(`/tintuc/tinhtrang`, {
            tinTucId: param.tinTucId,
            tinhTrangId: param.tinhTrangId
        });
    },
    createNews: async (formData: any) => {
        return await http.postFormData<any>("/tintuc", formData);
    },
    updateNews: async (formData: any) => {
        return await http.putFormData<any>("/tintuc", formData);
    },
    deleteNews: async (id: number) => {
        return await http.delete<any>(`/tintuc/${id}`)
    }
};

/**
* GET NEWS LIST
**/
export const useGetNewsListNormal = (param: NewsQueryParams) => {
    return useQuery({
        queryKey: ['newsList', param],
        queryFn: async () => {
            const res = await newsApiRequest.getNewsList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET NEWS PUBLIC LIST
**/
export const useGetNewsPublicListNormal = (param: NewsQueryParams) => {
    return useQuery({
        queryKey: ['newsList', param],
        queryFn: async () => {
            const res = await newsApiRequest.getNewsPublicList(param);
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
export const useGetNewsList = (param: NewsQueryParams) => {
    return useInfiniteQuery({
        queryKey: ['newsList', param.pageSize, param.ApId, param.keyword, param.NgayXuatBanTuNgay, param.NgayXuatBanDenNgay, param.TacGia, param.TieuDe, param.MaXa, param.NguoiTao],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await newsApiRequest.getNewsPublicList({ ...param, page: pageParam });

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
* GET NEWS STATUS
**/
export const useGetNewsStatus = () => {
    return useQuery({
        queryKey: ["newsStatus"],
        queryFn: async () => {
            try {
                const res = await newsApiRequest.getNewsStatus();
                return res.data.tinhTrangs
            } catch (error) {
                console.error("Lỗi khi lấy danh mục tin tức:", error);
                throw error;
            }
        },
        staleTime: 0, // Dữ liệu sẽ không fetch lại trong 10 phút
        retry: 1, // Thử lại 1 lần nếu lỗi
    });
};

/**
* PUT NEWS STATUS
**/
export const useUpdateNewsStatus = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (param: { tinTucId: number; tinhTrangId: number; }) => {
            return await newsApiRequest.updateNewsStatus(param);
        },
        onSuccess: () => {
            showSuccess('Cập nhật trạng thái thành công');

            queryClient.invalidateQueries({ queryKey: ["newsList"] });
            queryClient.invalidateQueries({ queryKey: ["newsDetail"] });

        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET NEWS DETAIL
**/
export const useGetNewsDetail = (id: number) => {

    return useQuery({
        queryKey: ['newsDetail', id],
        queryFn: async () => {
            try {

                const res = await newsApiRequest.getNewsDetail(id);

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
* POST NEWS
**/
export const useCreateNews = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await newsApiRequest.createNews(formData);
        },
        onSuccess: () => {
            showSuccess('Tạo tin tức thành công');

            queryClient.invalidateQueries({ queryKey: ["newsList"] });

            navigator('/news-management')
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT NEWS
**/
export const useUpdateNews = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await newsApiRequest.updateNews(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật tin tức thành công');

            queryClient.invalidateQueries({ queryKey: ["newsDetail"] });
            queryClient.invalidateQueries({ queryKey: ["newsList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE NEWS
**/
export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await newsApiRequest.deleteNews(id);
        },
        onSuccess: () => {
            showSuccess('Xóa tin tức thành công');

            queryClient.invalidateQueries({ queryKey: ["newsList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};