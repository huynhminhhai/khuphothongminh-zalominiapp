import { useQuery } from "@tanstack/react-query";
import http from "services/http";

const appApiRequest = {
    getHuyen: (maTinh: string) => http.get<any>(`/huyen/tinh/${maTinh}`),
    getXa: (maHuyen: string) => http.get<any>(`/xa/huyen/${maHuyen}`),
    getAp: (maXa: string) => http.get<any>(`/ap/xa/${maXa}`),
    getSoLieuHienThi: () => http.get<any>(`/thongkebaocao/solieuhienthitrangchumobileapp`), getsoLuongTaiKhoanTrongDiaPhuong: () => http.get<any>(`/thongkebaocao/soluongtaikhoantrongdiaphuong`),
    getBanDoSo: () => http.get<any>(`/bandoso/hogiadinh`),
    getRanhGioiHuyen: (maHuyen) => http.get<any>(`/huyen/chitiet/mahuyen/${maHuyen}`),
}

/**
 * GET RANH GIOI HUYEN
**/ 

export const useGetRanhGioiHuyen = (maHuyen: string) => {

    return useQuery({
        queryKey: ['ranhGioiHuyen', maHuyen],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getRanhGioiHuyen(maHuyen);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!maHuyen,
        staleTime: 0,
        retry: 1,
    });
};

/**
* GET HUYEN
**/
export const useGetHuyenList = (maTinh: string) => {

    return useQuery({
        queryKey: ['huyenList', maTinh],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getHuyen(maTinh);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!maTinh,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });
};

/**
* GET XA
**/
export const useGetXaList = (maHuyen: string) => {

    return useQuery({
        queryKey: ['xaList', maHuyen],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getXa(maHuyen);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!maHuyen,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });
};

/**
* GET AP
**/
export const useGetApList = (maXa: string) => {

    return useQuery({
        queryKey: ['apList', maXa],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getAp(maXa);

                return res.data
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        enabled: !!maXa,
        staleTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });
};

/**
* GET SO LIEU THONG KE
**/
export const useGetSoLieuHienThi = () => {

    return useQuery({
        queryKey: ['soLieuHienThi'],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getSoLieuHienThi();

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

export const useGetSoLuongTaiKhoanTrongAp = () => {

    return useQuery({
        queryKey: ['soLuongTaiKhoanTrongAp'],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getsoLuongTaiKhoanTrongDiaPhuong();

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

export const useGetBanDoSo = () => {

    return useQuery({
        queryKey: ['banDoSo'],
        queryFn: async () => {
            try {

                const res = await appApiRequest.getBanDoSo();

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