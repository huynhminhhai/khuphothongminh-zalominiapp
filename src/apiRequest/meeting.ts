import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import http from "services/http";
import { useSnackbar } from "zmp-ui";

export const meetingApiRequest = {
    getMeeitngList: async (param: { page: number; pageSize: number; ApId: number; keyword: string; }) => {
        return await http.get<any>(`/cuochop?current=${param.page}&size=${param.pageSize}&ApId=${param.ApId}&TextSearch=${param.keyword}`);
    },
    getMeeitngTodayList: async () => {
        return await http.get<any>(`/cuochop/trongngay`);
    },
    getMeetingDetail: async (id: number) => {
        return await http.get<any>(`/cuochop/chitiet/${id}`);
    },
    getMeetingStatus: async () => {
        return await http.get<any>(`/cuochop/danhmuc`);
    },
    createMeeting: async (formData: any) => {
        return await http.post<any>("/cuochop", formData);
    },
    deleteMeeting: async (id: number) => {
        return await http.delete<any>(`/cuochop/${id}`)
    },
    updateMeeting: async (formData: any) => {
        return await http.put<any>("/cuochop", formData);
    },
    createMeetingMember: async (formData: any) => {
        return await http.post<any>("/thanhviencuochop", formData);
    },
    deleteMeetingMember: async (id: number) => {
        return await http.delete<any>(`/thanhviencuochop/${id}`)
    },
    updateMeetingMember: async (formData: any) => {
        return await http.put<any>("/thanhviencuochop", formData);
    }
}

/**
* GET MEETING LIST
**/ 
export const useGetMeetingListNormal = (param: { page: number; pageSize: number; ApId: number; keyword: string }) => {
    return useQuery({
        queryKey: ['meetingList', param.page, param.pageSize, param.ApId, param.keyword],

        queryFn: async () => {
            const res = await meetingApiRequest.getMeeitngList(param);
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET NEWS LIST (INFINITE)
**/ 
export const useGetMeetingList = (param: { page: number; pageSize: number, ApId: number; keyword: string }) => {

    return useInfiniteQuery({
        queryKey: ['meetingList', param.pageSize, param.ApId, param.keyword],
        queryFn: async ({ pageParam = 1 }) => {
            try {

                const res = await meetingApiRequest.getMeeitngList({ ...param, page: pageParam });

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
* GET MEETING TODAY LIST
**/ 
export const useGetMeetingTodayList = () => {
    return useQuery({
        queryKey: ['meetingList'],

        queryFn: async () => {
            const res = await meetingApiRequest.getMeeitngTodayList();
            return res
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET MEETING DETAIL
**/ 
export const useGetMeetingDetail = (id: number) => {

    return useQuery({
        queryKey: ['meetingDetail', id],
        queryFn: async () => {
            try {

                const res = await meetingApiRequest.getMeetingDetail(id);

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
* GET MEETING STATUS
**/ 
export const useGetMeetingStatus = () => {
    return useQuery({
        queryKey: ["meetingStatus"],
        queryFn: async () => {
            try {
                const res = await meetingApiRequest.getMeetingStatus();
                return res.data
            } catch (error) {
                console.error("Lỗi khi lấy danh mục cuộc họp:", error);
                throw error;
            }
        },
        staleTime: 0, // Dữ liệu sẽ không fetch lại trong 10 phút
        retry: 1, // Thử lại 1 lần nếu lỗi
    });
};

/**
* POST MEETING
**/ 
export const useCreateMeeting = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await meetingApiRequest.createMeeting(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Tạo cuộc họp thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["meetingList"] });

            navigator('/meeting-management')
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
* DELETE MEETING
**/ 
export const useDeleteMeeting = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await meetingApiRequest.deleteMeeting(id);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Xóa cuộc họp thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["meetingList"] });
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
* PUT MEETING
**/
export const useUpdateMeeting = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await meetingApiRequest.updateMeeting(formData);
        },
        onSuccess: () => {
            openSnackbar({
                icon: true,
                text: "Cập nhật cuộc họp thành công",
                type: "success",
                action: { text: "Đóng", close: true },
                duration: 3000,
            });

            queryClient.invalidateQueries({ queryKey: ["meetingDetail"] });
            queryClient.invalidateQueries({ queryKey: ["meetingList"] });
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
* POST MEETING MEMBER
**/ 
export const useCreateMeetingMember = () => {
    const { openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate()

    return useMutation({
        mutationFn: async (formData: any) => {
            return await meetingApiRequest.createMeetingMember(formData);
        },
        onSuccess: () => {
            // openSnackbar({
            //     icon: true,
            //     text: "Tạo  cuộc họp thành công",
            //     type: "success",
            //     action: { text: "Đóng", close: true },
            //     duration: 3000,
            // });

            queryClient.invalidateQueries({ queryKey: ["meetingList"] });
            queryClient.invalidateQueries({ queryKey: ["meetingDetail"] });

            navigator('/meeting-management')
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
* DELETE MEETING
**/ 
export const useDeleteMeetingMember = () => {
    const queryClient = useQueryClient();
    const { openSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await meetingApiRequest.deleteMeetingMember(id);
        },
        onSuccess: () => {
            // openSnackbar({
            //     icon: true,
            //     text: "Xóa cuộc họp thành công",
            //     type: "success",
            //     action: { text: "Đóng", close: true },
            //     duration: 3000,
            // });

            queryClient.invalidateQueries({ queryKey: ["meetingList"] });
            queryClient.invalidateQueries({ queryKey: ["meetingDetail"] });
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