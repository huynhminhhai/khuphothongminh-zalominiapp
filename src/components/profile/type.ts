import * as yup from 'yup';

export const schemaProfile = (isHouseHold: boolean) => yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    gender: yup.number().required('Chưa chọn giới tính').notOneOf([0], 'Chưa chọn mục này'),
    birthDate: yup.string().required('Chưa chọn ngày sinh'),
    numberCard: yup.string().typeError('CCCD phải là một số').required("CCCD phải là một số"),
    dateCard: yup.string().required("Chưa chọn mục này"),
    religion: yup.number().required('Chưa chọn tôn giáo').notOneOf([0], 'Chưa chọn mục này'),
    nation: yup.number().required('Chưa chọn dân tộc').notOneOf([0], 'Chưa chọn mục này'),
    residenceType: yup.number().required("Chưa chọn mục này"),
    residenceStatus: yup.number().required("Chưa chọn mục này"),
    economicStatus: yup.number().required("Mã bảo hiểm không được để trống"),
    culturalFamilyStatus: yup.boolean().required("Mã bảo hiểm không được để trống"),
    relationship: yup.number()
        .test('required-or-empty', 'Chưa chọn mục này', function (value) {

            if (!isHouseHold && (value === undefined || value === null || value === 0)) {
                return this.createError({ message: 'Chưa chọn mục này' });
            }

            return true;
        }),
    parentId: yup
        .number()
        .test('required-or-empty', 'Chưa chọn mục này', function (value) {

            if (!isHouseHold && (value === undefined || value === null || value === 0)) {
                return this.createError({ message: 'Chưa chọn mục này' });
            }

            return true;
        }),
    // Thường trú
    addressPermanent: yup.string().required('Địa chỉ không được để trống'),
    provincePermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    districtPermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    wardsPermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    // quê quán
    address: yup.string().required('Địa chỉ không được để trống'),
    province: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    district: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    ward: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
});

export type FormDataProfile = {
    fullname: string;
    phoneNumber: string;
    numberCard: string;
    dateCard: string;
    gender: number;
    birthDate: string;
    nation: number;
    religion: number;
    relationship?: number;
    residenceStatus: number;
    residenceType: number;
    bhyt?: string;
    economicStatus: number;
    culturalFamilyStatus: boolean;
    parentId?: number;
    job?: number;
    // Thường trú
    addressPermanent: string;
    provincePermanent: number;
    districtPermanent: number;
    wardsPermanent: number;
    // quê quán
    address: string;
    province: number;
    district: number;
    ward: number;
}