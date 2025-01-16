import * as yup from 'yup';

export const schemaFeedback = yup.object().shape({
    content: yup.string().required('Không được để trống'),

});

export type FormDataFeedback = {
    content: string;
    files?: string[];
}