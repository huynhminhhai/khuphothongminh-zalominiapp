import images from "assets/images";

export type StatisticsType = {
    label: string;
    value: string;
    iconUrl?: string;
    color: string;
}

export const STATISTICS: StatisticsType[] = [
    {
        label: 'Khu phố',
        value: 'Long Bình',
        iconUrl: 'fluent:building-48-filled',
        color: '#6F42C1'
    },
    {
        label: 'Hộ dân',
        value: '26,025',
        iconUrl: 'ic:round-house',
        color: '#0056D2'
    },
]

export type ServicesType = {
    label: string;
    url: string;
    icon?: string;
}

export const SERVICES: ServicesType[] = [
    {
        label: 'Thông tin hộ dân',
        url: '/',
        icon: images.home
    },
    {
        label: 'Tin tức',
        url: '/',
        icon: images.news
    },
    {
        label: 'Góp ý kiến',
        url: '/',
        icon: images.idea
    },
    {
        label: 'Thông tin cuộc họp',
        url: '/',
        icon: images.meeting
    },
]