import * as yup from 'yup';

export const schemaFeedback = yup.object().shape({
    content: yup.string().required('Không được để trống'),

});

export type FormDataFeedback = {
    content: string;
    files?: string[];
}

export interface TapTinPhanAnh {
    tapTinPhanAnhId: number;
    phanAnhId: number;
    tapTin: string;
}

export interface FeedbackType {
    phanAnhId: number;
    apId: number;
    noiDung: string;
    diaChi: string;
    maXa: string;
    maHuyen: string;
    maTinh: string;
    latitude: number;
    longitude: number;
    congKhaiThongTinCaNhan: boolean;
    congKhaiPhanAnh: boolean;
    tinhTrangId: number;
    tapTinPhanAnhs: TapTinPhanAnh[];
}