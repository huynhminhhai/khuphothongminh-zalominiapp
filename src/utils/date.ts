export function renderDayOfWeek(dateString: string): string {
    // Tách ngày, tháng, năm từ chuỗi
    const [day, month, year] = dateString.split('/').map(Number);

    // Tạo đối tượng Date
    const date = new Date(year, month - 1, day);

    // Mảng chứa các thứ trong tuần
    const daysOfWeek: string[] = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy"
    ];

    // Lấy chỉ số ngày trong tuần (0 = Chủ Nhật, 6 = Thứ Bảy)
    const dayOfWeekIndex = date.getDay();

    // Trả về thứ trong tuần
    return daysOfWeek[dayOfWeekIndex];
}

export function isExpired(dateString: string): boolean {
    // Tách ngày, tháng, năm từ chuỗi nhập vào
    const [day, month, year] = dateString.split('/').map(Number);

    // Tạo đối tượng Date từ chuỗi
    const inputDate = new Date(year, month - 1, day);

    // Lấy ngày hiện tại (chỉ lấy đến mức ngày, bỏ qua giờ/phút/giây)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // So sánh ngày nhập vào với ngày hiện tại
    return inputDate < today;
}

export const getMeetingStatus = (meetingDate: string, startTime: string, endTime: string): { status: string, bgColor: string } => {
    const [day, month, year] = meetingDate.split('/').map(Number);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDateTime = new Date(year, month - 1, day, startHour, startMinute);
    const endDateTime = new Date(year, month - 1, day, endHour, endMinute);
    const now = new Date();

    if (now < startDateTime) return { status: 'Sắp diễn ra', bgColor: '#FFC107' };
    if (now >= startDateTime && now <= endDateTime) return { status: 'Đang diễn ra', bgColor: '#28a745' };
    return { status: 'Đã kết thúc', bgColor: '#DC3545' };
};

export function timeAgo(date: string | Date): string {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} giây`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} giờ`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ngày`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} tháng`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} năm`;
    }
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};