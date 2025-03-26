import { removeDataFromStorage, setDataToStorage } from "services/zalo";
import { useStoreApp } from "./store";

type Role = {
    vaiTroId: number;
    tenVaiTro: string;
    macDinh: boolean;
};

type Permission = {
    moTaChucNang: string;
    tenVaiTroNguoiDung: string;
    quyenXuLy: "XEM" | "SUA";
};

type Account = {
    nguoiDungId: number;
    apId: number;
    tenDangNhap: string;
    hoTen: string;
    vaiTros: Role[];
    quyenXuLyChucNangs: Permission[];
};

export interface AuthSliceType {
    account: Account | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAccount: (account: Account | null) => void;
    setToken: (tokens: { accessToken: string | null; refreshToken: string | null }) => void;
    clearAuth: () => void;
}

export const createAuthSlice = (set: any): AuthSliceType => ({
    account: null,
    accessToken: null,
    refreshToken: null,

    setAccount: (account) => {
        set((state: AuthSliceType) => ({
            ...state,
            account,
        }));

        if (account) {
            setDataToStorage({ account: JSON.stringify(account) });
        } else {
            removeDataFromStorage(["account"]);
        }
    },

    setToken: ({ accessToken, refreshToken }) => {
        set((state: AuthSliceType) => ({
            ...state,
            accessToken,
            refreshToken,
        }));

        if (accessToken && refreshToken) {
            setDataToStorage({ accessToken, refreshToken });
        } else {
            removeDataFromStorage(["accessToken", "refreshToken"]);
        }
    },

    clearAuth: () => {
        set((state: AuthSliceType) => ({
            ...state,
            account: null,
            accessToken: null,
            refreshToken: null,
        }));

        removeDataFromStorage(["account", "accessToken", "refreshToken"]);
    },
});

export const useRole = () => {
    return useStoreApp((state) => {
        const roles = state.account?.vaiTros;
        return roles && roles.length > 0 ? roles.map(role => role.tenVaiTro).join(", ") : "guest";
    });
};
