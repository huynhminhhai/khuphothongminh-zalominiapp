export interface AppSliceType {
    isLoadingFullScreen: boolean;
    isShowModalRegisterAp: boolean;
    isShowModalIsComingSoon: boolean;
    isShowModalIsLogin: boolean;
    isResidentMainTab: string;
    setIsLoadingFullScreen: (loading: boolean) => void;
    setIsResidentMainTab: (residentTab: string) => void;
    setIsShowModalRegisterAp: (show: boolean) => void;
    setIsShowModalIsComingSoon: (show: boolean) => void;
    setIsShowModalIsLogin: (show: boolean) => void;
}

export const createAppSlice = (set: any): AppSliceType => ({
    isLoadingFullScreen: false,
    isShowModalRegisterAp: false,
    isShowModalIsComingSoon: false,
    isShowModalIsLogin: false,
    isResidentMainTab: 'residentTab',
    setIsLoadingFullScreen: (loading: boolean) =>
        set((state: AppSliceType) => ({
            ...state,
            isLoadingFullScreen: loading,
        })
    ),
    setIsResidentMainTab: (residentTab: string) =>
        set((state: AppSliceType) => ({
            ...state,
            isResidentMainTab: residentTab,
        })
    ),
    setIsShowModalRegisterAp: (show: boolean) =>
        set((state: AppSliceType) => ({
            ...state,
            isShowModalRegisterAp: show,
        })
    ),
    setIsShowModalIsComingSoon: (show: boolean) =>
        set((state: AppSliceType) => ({
            ...state,
            isShowModalIsComingSoon: show,
        })
    ),
    setIsShowModalIsLogin: (show: boolean) =>
        set((state: AppSliceType) => ({
            ...state,
            isShowModalIsLogin: show,
        })
    ),
});