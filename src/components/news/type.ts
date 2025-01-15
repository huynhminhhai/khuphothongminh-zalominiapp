import * as yup from 'yup';

export const schemaNews = yup.object().shape({
    title: yup.string().required('Không được để trống'),
    description: yup.string().required('Không được để trống'),
    content: yup.string().required('Không được để trống'),

});

export type FormDataNews = {
    title: string;      
    description: string;
    content: string;
    imageUrl?: string;
}