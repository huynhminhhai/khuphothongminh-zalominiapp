import { removeDataFromStorage, setDataToStorage } from "services/zalo";

export interface Account {
    id: string;
    fullName: string;
    avatar: string;
    role: string;
    phoneNumber: string;
}

export interface AuthSliceType {
    account: Account | null;
    setAccount: (account: any) => void;
    clearAccount: () => void;
}

export const createAuthSlice = (set: any): AuthSliceType => ({
    account: null,
    setAccount: (account: Account | null) => {
        // Cập nhật trạng thái của Zustand
        set((state: AuthSliceType) => ({
            ...state,
            account,
        }));

        // Lưu thông tin tài khoản vào ZMP storage
        if (account) {
            setDataToStorage(account);  // Lưu tài khoản vào storage
        } else {
            removeDataFromStorage(["account"]);  // Xóa tài khoản khỏi storage nếu không có
        }
    },

    clearAccount: () => {
        set((state: AuthSliceType) => ({
            ...state,
            account: null,
        }));

        removeDataFromStorage(["account"]);
    }
});
