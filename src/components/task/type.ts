import * as yup from 'yup';

export const schemaTask = yup.object().shape({
    title: yup.string().required('Không được để trống'),
    description: yup.string().required('Không được để trống'),
    assignedTo: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    dueDate: yup.string().required('Không được để trống'),
    status: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    priority: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
});

export type FormDataTask = {
    title: string;      
    description: string;
    assignedTo: number;
    dueDate: string;
    status: number;
    priority: number;
    imageUrl?: string[]; 
}