import * as yup from 'yup';

export const schemaTeam = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    birthDate: yup.string().required('Ngày sinh không được để trống'),
    phoneNumber: yup.string().required('SĐT không được để trống'),
    officeAddress: yup.string().required('Không được để trống'),
    residential_group_id: yup.number().required('Không được để trống'),
    term: yup.object().shape({
        position: yup.string().required('Chức vụ không được để trống'), 
        startDate: yup.string().required('Ngày bắt đầu không được để trống'), 
        endDate: yup.string().required('Ngày kết thúc không được để trống') 
    })
});

type FormDataTerm = {
    position: string;
    startDate: string;
    endDate: string;
}

export type FormDataTeam = {
    fullname: string;
    birthDate: string;
    phoneNumber: string;
    email?: string;
    officeAddress: string;
    residential_group_id: number;
    term: FormDataTerm;
}

export const schemaTeamUpdate = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    birthDate: yup.string().required('Ngày sinh không được để trống'),
    phoneNumber: yup.string().required('SĐT không được để trống'),
    officeAddress: yup.string().required('Không được để trống'),
    residential_group_id: yup.number().required('Không được để trống')
});

export type FormDataTeamUpdate = {
    fullname: string;
    birthDate: string;
    phoneNumber: string;
    email?: string;
    officeAddress: string;
    residential_group_id: number;
}