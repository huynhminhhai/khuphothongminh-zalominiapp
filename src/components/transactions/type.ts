import * as yup from 'yup';

export const schemaTransactions = yup.object().shape({
    amount: yup.number().transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Không được để trống"),
    description: yup.string().required('Không được để trống'),
    category: yup.string().required('Không được để trống'),
    transaction_type: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    transaction_date: yup.string().required('Không được để trống'),
});

export type FormDataTranscations = {
    transaction_type: number;      
    amount: number;
    description: string;
    category: string;
    transaction_date: string
}