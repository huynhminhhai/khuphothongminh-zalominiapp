
export function convertNumberVND(amount: number): string {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
}

export function maskPhoneNumber(phone: string): string {
    return phone?.replace(/(\d{3})\d+(\d{2})/, '$1*****$2');
}

export function formatPhoneNumber(phone: string): string {
    if (!phone) return '';

    // Xóa tất cả ký tự không phải số
    const digits = phone.replace(/\D/g, '');

    // Nếu bắt đầu bằng 84 và có độ dài đủ (ít nhất 11 số)
    if (digits.startsWith('84') && digits.length >= 11) {
        return '0' + digits.substring(2);
    }

    // Nếu đã đúng định dạng 0xxxxxxxxx thì giữ nguyên
    if (digits.startsWith('0') && digits.length === 10) {
        return digits;
    }

    // Trường hợp không rõ ràng, trả về nguyên bản số đã được lọc
    return digits;
}