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