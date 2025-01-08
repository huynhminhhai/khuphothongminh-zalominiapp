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
        url: '/news',
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
    { value: 0, label: "Chủ hộ" },
    { value: 1, label: "Chồng" },
    { value: 2, label: "Vợ" },
    { value: 3, label: "Con" },
    { value: 4, label: "Anh/Chị ruột" },
    { value: 5, label: "Em ruột" },
    { value: 6, label: "Cháu nội" },
    { value: 7, label: "Cháu ngoại" },
]

export type ResidentType = {
    id: number;
    fullname: string;
    phoneNumber: string;
    numberCard: string;
    dateCard: string;
    gender: number;
    birthDate: string;
    nation: string;
    religion: string;
    nationality: string;
    address: string;
    relationship: number;
    residenceStatus: number;
    residenceType: number;
    status: number;
    bhyt: string;
}

export const RESIDENT: ResidentType[] = [
    {
        id: 1,
        fullname: "Huỳnh Minh Hải",
        phoneNumber: '0848551555',
        dateCard: '21/06/2022',
        numberCard: "0123456789",
        gender: 1,
        birthDate: "15/3/1995",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 0,
        residenceStatus: 0,
        residenceType: 1,
        status: 1,
        bhyt: '123'
    },
    {
        id: 2,
        fullname: "Lê Thị Hoa",
        phoneNumber: '0848551444',
        dateCard: '21/6/2022',
        numberCard: "9876543210",
        gender: 2,
        birthDate: "21/6/1998",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 2,
        residenceStatus: 0,
        residenceType: 1,
        status: 1,
        bhyt: '123ewe'
    },
    {
        id: 3,
        fullname: "Trần Quốc Bảo",
        phoneNumber: '0848551333',
        dateCard: '21/6/2022',
        numberCard: "1234567890",
        gender: 1,
        birthDate: "10/01/2020",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 3,
        residenceStatus: 2,
        residenceType: 2,
        status: 1,
        bhyt: '122323'
    },
    {
        id: 4,
        fullname: "Phạm Thị Mai",
        phoneNumber: '0848551222',
        dateCard: '21/6/2022',
        numberCard: "2345678901",
        gender: 2,
        birthDate: "12/9/2018",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 3,
        residenceStatus: 0,
        residenceType: 1,
        status: 3,
        bhyt: '123ưew'
    },
    {
        id: 5,
        fullname: "Nguyễn Văn An",
        phoneNumber: '0848551111',
        dateCard: '21/6/2022',
        numberCard: "3456789012",
        gender: 1,
        birthDate: "05/12/1994",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 4,
        residenceStatus: 0,
        residenceType: 2,
        status: 1,
        bhyt: '123sdsd'
    }
]

export const RESIDENTCRAFT: ResidentType[] = [
    {
        id: 6,
        fullname: "Huỳnh Hồng Hưng",
        phoneNumber: '',
        dateCard: '21/6/2022',
        numberCard: "2345678902",
        gender: 1,
        birthDate: "12/9/2026",
        nation: "Kinh",
        religion: "Không",
        nationality: "Việt Nam",
        address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
        relationship: 3,
        residenceStatus: 0,
        residenceType: 1,
        status: 2,
        bhyt: '123sds'
    }
]

export const RESIDENTMAIN = {
    id: 1,
    fullname: "Huỳnh Minh Hải",
    phoneNumber: '0848551555',
    dateCard: '21/6/2022',
    numberCard: "0123456789",
    gender: 1,
    birthDate: "15/3/1995",
    nation: "Kinh",
    religion: "Không",
    nationality: "Việt Nam",
    address: "Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An",
    relationship: 0,
    residenceStatus: 0,
    residenceType: 1,
    status: 1,
    bhyt: '123'
}

