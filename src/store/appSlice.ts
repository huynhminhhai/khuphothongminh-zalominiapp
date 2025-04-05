export interface AppSliceType {
    isLoadingFullScreen: boolean;
    isResidentMainTab: string;
    setIsLoadingFullScreen: (loading: boolean) => void;
    setIsResidentMainTab: (residentTab: string) => void;
}

export const createAppSlice = (set: any): AppSliceType => ({
    isLoadingFullScreen: false,
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
});