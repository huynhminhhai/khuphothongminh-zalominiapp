import * as yup from 'yup';

export const schemaFeedback = yup.object().shape({
    title: yup.string().required('Không được để trống'),
    content: yup.string().required('Không được để trống'),
    // images: yup.array()
    // .of(yup.string().required('Mỗi mục phải là một chuỗi'))
    // .required('Không được để trống')
    // .min(1, 'Cần ít nhất một hình ảnh'),

});

export type FormDataFeedback = {
    title: string;
    content: string;
    images?: string[];
};