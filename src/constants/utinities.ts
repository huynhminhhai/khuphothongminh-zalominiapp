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
        value: 'Mỹ Yên',
        iconUrl: 'fluent:building-48-filled',
        color: '#218838'
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

export type MeetingStatusType = {
    [key: number]: string;
}

export const meetingStatus = {
    1: "Đã diễn ra",
    2: "Sắp/Đang diễn ra",
    3: "Đã hủy"
}

export const meetingColor = {
    1: '#28a745',
    2: '#FFC107',
    3: '#DC3545'
}

export type MeetingType = {
    date: string;
    title: string;
    location: string;
    time: string;
    status: number;
}

export const MEETING: MeetingType[] = [
    {
        date: '07/07/2024',
        title: 'Họp ban hành công văn số CVS15/01072024 theo nghị quyết TWD',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 1
    },
    {
        date: '07/07/2024',
        title: 'Họp ban hành công văn số CVS15/01072024 theo nghị quyết TWD',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 2
    },
    {
        date: '07/07/2024',
        title: 'Họp ban hành công văn số CVS15/01072024 theo nghị quyết TWD',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 3
    },
]