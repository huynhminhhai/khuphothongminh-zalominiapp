import { useQuery } from "@tanstack/react-query";
import http from "services/http";

const appApiRequest = {
    getHuyen: (maTinh: string) => http.get<any>(`/huyen/tinh/${maTinh}`),
    getXa: (maHuyen: string) => http.get<any>(`/xa/huyen/${maHuyen}`),
}

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
        staleTime: 0,
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
        staleTime: 0,
        retry: 1,
    });
};