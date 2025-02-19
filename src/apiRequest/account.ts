import { useQuery } from '@tanstack/react-query';
import http from 'services/http';

const accountApiRequest = {
    me: () => http.get<any>('/account/me'),
}

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: accountApiRequest.me
    });
};