export type News = {
    id: number;
    title: string;             // Tiêu đề
    description: string;       // Mô tả
    content: string;           // Nội dung
    imageUrl?: string;         // Ảnh minh họa (tuỳ chọn)
    publishedDate: string;     // Ngày đăng (ISO string hoặc dạng khác)
    author: string;            // Tác giả
    views: number;             // Số lượt xem
};

export const NEWSDATA: News[] = [
    {
        id: 1,
        title: "Cải tạo đường giao thông",
        description: "Đã hoàn thành dự án nâng cấp cơ sở hạ tầng, bao gồm việc mở rộng và làm mới các tuyến đường chính.",
        content: "Dự án cải tạo đường giao thông tại đã hoàn thành sau 6 tháng thi công. Các tuyến đường chính đã được mở rộng, giúp giảm ùn tắc giao thông và tạo điều kiện thuận lợi hơn cho việc di chuyển của người dân.",
        imageUrl: "",
        publishedDate: "08/01/2025",
        author: "Phan Minh T",
        views: 1200,
    },
    {
        id: 2,
        title: "Sự kiện tổ chức tại nhà văn hóa",
        description: "Nhà văn hóa sẽ tổ chức một sự kiện văn hóa đặc biệt vào cuối tuần này.",
        imageUrl: "",
        content: "Vào cuối tuần này, nhà văn hóa sẽ tổ chức sự kiện giao lưu văn hóa với các hoạt động như hát karaoke, thi đấu thể thao và triển lãm nghệ thuật. Đây là cơ hội để cư dân khu phố giao lưu, kết nối và tham gia các hoạt động giải trí.",
        publishedDate: "07/01/2025",
        author: "Lê Thị B",
        views: 800,
    },
    {
        id: 3,
        title: "Tình hình dân số và phát triển tại khu phố",
        description: "Đã ghi nhận sự tăng trưởng đáng kể về dân số trong năm 2024. Với nhiều dự án nhà ở mới được xây dựng, khu vực này đã thu hút một lượng lớn cư dân mới, đồng thời các dịch vụ công cộng như trường học, bệnh viện cũng được nâng cấp.",
        content: "Đã ghi nhận sự tăng trưởng đáng kể về dân số trong năm 2024. Với nhiều dự án nhà ở mới được xây dựng, khu vực này đã thu hút một lượng lớn cư dân mới, đồng thời các dịch vụ công cộng như trường học, bệnh viện cũng được nâng cấp.",
        imageUrl: "",
        publishedDate: "06/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 4,
        title: "Tội phạm trộm chó đang rất manh động",
        description: "Đã ghi nhận sự tăng trưởng đáng kể về dân số trong năm 2024. Với nhiều dự án nhà ở mới được xây dựng, khu vực này đã thu hút một lượng lớn cư dân mới, đồng thời các dịch vụ công cộng như trường học, bệnh viện cũng được nâng cấp.",
        content: "Đã ghi nhận sự tăng trưởng đáng kể về dân số trong năm 2024. Với nhiều dự án nhà ở mới được xây dựng, khu vực này đã thu hút một lượng lớn cư dân mới, đồng thời các dịch vụ công cộng như trường học, bệnh viện cũng được nâng cấp.",
        imageUrl: "",
        publishedDate: "05/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 5,
        title: "Bệnh dịch sởi đang lây lang mạnh",
        description: "Đã ghi nhận sự tăng trưởng đáng kể về dân số trong năm 2024. Với nhiều dự án nhà ở mới được xây dựng, khu vực này đã thu hút một lượng lớn cư dân mới, đồng thời các dịch vụ công cộng như trường học, bệnh viện cũng được nâng cấp.",
        content: "Đã ghi nhận sự tăng trưởng đáng kể về dân số trong năm 2024. Với nhiều dự án nhà ở mới được xây dựng, khu vực này đã thu hút một lượng lớn cư dân mới, đồng thời các dịch vụ công cộng như trường học, bệnh viện cũng được nâng cấp.",
        imageUrl: "",
        publishedDate: "04/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    }
];