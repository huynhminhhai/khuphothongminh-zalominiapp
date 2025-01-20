import * as yup from 'yup';

export const schemaMeeting = yup.object().shape({
    title: yup.string().required('Không được để trống'),
    description: yup.string().required('Không được để trống'),
    meetingDate: yup.string().required('Không được để trống'),
    startTime: yup.string().required('Không được để trống'),
    endTime: yup.string().required('Không được để trống'),
    address: yup.string().required('Không được để trống'),
});

export type FormDataMeeting = {
    id?: number;
    title: string;      
    description: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    address: string;
    linkOnl?: string;
    resident?: number;
    staff?: number[];
    notifyOA?: boolean;
    status?: number
}