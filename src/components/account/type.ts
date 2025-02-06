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
    fullname: yup.string().required('Không được để trống'),
    phoneNumber: yup.string().required('Không được để trống'),
});

export type FormDataProfile = {
    fullname: string;      
    phoneNumber: string;
    email?: string;
    avatar?: string;
}
