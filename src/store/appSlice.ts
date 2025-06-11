export interface AppSliceType {
    isLoadingFullScreen: boolean;
    isShowModalRegisterAp: boolean;
    isShowModalIsComingSoon: boolean;
    isShowModalIsLogin: boolean;
    isResidentMainTab: string;
    isTrigger: boolean;
    currentPlayingVideo: HTMLVideoElement | null;
    playingVideoId: string | null;

    setIsLoadingFullScreen: (loading: boolean) => void;
    setIsResidentMainTab: (residentTab: string) => void;
    setIsShowModalRegisterAp: (show: boolean) => void;
    setIsShowModalIsComingSoon: (show: boolean) => void;
    setIsShowModalIsLogin: (show: boolean) => void;
    setIsTrigger: (show: boolean) => void;
    setCurrentPlayingVideo: (video: HTMLVideoElement | null) => void;
    setPlayingVideoId: (videoId: string | null) => void;
}

export const createAppSlice = (set: any): AppSliceType => ({
    isLoadingFullScreen: false,
    isShowModalRegisterAp: false,
    isShowModalIsComingSoon: false,
    isShowModalIsLogin: false,
    isResidentMainTab: 'residentTab',
    isTrigger: false,
    currentPlayingVideo: null,
    playingVideoId: null,
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
    setIsTrigger: (show: boolean) =>
        set((state: AppSliceType) => ({
            ...state,
            isTrigger: show,
        })
        ),
    setCurrentPlayingVideo: (video: HTMLVideoElement | null) =>
        set((state: AppSliceType) => ({
            ...state,
            currentPlayingVideo: video,
        })),
    setPlayingVideoId: (videoId: string | null) =>
        set((state: AppSliceType) => ({
            ...state,
            playingVideoId: videoId,
        })),
});