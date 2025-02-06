export interface AppSliceType {
    isLoadingFullScreen: boolean;
    setIsLoadingFullScreen: (loading: boolean) => void;
}

export const createAppSlice = (set: any): AppSliceType => ({
    isLoadingFullScreen: false,
    setIsLoadingFullScreen: (loading: boolean) =>
        set((state: AppSliceType) => ({
            ...state,
            isLoadingFullScreen: loading,
        })
    )
});