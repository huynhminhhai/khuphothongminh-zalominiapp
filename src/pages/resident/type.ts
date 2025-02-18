import * as yup from 'yup';

export const schemaResident = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    gender: yup.number().required('Chưa chọn giới tính').notOneOf([0], 'Chưa chọn mục này'),
    birthDate: yup.string().required('Chưa chọn ngày sinh'),
    relationship: yup.number().required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    numberCard: yup.string().typeError('CCCD phải là một số').required("CCCD phải là một số"),
    dateCard: yup.string().required("Chưa chọn mục này"),
    religion: yup.number().required('Chưa chọn tôn giáo').notOneOf([0], 'Chưa chọn mục này'),
    nation: yup.number().required('Chưa chọn dân tộc').notOneOf([0], 'Chưa chọn mục này'),
    residenceType: yup.number().required("Chưa chọn mục này"),
    residenceStatus: yup.number().required("Chưa chọn mục này"),
    // Thường trú
    addressPermanent: yup.string().required('Địa chỉ không được để trống'),
    provincePermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    districtPermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    wardsPermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    // quê quán
    address: yup.string().required('Địa chỉ không được để trống'),
    province: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    district: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    ward: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
});

export type FormDataResident = {
    fullname: string;
    phoneNumber: string;
    residenceType: number;
    residenceStatus: number;
    relationship: number;
    birthDate: string;
    gender: number;
    numberCard: string;
    dateCard: string;
    religion: number;
    nation: number;
    bhyt?: string;
    job?: number;
    // Thường trú
    addressPermanent: string;
    provincePermanent: number;
    districtPermanent: number;
    wardsPermanent: number;
    // quê quán
    address: string;
    province: number;
    district: number;
    ward: number;
};