import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
import { useNavigate, useSnackbar } from 'zmp-ui';

const newsManagementApiRequest = {
    getList: async (params: { page: number; pageSize: number; keyword: string; }) => {
        console.log(params)
        return await http.get<any[]>(`/posts?q=${params.keyword}&_page=${params.page}&_limit=${params.pageSize}`);
    },
    createNews: async (data: any) => {
        return await http.post<any>(`/posts`, data);
    },
    updateNews: async (id: number, data: any) => {
        return await http.put<any>(`/posts/${id}`, data);
    },
    deleteNews: async (id: number) => {
        return await http.delete<any>(`/posts/${id}`);
    },
};

export default newsManagementApiRequest;

export const useGetNewsListManagement = (params: { page: number; pageSize: number; keyword: string}) => {
    return useQuery({
        queryKey: ['newsListManagement', params.page, params.pageSize, params.keyword],
        queryFn: async () => {
            try {
                return await newsManagementApiRequest.getList(params);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};

export const useCreateNews = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: any) => {
            return await newsManagementApiRequest.createNews(data);
        },
        onSuccess: () => {

            openSnackbar({
                icon: true,
                text: "Thêm tin tức thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            // Cập nhật danh sách tin tức sau khi tạo thành công
            queryClient.invalidateQueries({ queryKey: ['newsListManagement'] });

            navigate("/news-management");
        },
        onError: (error: string) => {
            console.error('Error creating news:', error);
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

export const useUpdateNews = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: any }) => {
            return await newsManagementApiRequest.updateNews(id, data);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Cập nhật tin tức thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            queryClient.invalidateQueries({ queryKey: ["newsListManagement"] });
        },
        onError: (error: any) => {
            console.error("Lỗi cập nhật tin tức:", error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra khi cập nhật tin tức",
                type: "error",
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        },
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            await newsManagementApiRequest.deleteNews(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa tin tức thành công!",
                type: "success",
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["newsListManagement"] });
        },
        onError: (error) => {
            console.error("Lỗi xóa tin tức:", error);
            openSnackbar({
                icon: true,
                text: "Xóa thất bại, vui lòng thử lại!",
                type: "error",
                duration: 3000,
            });
        },
    });
};