import * as yup from 'yup';

export const schemaReportFinance = yup.object().shape({
    title: yup.string().required('Không được để trống'),
    startDate: yup.string().required('Không được để trống'),
    endDate: yup.string().required('Không được để trống'),
    totalIncome: yup.number().transform((value, originalValue) => (originalValue === "" ? null : value))
        .nullable()
        .required("Không được để trống"),
    totalExpense: yup.number().transform((value, originalValue) => (originalValue === "" ? null : value))
        .nullable()
        .required("Không được để trống"),
    remainingBalance: yup.number().transform((value, originalValue) => (originalValue === "" ? null : value))
        .nullable()
        .required("Không được để trống"),

});

export type FormDataReportFinance = {
    title: string;
    startDate: string;
    endDate: string;
    totalIncome: number;
    totalExpense: number;
    remainingBalance: number;
    createdBy?: number;
    description?: string;
}