
export function convertNumberVND(amount: number): string {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
}

export function maskPhoneNumber(phone: string): string {
    return phone?.replace(/(\d{3})\d+(\d{2})/, '$1*****$2');
}