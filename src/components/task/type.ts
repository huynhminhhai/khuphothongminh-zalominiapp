import * as yup from 'yup';

export const schemaTask = yup.object().shape({
    tieuDe: yup.string().required('Không được để trống'),
    noiDung: yup.string().required('Không được để trống'),
    ngayGiao: yup.string().required('Không được để trống'),
    thoiHanXuLy: yup.string().required('Không được để trống'),
    // tinhTrangId: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    chuTri: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
});

export type FormDataTask = {
    nhiemVuId?: number;
    tieuDe: string;      
    noiDung: string;
    ngayGiao: string;
    thoiHanXuLy: string;
    tinhTrangId?: number;
    chuTri: number;
    thanhVien?: number[];
}

export const schemaReportTask = yup.object().shape({
    tinhTrangId: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
});

export type FormDataReportTask = {
    tinhTrangId: number;
}


interface TinhTrang {
    tinhTrangId: number;
    loaiTinhTrang: string;
    tenTinhTrang: string;
}

interface NguoiThucHienNhiemVu {
    nguoiThucHienNhiemVuId: number;
    nhiemVuId: number;
    nguoiThucHienId: number;
    hoTenNguoiThucHien: string;
    chuTri: boolean;
}

interface TapTinNhiemVu {
    tapTinNhiemVuId: number;
    nhiemVuId: number;
    tapTin: string;
}

export type TaskType = {
    nhiemVuId: number;
    apId: number;
    tieuDe: string;
    noiDung: string;
    ngayGiao: string;
    thoiHanXuLy: string;
    tinhTrangId: number;
    tinhTrang: TinhTrang;
    nguoiThucHienNhiemVus: NguoiThucHienNhiemVu[];
    tapTinNhiemVus?: TapTinNhiemVu[];
}

export function convertParticipants(task: any) {
    const participants: any = [];

    // Nếu đã có danh sách thanh viên trước đó
    const existingParticipants = task.nguoiThucHienNhiemVus || [];

    // Hàm tìm participant cũ nếu có
    const findExisting = (nguoiThucHienId: number) =>
        existingParticipants.find((p: any) => p.nguoiThucHienId === nguoiThucHienId) || {};

    // Xử lý chuTri (chủ trì)
    if (task.chuTri !== null && task.chuTri !== undefined) {
        const existing = findExisting(task.chuTri);
        participants.push({
            // nguoiThucHienNhiemVuId: existing.nguoiThucHienNhiemVuId || 0,
            nguoiThucHienId: task.chuTri,
            chuTri: true
        });
    }

    // Xử lý danh sách thành viên
    if (Array.isArray(task.thanhVien)) {
        task.thanhVien.forEach(member => {
            const existing = findExisting(member);
            participants.push({
                // nguoiThucHienNhiemVuId: existing.nguoiThucHienNhiemVuId || 0,
                nguoiThucHienId: member,
                chuTri: false
            });
        });
    }

    // Xóa các trường không cần thiết trước khi gửi API
    const { chuTri, thanhVien, nguoiThucHienNhiemVus, ...rest } = task;

    return {
        ...rest,
        nguoiThucHienNhiemVus: participants
    };
}

export function convertTaskBack(task) {
    let chuTri = null;
    const thanhVien: any = [];

    if (Array.isArray(task.nguoiThucHienNhiemVus)) {
        task.nguoiThucHienNhiemVus.forEach(member => {
            if (member.chuTri === true) {
                chuTri = member.nguoiThucHienId;
            }  else  {
                thanhVien.push(member.nguoiThucHienId);
            }
        });
    }

    // Tạo object mới, loại bỏ các trường không cần
    const { nguoiThucHienNhiemVus, ...rest } = task;
    return {
        ...rest,
        chuTri: chuTri,
        thanhVien: thanhVien,
    };
}

export function compareNguoiThucHienNhiemVus(detailData, formData) {
    const detailMembers = detailData.nguoiThucHienNhiemVus;
    const formMembers = formData.nguoiThucHienNhiemVus;

    // Tạo map từ detailMembers để dễ tra cứu dựa trên nguoiThucHienId
    const detailMap = new Map();
    detailMembers.forEach(member => {
        detailMap.set(member.nguoiThucHienId, member);
    });

    // Kết quả sau khi so sánh
    const result = formMembers.map(formMember => {
        const matchingDetail = detailMap.get(formMember.nguoiThucHienId);

        if (matchingDetail) {
            // Nếu trùng nguoiThucHienId, lấy nguoiThucHienNhiemVuId từ detail
            return {
                ...formMember,
                // nguoiThucHienNhiemVuId: matchingDetail.nguoiThucHienNhiemVuId
            };
        } else {
            // Nếu không trùng, đặt nguoiThucHienNhiemVuId = 0
            return {
                ...formMember,
                // nguoiThucHienNhiemVuId: 0
            };
        }
    });

    return result;
}

export const schemaTienDoNhiemVu = yup.object().shape({
    tinhTrangId: yup.number().typeError('Không được để trống').required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    ghiChu: yup.string().required('Không được để trống'),
});

export type FormDataTienDoNhiemVu = {
    tienDoThucHienNhiemVuId?: number;
    nhiemVuId ?: number;
    ghiChu: string;
    tinhTrangId: number;
    nguoiTao?: number;
    fileDinhKems?: File[]
}