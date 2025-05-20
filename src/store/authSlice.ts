import { removeDataFromStorage, setDataToStorage } from "services/zalo";
import { StateCreator } from "zustand";
import { useStoreApp } from "./store";

type Role = {
    vaiTroId: number;
    tenVaiTro: string;
    macDinh: boolean;
};

type Permission = {
    maChucNang: string;
    tenVaiTro: string;
    quyenXuLy: "XEM" | "XEMCONGKHAI" | "SUA" | "XOA" | "THEM" | "XUATBAN" | "BAOCAO" | "TIEPNHAN" | "XOACUATOI" | "THUCHIEN";
    hoatDong: boolean;
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
    maHuyen: string;
    maXa: string;
    maTinh: string;
    [key: string]: any;
};

export interface AuthSliceType {
    account: Account | null;
    accessToken: string | null;
    refreshToken: string | null;
    hanSuDungToken: string | null;
    setAccount: (account: Account | null) => void;
    setToken: (tokens: { accessToken: string | null; refreshToken: string | null, hanSuDungToken: string | null }) => void;
    clearAuth: () => void;
    hasPermission: (maChucNang: string, quyen:  "XEM" | "XEMCONGKHAI" | "SUA" | "XOA" | "THEM" | "XUATBAN" | "BAOCAO" | "TIEPNHAN" | "XOACUATOI" | "THUCHIEN") => boolean;
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

    hasPermission: (maChucNang, quyen) => {
        const account = get().account;
        if (!account) return false;

        const isAdmin = account.vaiTros.some(role => role.tenVaiTro === 'Administrators');
        if (isAdmin) return true;

        return account.quyenXuLyChucNangs.some((p) => {
            const matchedFunction =
                p.maChucNang === maChucNang &&
                p.quyenXuLy.toUpperCase() === quyen.toUpperCase() &&
                p.hoatDong;

            if (!matchedFunction) return false;

            return account.vaiTros.some(
                (role) => role.tenVaiTro === p.tenVaiTro
            );
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
