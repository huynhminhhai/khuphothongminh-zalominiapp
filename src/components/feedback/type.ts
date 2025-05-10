import * as yup from 'yup';

export const schemaFeedbackAnswer = yup.object().shape({
    noiDung: yup.string().required('Không được để trống'),
    // tapTinPhanHoiFormFiles: yup
    //     .array()
    //     .of(yup.mixed<File>().required("Tệp không hợp lệ"))
    //     .default([])
    //     .ensure()
    //     .min(1, "Vui lòng tải lên ít nhất một tệp"),
});

export type FormDataFeedbackAnswer = {
    phanAnhId?: number;
    noiDung: string;
    tapTinPhanHoiFormFiles?: File[];
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