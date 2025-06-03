import * as yup from 'yup';

export const schemaNews = yup.object().shape({
    tieuDe: yup.string().required('Không được để trống'),
    moTa: yup.string().required('Không được để trống'),
    noiDung: yup.string().required('Không được để trống'),
    // tacGia: yup.string().required('Không được để trống'),
    fileAnhDaiDien: yup
        .mixed<File>()
        .test("required", "Vui lòng chọn một tệp ảnh", (value) => {
            return value instanceof File;
        }),
    ngayXuatBan: yup.string().required('Không được để trống'), 
});

export type FormDataNews = {
    tieuDe: string;
    fileAnhDaiDien?: File;
    moTa: string;
    noiDung: string;
    tacGia?: string;
    ngayXuatBan: string;
};

export type NewsType = {
    tinTucId: number,
    apId: number,
    anhDaiDien: string,
    tieuDe: string,
    moTa: string,
    noiDung: string,
    tacGia: string,
    tinhTrangId: number,
    ngayXuatBan: string
}

export const getTenTinhTrang = (tinhTrangId: number, danhSachTinhTrang: { tinhTrangId: number; tenTinhTrang: string }[]) => {
    const tinhTrang = danhSachTinhTrang.find(item => item.tinhTrangId === tinhTrangId);
    return tinhTrang ? tinhTrang.tenTinhTrang : "Không xác định";
};