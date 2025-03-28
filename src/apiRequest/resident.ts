import http from "services/http";
import { useQueries, useQuery } from "@tanstack/react-query";

const residentApiRequest = {
    getFamilyNumber: async () => {
        return await http.get<any>(`/dancu/soluonghogiadinh`);
    },
    getResidentNumber: async () => {
        return await http.get<any>(`/dancu/soluongdancu`);
    },
}

export const useGetResidentData = () => {
    const [familyNumberQuery, residentNumberQuery] = useQueries({
        queries: [
            {
                queryKey: ["familyNumber"],
                queryFn: async () => {
                    const res = await residentApiRequest.getFamilyNumber();
                    return res.data;
                },
                staleTime: 1000 * 60 * 10,
                retry: 1,
            },
            {
                queryKey: ["residentNumber"],
                queryFn: async () => {
                    const res = await residentApiRequest.getResidentNumber();
                    return res.data;
                },
                staleTime: 1000 * 60 * 10,
                retry: 1,
            },
        ],
    });

    return { familyNumberQuery, residentNumberQuery };
};