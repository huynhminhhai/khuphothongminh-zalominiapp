import { useQueryClient } from '@tanstack/react-query';
import { meetingApiRequest } from 'apiRequest/meeting';
import * as yup from 'yup';

export const schemaMeeting = yup.object().shape({
    tieuDe: yup.string().required('Không được để trống'),
    noiDung: yup.string().required('Không được để trống'),
    ngayHop: yup.string().required('Không được để trống'),
    thoiGianBatDau: yup.string().required('Không được để trống'),
    thoiGianKetThuc: yup.string().required('Không được để trống'),
    diaDiem: yup.string().required('Không được để trống'),
    // tinhTrangId: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    chuTri: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    // fileDinhKems: yup
    //     .array()
    //     .of(yup.mixed<File>().required("Tệp không hợp lệ"))
    //     .default([])
    //     .ensure()
    //     .min(1, "Vui lòng tải lên ít nhất một tệp"),
});

interface TinhTrang {
    tinhTrangId: number;
    loaiTinhTrang: string;
    tenTinhTrang: string;
}

export type FormDataMeeting = {
    cuocHopId?: number;
    tieuDe: string;
    noiDung: string;
    ngayHop: string;
    thoiGianBatDau: string;
    thoiGianKetThuc: string;
    diaDiem: string;
    linkHopOnLine?: string;
    tinhTrangId?: number;
    chuTri: number;
    thuKy?: number | null;
    thanhVien?: number[];
    fileDinhKems?: File[];
}

export type MeetingType = {
    cuocHopId: number;
    apId: number;
    tieuDe: string;
    noiDung: string;
    thoiGianBatDau: string;
    thoiGianKetThuc: string;
    diaDiem: string;
    linkHopOnLine: string;
    tinhTrangId: number;
    tinhTrang: TinhTrang;
}

export function convertMeetingTime(meeting: any) {
    // Lấy ngày từ ngayHop
    const datePart = meeting.ngayHop.split('T')[0]; // "2025-04-02"

    // Ghép ngày với thoiGianBatDau và thoiGianKetThuc
    const thoiGianBatDau = `${datePart}T${meeting.thoiGianBatDau}:00Z`;
    const thoiGianKetThuc = `${datePart}T${meeting.thoiGianKetThuc}:00Z`;

    // Tạo object mới, loại bỏ ngayHop
    const { ngayHop, ...rest } = meeting; // Dùng destructuring để loại ngayHop
    return {
        ...rest,
        thoiGianBatDau: thoiGianBatDau,
        thoiGianKetThuc: thoiGianKetThuc
    };
}

export function convertParticipants(meeting: any) {
    const participants: any = [];

    // Nếu đã có danh sách thanh viên trước đó
    const existingParticipants = meeting.thanhVienCuocHops || [];

    // Hàm tìm participant cũ nếu có
    const findExisting = (nguoiThamDuId: number) =>
        existingParticipants.find((p: any) => p.nguoiThamDuId === nguoiThamDuId) || {};

    // Xử lý chuTri (chủ trì)
    if (meeting.chuTri !== null && meeting.chuTri !== undefined) {
        const existing = findExisting(meeting.chuTri);
        participants.push({
            // thanhVienCuocHopId: existing.thanhVienCuocHopId || 0,
            // cuocHopId: meeting.cuocHopId || 0,
            nguoiThamDuId: meeting.chuTri,
            // nguoiThamDuKhac: null,
            loaiNguoiThamDuId: 1 // Chủ trì
        });
    }

    // Xử lý thuKy (thư ký)
    if (meeting.thuKy !== null && meeting.thuKy !== undefined) {
        const existing = findExisting(meeting.thuKy);
        participants.push({
            // thanhVienCuocHopId: existing.thanhVienCuocHopId || 0,
            // cuocHopId: meeting.cuocHopId || 0,
            nguoiThamDuId: meeting.thuKy,
            // nguoiThamDuKhac: null,
            loaiNguoiThamDuId: 2 // Thư ký
        });
    }

    // Xử lý danh sách thành viên
    if (Array.isArray(meeting.thanhVien)) {
        meeting.thanhVien.forEach(member => {
            const existing = findExisting(member);
            participants.push({
                // thanhVienCuocHopId: existing.thanhVienCuocHopId || 0,
                // cuocHopId: meeting.cuocHopId || 0,
                nguoiThamDuId: member,
                // nguoiThamDuKhac: null,
                loaiNguoiThamDuId: 3 // Thành viên
            });
        });
    }

    // Xóa các trường không cần thiết trước khi gửi API
    const { chuTri, thuKy, thanhVien, thanhVienCuocHops, ...rest } = meeting;

    return {
        ...rest,
        thanhVienCuocHops: participants
    };
}


