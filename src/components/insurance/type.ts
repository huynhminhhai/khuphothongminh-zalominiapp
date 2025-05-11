import * as yup from 'yup';

export const schemaInsurance = yup.object().shape({
    noiDangKy: yup.string().required("Không được để trống"),
    tuNgay: yup.string().required("Không được để trống"),
    denNgay: yup.string().required("Không được để trống"),
    maSo: yup.string().required("Không được để trống"),
});

export type FormDataInsurance = {
    thongTinBaoHiemId?: number;
    danCuId?: number;
    loaiBaoHiemId?: number;
    noiDangKy: string;
    tuNgay: string;
    denNgay: string;
    maSo: string;
}
export interface InsuranceItemType {
    thongTinBaoHiemId: number;
    danCuId: number;
    loaiBaoHiemId: number;
    noiDangKy: string;
    tuNgay: string;
    denNgay: string;
    maSo: string;
}