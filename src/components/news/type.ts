import * as yup from 'yup';

export const schemaNews = yup.object().shape({
    TieuDe: yup.string().required('Không được để trống'),
    MoTa: yup.string().required('Không được để trống'),
    NoiDung: yup.string().required('Không được để trống'),
    TacGia: yup.string().required('Không được để trống'),
    FileAnhDaiDien: yup
        .mixed<File>()
        .test("required", "Vui lòng chọn một tệp ảnh", (value) => {
            return value instanceof File;
        }),
    // NgayXuatBan: yup.string().required('Không được sé trống'), 
});

export type FormDataNews = {
    TieuDe: string;
    FileAnhDaiDien?: File;
    MoTa: string;
    NoiDung: string;
    TacGia: string;
    NgayXuatBan?: string;
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