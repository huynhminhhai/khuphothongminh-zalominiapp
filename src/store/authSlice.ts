import { removeDataFromStorage, setDataToStorage } from "services/zalo";
import { StateCreator } from "zustand";
import { useStoreApp } from "./store";

type Role = {
    vaiTroId: number;
    tenVaiTro: string;
    macDinh: boolean;
};

type Permission = {
    moTaChucNang: string;
    tenVaiTroNguoiDung: string;
    quyenXuLy: "XEM" | "SUA" | "XOA";
};

type Account = {
    anhDaiDien?: string;
    nguoiDungId: number;
    apId: number;
    tenDangNhap: string;
    hoTen: string;
    vaiTros: Role[];
    quyenXuLyChucNangs: Permission[];
    dienThoai?: string;
    email?: string;
    soGiayTo?: string;
    thongTinDanCu: any;
};

export interface AuthSliceType {
    account: Account | null;
    accessToken: string | null;
    refreshToken: string | null;
    hanSuDungToken: string | null;
    setAccount: (account: Account | null) => void;
    setToken: (tokens: { accessToken: string | null; refreshToken: string | null, hanSuDungToken: string | null }) => void;
    clearAuth: () => void;
    hasPermission: (moTaChucNang: string, quyen: "XEM" | "SUA" | "XOA") => boolean;
    hasRole: (vaiTro: string) => boolean;
}

export const createAuthSlice = (set: any, get: any): AuthSliceType => ({
    account: null,
    accessToken: null,
    refreshToken: null,
    hanSuDungToken: null,

    setAccount: (account) => {
        set({ account });
        if (account) {
            setDataToStorage({ account: JSON.stringify(account) });
        } else {
            removeDataFromStorage(["account"]);
        }
    },

    setToken: ({ accessToken, refreshToken, hanSuDungToken }) => {
        set({ accessToken, refreshToken, hanSuDungToken });
        if (accessToken && refreshToken) {
            setDataToStorage({ accessToken, refreshToken, hanSuDungToken });
        } else {
            removeDataFromStorage(["accessToken", "refreshToken", "hanSuDungToken"]);
        }
    },

    clearAuth: () => {
        set({ account: null, accessToken: null, refreshToken: null, hanSuDungToken: null });
        removeDataFromStorage(["account", "accessToken", "refreshToken", "hanSuDungToken"]);
    },

    hasPermission: (moTaChucNang, quyen) => {
        const account = get().account;
        if (!account) return false;

        return account.quyenXuLyChucNangs.some((p) => {
            // Kiểm tra chức năng và quyền xử lý
            const hasFunctionAndAction = p.moTaChucNang === moTaChucNang && p.quyenXuLy === quyen;
            if (!hasFunctionAndAction) return false;

            // Kiểm tra vai trò tương ứng với chức năng
            return account.vaiTros.some((role) => role.tenVaiTro === p.tenVaiTroNguoiDung);
        });
    },

    hasRole: (vaiTro) => {
        const account = get().account;
        if (!account) return false;
        return account.vaiTros.some((role) => role.tenVaiTro === vaiTro);
    },
});

export const useRole = () => {
    return useStoreApp((state) => {
        const roles = state.account?.vaiTros;
        return roles && roles.length > 0 ? roles.map((role) => role.tenVaiTro).join(", ") : "guest";
    });
};
