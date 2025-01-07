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
        url: '/resident',
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

export const meetingStatus: MeetingStatusType = {
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
        date: '09/07/2024',
        title: 'Họp ban hành công văn số CVS15/01072024 theo nghị quyết TWD',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 1
    },
    {
        date: '08/07/2024',
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

export type genderType = {
    [key: number]: string;
}

export const genderLabel: genderType = {
    1: 'Nam',
    2: 'Nữ'
}

export const relationships = [
    { value: 1, label: "Chồng" },
    { value: 2, label: "Vợ" },
    { value: 3, label: "Con" },
    { value: 4, label: "Anh/Chị ruột" },
    { value: 5, label: "Em ruột" },
    { value: 6, label: "Cháu nội" },
    { value: 7, label: "Cháu ngoại" },
]

export type ResidentType = {
    fullname: string;
    numberCard: string;
    gender: number;
    birthDate: string;
    nation: string;
    religion: string;
    nationality: string;
    hometown: string;
    relationship: number;
}

export const RESIDENT: ResidentType[] = [
    {
        fullname: "Huỳnh Minh Hải",
        numberCard: "0123456789",
        gender: 1,
        birthDate: "15-3-1995",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        hometown: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 0
    },
    {
        fullname: "Lê Thị Hoa",
        numberCard: "9876543210",
        gender: 2,
        birthDate: "21-6-1998",
        nation: "Kinh",
        religion: "Phật giáo",
        nationality: "Việt Nam",
        hometown: "Hải Phòng",
        relationship: 2
    },
    {
        fullname: "Trần Quốc Bảo",
        numberCard: "1234567890",
        gender: 1,
        birthDate: "10-01-2020",
        nation: "Kinh",
        religion: "Thiên Chúa giáo",
        nationality: "Việt Nam",
        hometown: "Đà Nẵng",
        relationship: 3
    },
    {
        fullname: "Phạm Thị Mai",
        numberCard: "2345678901",
        gender: 2,
        birthDate: "12-9-2018",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        hometown: "Cần Thơ",
        relationship: 3
    },
    {
        fullname: "Nguyễn Văn An",
        numberCard: "3456789012",
        gender: 1,
        birthDate: "05-12-1994",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        hometown: "Hồ Chí Minh",
        relationship: 4
    }
]

export const RESIDENTMAIN = {
    fullname: "Huỳnh Minh Hải",
    numberCard: "0123456789",
    gender: 1,
    birthDate: "15-03-1995",
    nation: "Kinh",
    religion: "Không",
    nationality: "Việt Nam",
    hometown: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
    relationship: "Chủ hộ"
}