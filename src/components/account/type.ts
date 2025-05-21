import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
    username: yup.string().required('Không được để trống'),
    password: yup.string().required('Không được để trống'),
});

export type FormDataLogin = {
    username: string;      
    password: string;
}

export const schemaProfile = yup.object().shape({
    hoTen: yup.string().required('Không được để trống'),
    tenDangNhap: yup.string().required('Không được sé trống'),
});

export type FormDataProfile = {
    tenDangNhap: string;
    hoTen: string;
    fileAnhDaiDien?: File;
}

export const schemaChangePassword = yup.object().shape({
    matKhau: yup.string().required('Không được để trống'),
    matKhauMoi: yup.string().required('Không được để trống'),
    matKhauMoiLapLai: yup
        .string()
        .required('Không được để trống')
        .oneOf([yup.ref('matKhauMoi')], 'Mật khẩu xác nhận không khớp'),
});

export type FormDataChangePassword = {
    matKhau: string;
    matKhauMoiLapLai: string;
    matKhauMoi: string;
    fileAnhDaiDien?: File;
}

export const schemaRegisterAp = yup.object().shape({
    maHuyen: yup.string().required('Không được để trống'),
    maXa: yup.string().required('Không được để trống'),
    apId: yup.number().typeError('Không được để trống').required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    hoTen: yup.string().required('Không được để trống'),
    dienThoai: yup.string().required('Không được để trống'),
    // soGiayTo: yup.string().required('Không được để trống'),
})

export type FormDataRegisterAp = {
    nguoiDungId?: number;
    maTinh?: string;
    maHuyen: string;
    maXa: string;
    apId: number;
    hoTen: string;
    dienThoai: string;
    soGiayTo?: string;
}