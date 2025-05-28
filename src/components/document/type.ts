import * as yup from 'yup';

export const schemaDocument = yup.object().shape({
    soHieu: yup.string().required('Không được để trống'),
    trichYeu: yup.string().required('Không được để trống'),
});

export type FormDataDocument = {
    vanBanId?: number;
    maXa?: string;
    apId?: string;
    soHieu: string;
    trichYeu: string;
    ngayBanHanh?: string;
    tenCoQuanBanHanh?: string;
    tinhTrangId?: number;
    fileDinhKems?: File[];
    nguoiTao?: number;
}