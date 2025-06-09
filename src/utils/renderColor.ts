export const getTinhTrangTaskColor = (tenTinhTrang: string): { bg: string; color: string } => {
    switch (tenTinhTrang) {
        case "Khởi tạo":
            return { bg: 'bg-[#eeedf2]', color: 'text-[#797985]' };
        case "Đang thực hiện":
            return { bg: 'bg-[#ebf0f4]', color: 'text-[#0667e1]' };
        case "Hoàn thành":
            return { bg: 'bg-[#eaf0ea]', color: 'text-[#157c0c]' };
        case "Đã xóa":
            return { bg: 'bg-[#f5f1ee]', color: 'text-[#c7373e]' };
        default:
            return { bg: 'bg-[#eeedf2]', color: 'text-[#797985]' };
    }
};

export const getTinhTrangFeedbackColor = (tenTinhTrang: string): { bg: string; color: string } => {
    switch (tenTinhTrang) {
        case "Khởi tạo":
            return { bg: 'bg-[#eeedf2]', color: 'text-[#797985]' };
        case "Chờ phản hồi":
            return { bg: 'bg-[#ebf0f4]', color: 'text-[#0667e1]' };
        case "Đã phản hồi":
            return { bg: 'bg-[#eaf0ea]', color: 'text-[#157c0c]' };
        case "Đã xóa":
            return { bg: 'bg-[#f5f1ee]', color: 'text-[#c7373e]' };
        default:
            return { bg: 'bg-[#eeedf2]', color: 'text-[#797985]' };
    }
}

export const getTinhTrangFeedback1022Color = (tenTinhTrang: string): { bg: string; color: string } => {
    switch (tenTinhTrang) {
        case "Đang xử lý":
            return { bg: 'bg-[#ebf0f4]', color: 'text-[#0667e1]' };
        case "Đã xử lý":
            return { bg: 'bg-[#eaf0ea]', color: 'text-[#157c0c]' };
        case "Hoàn thành":
            return { bg: 'bg-[#eaf0ea]', color: 'text-[#157c0c]' };
        default:
            return { bg: 'bg-[#eeedf2]', color: 'text-[#797985]' };
    }
}