export function convertMeetingBack(meeting) {
    // Xử lý danh sách thành viên cuộc họp
    let chuTri = null;
    let thuKy = null;
    const thanhVien: any = [];

    if (Array.isArray(meeting.thanhVienCuocHops)) {
        meeting.thanhVienCuocHops.forEach(member => {
            if (member.loaiNguoiThamDuId === 1) {
                chuTri = member.nguoiThamDuId;
            } else if (member.loaiNguoiThamDuId === 2) {
                thuKy = member.nguoiThamDuId;
            } else if (member.loaiNguoiThamDuId === 3) {
                thanhVien.push(member.nguoiThamDuId);
            }
        });
    }

    // Chuyển đổi thời gian về 3 tham số
    const ngayHop = meeting.thoiGianBatDau.split(" ")[0] + "T00:00:00Z";

    // Tách giờ:phút từ thoiGianBatDau và thoiGianKetThuc
    const thoiGianBatDau = meeting.thoiGianBatDau.split(" ")[1].slice(0, 5); // "14:00:00" -> "14:00"
    const thoiGianKetThuc = meeting.thoiGianKetThuc.split(" ")[1].slice(0, 5);

    // Tạo object mới, loại bỏ các trường không cần
    const { cuocHopId, apId, tinhTrang, thanhVienCuocHops, ...rest } = meeting;
    return {
        ...rest,
        tieuDe: meeting.tieuDe,
        noiDung: meeting.noiDung,
        diaDiem: meeting.diaDiem,
        linkHopOnLine: meeting.linkHopOnLine,
        tinhTrangId: meeting.tinhTrangId,
        chuTri: chuTri,
        thuKy: thuKy,
        thanhVien: thanhVien,
        ngayHop: ngayHop,
        thoiGianBatDau: thoiGianBatDau,
        thoiGianKetThuc: thoiGianKetThuc
    };
}

export async function compareThanhVienCuocHops(submitData, detailData) {
    const submitMembers = submitData.thanhVienCuocHops;
    const detailMembers = detailData.thanhVienCuocHops;

    // Danh sách để lưu các hành động
    const actions: any = {
        keep: [],    // Giữ nguyên
        add: [],     // Thêm mới
        remove: []   // Xóa
    };

    // Tạo map từ detailMembers để dễ tra cứu
    const detailMap = new Map();
    detailMembers.forEach(member => {
        detailMap.set(`${member.nguoiThamDuId}-${member.loaiNguoiThamDuId}`, member);
    });

    // Duyệt qua submitMembers để kiểm tra
    submitMembers.forEach(submitMember => {
        const key = `${submitMember.nguoiThamDuId}-${submitMember.loaiNguoiThamDuId}`;
        const matchingDetail = detailMap.get(key);

        if (matchingDetail) {
            // Nếu trùng nguoiThamDuId và loaiNguoiThamDuId, giữ nguyên từ detail
            actions.keep.push(matchingDetail);
            detailMap.delete(key); // Xóa khỏi map để đánh dấu đã xử lý
        } else {
            // Nếu không tìm thấy trong detail, thêm mới
            actions.add.push(submitMember);
        }
    });

    // Các thành viên còn lại trong detailMap là cần xóa
    detailMap.forEach(remainingMember => {
        actions.remove.push(remainingMember);
    });

    // Xử lý kết quả
    await handleActions(actions);

    return actions;
}

async function handleActions(actions) {

    // Giữ nguyên
    if (actions.add.length > 0) {
        console.log("Giữ nguyên:", actions.keep);
        for (const member of actions.keep) {
            try {
                await meetingApiRequest.updateMeetingMember(member);
            } catch (error) {
                console.error(`Lỗi khi thêm thành viên ${member.nguoiThamDuId}:`, error);
            }
        }
    }

    // Thêm mới
    if (actions.add.length > 0) {
        console.log("Thêm mới:", actions.add);
        for (const member of actions.add) {
            try {
                await meetingApiRequest.createMeetingMember(member);
            } catch (error) {
                console.error(`Lỗi khi thêm thành viên ${member.nguoiThamDuId}:`, error);
            }
        }
    }

    // Xóa
    if (actions.remove.length > 0) {
        for (const member of actions.remove) {
            try {
                await meetingApiRequest.deleteMeetingMember(member.thanhVienCuocHopId);
            } catch (error) {
                console.error(`Lỗi khi xóa thành viên ${member.thanhVienCuocHopId}:`, error);
            }
        }
    }
}