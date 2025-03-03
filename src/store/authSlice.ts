import { removeDataFromStorage, setDataToStorage } from "services/zalo";

export interface Account {
    id: string;
    fullname: string;
    avatar: string;
    role: string;
    phoneNumber: string;
}

export interface AuthSliceType {
    account: Account | null;
    token: string | null;
    setAuth: (authData: { account: Account | null; token: string | null }) => void;
    clearAuth: () => void;
}

export const createAuthSlice = (set: any): AuthSliceType => ({
    account: null,
    token: null,
    setAuth: ({ account, token }) => {
        set((state: AuthSliceType) => ({
            ...state,
            account,
            token,
        }));

        if (account && token) {
            setDataToStorage({ account: JSON.stringify(account), token });
        } else {
            removeDataFromStorage(["account", "token"]);
        }
    },

    clearAuth: () => {
        set((state: AuthSliceType) => ({
            ...state,
            account: null,
            token: null,
        }));

        removeDataFromStorage(["account", "token"]);
    },
});
