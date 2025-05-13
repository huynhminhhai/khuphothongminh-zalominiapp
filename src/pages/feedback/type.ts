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

export interface FormDataPhanAnh {
    phanAnhId?: number;
    apId: number;
    linhVucPhanAnhId: number; 
    noiDung: string;
    diaChi: string;
    maXa: string;
    maHuyen: string;
    maTinh: string;
    latitude?: number | null;
    longitude?: number | null;
    congKhaiThongTinCaNhan: boolean;
    congKhaiPhanAnh: boolean;
    tinhTrangId?: number;
    tapTinPhanAnhFormFiles?: File[];
}

export const phanAnhSchema = yup.object().shape({
    apId: yup.number().typeError('Chưa chọn mục này').required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    linhVucPhanAnhId: yup.number().required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    noiDung: yup.string().required("Chưa nhập nội dung"),
    diaChi: yup.string().required("Chưa nhập địa chỉ"),
    maXa: yup.string().required("Chưa chọn mục này"),
    maHuyen: yup.string().required("Chưa chọn mục này"),
    maTinh: yup.string().required("Chưa chọn mục này"),
    latitude: yup
        .number().nullable(),
    longitude: yup
        .number().nullable(),
    congKhaiThongTinCaNhan: yup.boolean().required(),
    congKhaiPhanAnh: yup.boolean().required(),
    // tinhTrangId: yup.number().required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    tapTinPhanAnhFormFiles: yup
    .array()
    .of(yup.mixed<File>().required("Tệp không hợp lệ"))
    .default([])
    .ensure()
    .min(1, "Vui lòng tải lên ít nhất một tệp"),
});