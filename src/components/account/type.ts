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
    email?: string;
    dienThoai?: string;
    soGiayTo?: string;
    fileAnhDaiDien?: File;
}

export const schemaChangePassword = yup.object().shape({
    oldPassword: yup.string().required('Không được để trống'),
    password: yup.string().required('Không được để trống'),
    confirmPassword: yup
        .string()
        .required('Không được để trống')
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
});

export type FormDataChangePassword = {
    oldPassword: string;
    confirmPassword: string;
    password: string;
}