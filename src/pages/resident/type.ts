import * as yup from 'yup';

export const schemaResident = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    address: yup.string().required('Địa chỉ không được để trống'),
    gender: yup.number().required('Chưa chọn giới tính').notOneOf([0], 'Chưa chọn mục này'),
    birthDate: yup.string().required('Chưa chọn ngày sinh'),
    relationship: yup.number().required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    numberCard: yup.string().typeError('CCCD phải là một số').required("CCCD phải là một số"),
    dateCard: yup.string().required("Chưa chọn mục này"),
    religion: yup.string().required("Không được để trống"),
    nation: yup.string().required("Không được để trống"),
    residenceType: yup.number().required("Chưa chọn mục này"),
    residenceStatus: yup.number().required("Chưa chọn mục này"),
});

export type FormDataResident = {
    fullname: string;
    phoneNumber: string;
    residenceType: number;
    residenceStatus: number;
    address: string;
    relationship: number;
    birthDate: string;
    gender: number;
    numberCard: string;
    dateCard: string;
    religion: string;
    nation: string;
    bhyt?: string;
    job?: number;
};