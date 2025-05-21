import * as yup from 'yup';

export const schemaTeam = (isUpdateAccount: boolean) => yup.object().shape({
    maHuyen: yup.string().required('Không được để trống'),
    maXa: yup.string().required('Không được để trống'),
    apId: yup.number().typeError('Không được để trống').required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    hoTen: yup.string().required('Không được để trống'),
    chucVuId: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    tuNgay: yup.string().required('Không được để trống'),
    denNgay: yup.string().required('Không được để trống'),
    tenDangNhap: yup.string().when([], {
        is: () => isUpdateAccount,
        then: (schema) => schema.required("Không được để trống"),
        otherwise: (schema) => schema.notRequired(),
    }),
    matKhau: yup.string().when([], {
        is: () => isUpdateAccount,
        then: (schema) => schema.required("Không được để trống"),
        otherwise: (schema) => schema.notRequired(),
    }),
});


export const schemaTermAdd = yup.object().shape({
    position: yup.string().required('Chức vụ không được để trống'),
    start_date: yup.string().required('Không được để trống'),
    end_date: yup.string().required('Không được để trống'),
});

export type FormDataTeam = {
    maHuyen: string;
    maXa: string;
    apId: number;
    nguoiDungId?: number;
    hoTen: string;
    chucVuId: number;
    tuNgay: string;
    denNgay: string;
    hoatDong?: boolean;
    nguoiTao?: number;
    tenDangNhap?: string;
    matKhau?: string;
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

export type FormDataResidential = {
    name: string;
}

export const schemaResidential = yup.object().shape({
    name: yup.string().required('Tên tổ dân cư không được để trống'),
});

export interface BanDieuHanh {
    apId: number;
    banDieuHanhId: number;
    chucVuId: number;
    hoTen: string;
    hoatDong: boolean;
    maXa: string;
    nguoiDungId: number;
    tenAp: string;
    tenChucVu: string;
    tenXa: string;
    anhDaiDien?: string;
    tuNgay?: string;
    denNgay?: string;
}