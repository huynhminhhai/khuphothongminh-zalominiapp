import * as yup from 'yup';

export const schemaResident = yup.object().shape({
    hoTen: yup.string().required('Họ tên không được để trống'),
    dienThoai: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    gioiTinh: yup.number().required('Chưa chọn giới tính').notOneOf([0], 'Chưa chọn mục này'),
    ngaySinh: yup.string().required('Chưa chọn ngày sinh'),
    moiQuanHeVoiChuHo: yup.number().required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    soGiayTo: yup.string().typeError('CCCD phải là một số').required("CCCD phải là một số"),
    ngheNghiep: yup.string().required("Không được để trống"),
    noiLamViec: yup.string().required("Không được để trống"),
    tonGiao: yup.number().required('Chưa chọn tôn giáo').notOneOf([0], 'Chưa chọn mục này'),
    danToc: yup.number().required('Chưa chọn dân tộc').notOneOf([0], 'Chưa chọn mục này'),
    loaiCuTruId: yup.number().required("Chưa chọn mục này"),
    // residenceStatus: yup.number().required("Chưa chọn mục này"),
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
    hoTen: string;
    dienThoai: string;
    email?: string;
    loaiCuTruId: number;
    // residenceStatus: number;
    moiQuanHeVoiChuHo: number;
    ngaySinh: string;
    gioiTinh: number;
    soGiayTo: string;
    tonGiao: number;
    danToc: number;
    bhyt?: string;
    ngheNghiep: string;
    noiLamViec: string;
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