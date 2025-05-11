import http from "services/http";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "zmp-ui";
import { useCustomSnackbar } from "utils/useCustomSnackbar";

const insuranceApiRequest = {
    
    getInsuranceList: async (param: { page: number; pageSize: number; DanCuId: number | null; keyword: string; LoaiBaoHiemId: number; MaSo: string; }) => {
        return await http.get<any>(`/thongtinbaohiem?current=${param.page}&size=${param.pageSize}&DanCuId=${param.DanCuId}&TextSearch=${param.keyword}&LoaiBaoHiemId=${param.LoaiBaoHiemId}&MaSo=${param.MaSo}`);
    },
    createInsurance: async (param: { danCuId: number; loaiBaoHiemId: number; noiDangKy: string; tuNgay: string; denNgay: string; maSo: string; }) => {
        return await http.post<any>(`/thongtinbaohiem`, param);
    },
    updateInsurance: async (formData: any) => {
        return await http.put<any>("/thongtinbaohiem", formData);
    },
    getInssuranceDetail: async (thongTinBaoHiemId: number ) => {
        return await http.get<any>(`/thongtinbaohiem/chitiet?thongTinBaoHiemId=${thongTinBaoHiemId}`);
    },
    deleteInsurance: async (id: number) => {
        return await http.delete<any>(`/thongtinbaohiem/${id}`)
    },
}

/**
* GET INSURANCE LIST
**/
export const useGetInsuranceListNormal = (param: { page: number; pageSize: number; keyword: string; DanCuId: number | null; LoaiBaoHiemId: number; MaSo: string; }) => {
    return useQuery({
        queryKey: ['insuranceList', param.page, param.pageSize, param.keyword, param.DanCuId, param.LoaiBaoHiemId, param.MaSo],
        queryFn: async () => {
            try {
                const res = await insuranceApiRequest.getInsuranceList(param);
                return res
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thẻ BHYT:", error);
                throw error;
            }
        },
        // enabled: !!param.DanCuId,
        staleTime: 0,
        retry: 1,
    });
};

/**
* POST INSURANCE
**/
export const useCreateInsurance = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await insuranceApiRequest.createInsurance(formData);
        },
        onSuccess: () => {

            showSuccess('Tạo thẻ BHYT thành công');

            queryClient.invalidateQueries({ queryKey: ["insuranceList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* PUT INSURANCE
**/
export const useUpdateInsurance = () => {
    const { showSuccess, showError } = useCustomSnackbar();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: any) => {
            return await insuranceApiRequest.updateInsurance(formData);
        },
        onSuccess: () => {
            showSuccess('Cập nhật thông tin thẻ BHYT thành công')

            queryClient.invalidateQueries({ queryKey: ["insuranceDetail"] });
            queryClient.invalidateQueries({ queryKey: ["insuranceList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};

/**
* GET INSURANCE DETAIL
**/
export const useGetInsuranceDetail = (thongTinBaoHiemId: number) => {

    return useQuery({
        queryKey: ['inssuranceDetail', thongTinBaoHiemId],
        queryFn: async () => {
            try {

                const res = await insuranceApiRequest.getInssuranceDetail(thongTinBaoHiemId);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        staleTime: 0,
        retry: 1,
    });
};

/**
* DELETE INSURANCE
**/
export const useDeleteInsurance = () => {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useCustomSnackbar();

    return useMutation({
        mutationFn: async (id: number) => {
            return await insuranceApiRequest.deleteInsurance(id);
        },
        onSuccess: () => {
            showSuccess('Xóa thẻ BHYT thành công')

            queryClient.invalidateQueries({ queryKey: ["insuranceList"] });
        },
        onError: (error: string) => {
            console.error(`Lỗi: ${error}`)
            showError(error)
        },
    });
};