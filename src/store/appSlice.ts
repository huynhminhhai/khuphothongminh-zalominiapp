export interface AppSliceType {
    isLoadingFullScreen: boolean;
    isShowModalRegisterAp: boolean;
    isResidentMainTab: string;
    setIsLoadingFullScreen: (loading: boolean) => void;
    setIsResidentMainTab: (residentTab: string) => void;
    setIsShowModalRegisterAp: (show: boolean) => void;
}

export const createAppSlice = (set: any): AppSliceType => ({
    isLoadingFullScreen: false,
    isShowModalRegisterAp: false,
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
});