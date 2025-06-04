import * as yup from 'yup';

export const schemaNotification = yup.object().shape({
    tieuDe: yup.string().required('Không được để trống'),
    noiDung: yup.string().required('Không được để trống'),
});

export type FormDataNotification = {
    maXa?: string;
    apId?: string;
    noiDung: string;
    tieuDe: string;
}