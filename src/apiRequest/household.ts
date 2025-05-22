import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "services/http";
import { buildQueryString } from "utils/handleApi";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useNavigate } from "zmp-ui";

export type HouseholdQueryParams = {
    page: number;
    pageSize: number;
    keyword?: string;
    ApId?: number;
    MaXa?: string;
    DanCuId?: number;
    NguoiTao?: number;
    TinhTrangHoGiaDinhId?: string;
    HoTen?: string;
};

const householdApiRequest = {
    getHouseholdList: async (param: HouseholdQueryParams) => {
        const queryString = buildQueryString({
            current: param.page,
            size: param.pageSize,
            ApId: param.ApId,
            MaXa: param.MaXa,
            DanCuId: param.DanCuId,
            TextSearch: param.keyword,
            NguoiTao: param.NguoiTao,
            TinhTrangHoGiaDinhId: param.TinhTrangHoGiaDinhId,
            HoTen: param.HoTen
        });

        return await http.get<any>(`/thongtinhogiadinh${queryString}`);
    },
    getHouseholdDetail: async (danCuId: number, loai: number) => {
        return await http.get<any>(`/thongtinhogiadinh/chitiet/dancu/${danCuId}/loai/${loai}`);
    },
    createHousehold: async (data: any) => {
        return await http.post<any>(`/thongtinhogiadinh`, data);
    },
    deleteHousehold: async (id: number) => {
        return await http.delete<any>(`/thongtinhogiadinh/${id}`);
    },
    updateHousehold: async (formData: any) => {
        return await http.put<any>(`/thongtinhogiadinh`, formData);
    },
}

/**
* GET INSURANCE LIST
**/
export const useGetHouseholdListNormal = (param: HouseholdQueryParams) => {
    return useQuery({
        queryKey: ['householdList', param],
        queryFn: async () => {
            try {
                const res = await householdApiRequest.getHouseholdList(param);
                return res
            } catch (error) {
                console.error("Lỗi khi lấy danh sách lịch sử công nhận:", error);
                throw error;
            }
        },
        // enabled: !!param.DanCuId,
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET HOUSEHOLD DETAIL
**/
export const useGetHouseholdDetailInfo = (danCuId: number, loai: number) => {
    return useQuery({
        queryKey: ["householdDetail", danCuId, loai],
        queryFn: async () => {
            try {
                const res = await householdApiRequest.getHouseholdDetail(danCuId, loai);
                return res?.data ? res?.data : null;
            } catch (error) {
                console.error("Lỗi khi lấy thông tin hộ dân:", error);
                throw error;
            }
        },
        enabled: !!danCuId,
        staleTime: 0,
        retry: 1,
    });
};


/**
* POST HOUSEHOLD
**/
export const useCreateHouseholdInfo = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();
    const navigator = useNavigate();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await householdApiRequest.createHousehold(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin thành công');

            queryClient.invalidateQueries({ queryKey: ["householdList"] });

            navigator('/household-management');
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* DELETE HOUSEHOLD
**/
export const useDeleteHouseholdInfo = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();
    const navigator = useNavigate();

    return useMutation({
        mutationFn: async (id: number) => {
            return await householdApiRequest.deleteHousehold(id);
        },
        onSuccess: () => {
            showSuccess('Xóa thông tin thành công');

            queryClient.invalidateQueries({ queryKey: ["householdList"] });

            navigator('/household-management');
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT RESIDENT
**/
export const useUpdateHouseholdInfo = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await householdApiRequest.updateHousehold(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin thành công');

            queryClient.invalidateQueries({ queryKey: ["householdDetail"] });
            queryClient.invalidateQueries({ queryKey: ["householdList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};