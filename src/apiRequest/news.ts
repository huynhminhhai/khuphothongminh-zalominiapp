import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NewsType } from 'components/news/type';
import http from 'services/http';
import { useSnackbar } from 'zmp-ui';

const newsApiRequest = {
    getNewsList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/tintuc?current=${param.page}&size=${param.pageSize}&${param.ApId}&TextSearch=${param.keyword}`);
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
export const useGetNewsListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['newsList', param.page, param.pageSize, param.ApId, param.keyword],
        queryFn: async () => {
            const res = await newsApiRequest.getNewsList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET NEWS LIST (INFINITE)
**/ 
export const useGetNewsList = (param: { page: number; pageSize: number, ApId: number; keyword: string }) => {

    return useInfiniteQuery({
        queryKey: ['newsList', param.pageSize, param.ApId, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await newsApiRequest.getNewsList({ ...param, page: pageParam });

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

    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
            mutationFn: async (param: { tinTucId: number; tinhTrangId: number; }) => {
                return await newsApiRequest.updateNewsStatus(param);
            },
            onSuccess: () => {
    
                openSnackbar({
                    icon: true,
                    text: "Cập nhật trạng thái thành công",
                    type: 'success',
                    action: { text: "Đóng", close: true },
                    duration: 3000,
                });

                queryClient.invalidateQueries({ queryKey: ["newsList"] });
                queryClient.invalidateQueries({ queryKey: ["newsDetail"] });

            },
            onError: (error: string) => {
                openSnackbar({
                    icon: true,
                    text: error,
                    type: 'error',
                    action: { text: "Đóng", close: true },
                    duration: 3000,
                });
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

                return res.data as NewsType
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
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await newsApiRequest.createNews(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Tạo tin tức thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["newsList"] });
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
* PUT NEWS
**/ 
export const useUpdateNews = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await newsApiRequest.updateNews(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Cập nhật tin tức thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["newsDetail"] });
            queryClient.invalidateQueries({ queryKey: ["newsList"] });
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
* DELETE NEWS
**/ 
export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await newsApiRequest.deleteNews(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa tin tức thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["newsList"] });
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