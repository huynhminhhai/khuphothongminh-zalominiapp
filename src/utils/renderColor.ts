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
            return { bg: 'bg-[#797985]', color: 'text-[#ffffff]' };
        case "Đang xử lý":
            return { bg: 'bg-[#0667e1]', color: 'text-[#ffffff]' };
        case "Đã xử lý":
            return { bg: 'bg-[#157c0c]', color: 'text-[#ffffff]' };
        case "Đã xóa":
            return { bg: 'bg-[#c7373e]', color: 'text-[#ffffff]' };
        default:
            return { bg: 'bg-[#797985]', color: 'text-[#ffffff]' };
    }
}