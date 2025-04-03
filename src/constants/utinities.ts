export type StatisticsType = {
    label: string;
    value: string;
    iconUrl?: string;
    color: string;
}

export const STATISTICS: StatisticsType[] = [
    {
        label: 'Hộ dân',
        value: '774',
        iconUrl: 'line-md:home',
        color: '#0a7460'
    },
    {
        label: 'Nhân khẩu',
        value: '6,728',
        iconUrl: 'line-md:person',
        color: '#234ead'
    },

]

export type ServicesType = {
    label: string;
    url: string;
    icon?: string;
    isCheckLogin: boolean
}

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
    id: number;
    date: string;
    title: string;
    location: string;
    time: string;
    status: number;
}

export const MEETING: MeetingType[] = [
    {
        id: 1,
        date: '09/07/2024',
        title: 'Thảo luận triển khai kế hoạch năm học mới',
        location: 'Cổng làng',
        time: '17:30 - 19:00',
        status: 2
    },
    {
        id: 2,
        date: '09/07/2024',
        title: 'Báo cáo kết quả công tác quý II năm 2024',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 2
    },
    {
        id: 3,
        date: '08/07/2024',
        title: 'Tổ chức hội nghị chuyên đề an toàn giao thông',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 1
    },
    {
        id: 4,
        date: '07/07/2024',
        title: 'Thảo luận kế hoạch tổ chức sự kiện ngày truyền thống',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 3
    },
    {
        id: 5,
        date: '07/07/2024',
        title: 'Họp ban chấp hành công đoàn định kỳ tháng 7',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 3
    }
]


export interface TapTinPhanAnh {
    tapTinPhanAnhId: number;
    phanAnhId: number;
    tapTin: string;
}

export interface Feedback {
    phanAnhId: number;
    apId: number;
    noiDung: string;
    diaChi: string;
    maXa: string;
    maHuyen: string;
    maTinh: string;
    latitude: number;
    longitude: number;
    congKhaiThongTinCaNhan: boolean;
    congKhaiPhanAnh: boolean;
    tinhTrangId: number;
    tapTinPhanAnhs: TapTinPhanAnh[];
}

export const feedbackStatusColor = {
    "Đã xóa": "#f44336",
    "Đã xử lý": "#28a745",
    "Đang xử lý": "#FFC107",
    "Khởi tạo": "#006AF5",
}

type QuestionType = {
    questionId: number;
    type: 'text' | 'multiple-choice' | 'one-choice';
    question: string;
    options?: string[];
};

export type SurveyType = {
    id?: number;
    title: string;
    description: string;
    timestamp?: string;
    expiryDate: string;
    questions: QuestionType[];
    status?: number;
    countAnswer?: number;
}

export const SURVEYDATA: SurveyType[] = [
    {
        id: 1,
        title: "Lấy ý kiến mở rộng đường vào thôn",
        description: "Để xin ý kiến hiến đất đường vào thôn. Xin Ông/Bà/DN vui lòng chọn vào phiếu khảo sát dưới đây",
        expiryDate: '18/01/2025',
        questions: [
            {
                questionId: 1,
                type: "one-choice",
                question: "Ông/Bà có đồng ý tự nguyện hiến đất để mở rộng đường dẫn vào thôn không?",
                options: ["Đồng ý", "Không đồng ý"],
            },
            {
                questionId: 2,
                type: "one-choice",
                question: "Ông/Bà dự kiến hiến được tối đa bao nhiêu mét đất?",
                options: ["< 2 mét", "< 3 mét", "< 4 mét", "< 5 mét"],
            }, {
                questionId: 3,
                type: "one-choice",
                question: "Ông/Bà đã sinh sống trên đất và nhà ở hiện tại từ giai đoạn năm nào đến nay?",
                options: ["Trước 30/4/1975", "Từ 30/4/1975 đến năm 1994", "Từ năm 1995 đến năm 2004", "Từ năm 2005 đến nay"],
            },
        ],
        countAnswer: 4,
        status: 2
    },
    {
        id: 3,
        title: "Khảo sát thành lập tổ quyên góp từ thiện",
        description: "Chúng tôi muốn tìm kiếm các cá nhân cùng chí hướng để tham gia và đóng góp cho tổ chức từ thiện này. Vui lòng trả lời các câu hỏi dưới đây.",
        expiryDate: "30/01/2025",
        questions: [
            {
                questionId: 4,
                question: "Họ và tên của bạn là gì?",
                type: "text",
                options: []
            },
            {
                questionId: 5,
                question: "Bạn có sẵn sàng tham gia tổ chức từ thiện không?",
                type: "one-choice",
                options: ["Có", "Không"],
            },
            {
                questionId: 6,
                question: "Bạn có thể đóng góp dưới hình thức nào?",
                type: "multiple-choice",
                options: [
                    "Tiền mặt",
                    "Vật phẩm (quần áo, thực phẩm, sách vở, ...)",
                    "Thời gian và công sức (tình nguyện viên)",
                    "Khác (vui lòng ghi rõ trong mục bên dưới)",
                ],
            },
            {
                questionId: 7,
                question: "Nếu bạn có ý kiến đóng góp hoặc hình thức đóng góp khác, hãy ghi rõ:",
                type: "text",
                options: []
            },
        ],
        countAnswer: 5,
        status: 2
    },
    {
        id: 2,
        title: "Khảo sát 1",
        description: "Mô tả khảo sát",
        expiryDate: '13/01/2025',
        questions: [
            {
                questionId: 8,
                type: "text",
                question: "Câu hỏi văn bản",
                options: []
            },
            {
                questionId: 9,
                type: "multiple-choice",
                question: "Câu hỏi nhiều chọn",
                options: ["Giá vé", "Chất lượng phương tiện", "Thời gian hoạt động", "An toàn"],
            },
            {
                questionId: 10,
                type: "one-choice",
                question: "Câu hỏi một chọn",
                options: ["Có", "Không"],
            },
        ],
        countAnswer: 0,
        status: 1
    },
];

export const SURVEYRESULT = [
    {
        id: 2,
        surveyId: 3,
        answers: [
            {
                questionId: 4,
                answer: "Lê Thị B",
                type: "text",
                question: "Họ và tên của bạn là gì?"
            },
            {
                questionId: 5,
                answer: "Không",
                type: "one-choice",
                question: "Bạn có sẵn sàng tham gia tổ chức từ thiện không?",
            },
            {
                questionId: 6,
                answer: [
                    "Tiền mặt",
                    "Dịch vụ (y tế, giáo dục)",
                ],
                type: "multiple-choice",
                question: "Bạn có thể đóng góp dưới hình thức nào?",
            },
            {
                questionId: 7,
                answer: "Cần thêm thông tin về chương trình",
                type: "text",
                question: "Nếu bạn có ý kiến đóng góp hoặc hình thức đóng góp khác, hãy ghi rõ:",
            }
        ],
        userId: 102
    },
    {
        id: 3,
        surveyId: 3,
        answers: [
            {
                questionId: 4,
                answer: "Trần Minh C",
                type: "text",
                question: "Họ và tên của bạn là gì?"
            },
            {
                questionId: 5,
                answer: "Có",
                type: "one-choice",
                question: "Bạn có sẵn sàng tham gia tổ chức từ thiện không?",
            },
            {
                questionId: 6,
                answer: [
                    "Tiền mặt"
                ],
                type: "multiple-choice",
                question: "Bạn có thể đóng góp dưới hình thức nào?",
            },
            {
                questionId: 7,
                answer: "Rất ủng hộ",
                type: "text",
                question: "Nếu bạn có ý kiến đóng góp hoặc hình thức đóng góp khác, hãy ghi rõ:",
            }
        ],
        userId: 103
    },
    {
        id: 4,
        surveyId: 3,
        answers: [
            {
                questionId: 4,
                answer: "Nguyễn Thị D",
                type: "text",
                question: "Họ và tên của bạn là gì?"
            },
            {
                questionId: 5,
                answer: "Có",
                type: "one-choice",
                question: "Bạn có sẵn sàng tham gia tổ chức từ thiện không?",
            },
            {
                questionId: 6,
                answer: [
                    "Vật phẩm (sách vở)",
                    "Dịch vụ (y tế)",
                ],
                type: "multiple-choice",
                question: "Bạn có thể đóng góp dưới hình thức nào?",
            },
            {
                questionId: 7,
                answer: "Tôi không có ý kiến",
                type: "text",
                question: "Nếu bạn có ý kiến đóng góp hoặc hình thức đóng góp khác, hãy ghi rõ:",
            }
        ],
        userId: 104
    },
    {
        id: 5,
        surveyId: 3,
        answers: [
            {
                questionId: 4,
                answer: "Phạm Văn E",
                type: "text",
                question: "Họ và tên của bạn là gì?"
            },
            {
                questionId: 5,
                answer: "Không",
                type: "one-choice",
                question: "Bạn có sẵn sàng tham gia tổ chức từ thiện không?",
            },
            {
                questionId: 6,
                answer: [
                    "Tiền mặt",
                    "Vật phẩm (sách vở, quần áo)",
                ],
                type: "multiple-choice",
                question: "Bạn có thể đóng góp dưới hình thức nào?",
            },
            {
                questionId: 7,
                answer: "Sẵn sàng tham gia nếu có thêm thông tin",
                type: "text",
                question: "Nếu bạn có ý kiến đóng góp hoặc hình thức đóng góp khác, hãy ghi rõ:",
            }
        ],
        userId: 105
    },
    {
        id: 9,
        surveyId: 1,
        answers: [
            {
                questionId: 1,
                answer: "Không đồng ý",
                type: "one-choice",
                question: "Ông/Bà có đồng ý tự nguyện hiến đất để mở rộng đường dẫn vào thôn không?"
            },
            {
                questionId: 2,
                answer: "< 2 mét",
                type: "one-choice",
                question: "Ông/Bà dự kiến hiến được tối đa bao nhiêu mét đất?"
            },
            {
                questionId: 3,
                answer: "Từ năm 2005 đến nay",
                type: "one-choice",
                question: "Ông/Bà đã sinh sống trên đất và nhà ở hiện tại từ giai đoạn năm nào đến nay?"
            }
        ],
        userId: 102
    },
    {
        id: 10,
        surveyId: 1,
        answers: [
            {
                questionId: 1,
                answer: "Đồng ý",
                type: "one-choice",
                question: "Ông/Bà có đồng ý tự nguyện hiến đất để mở rộng đường dẫn vào thôn không?"
            },
            {
                questionId: 2,
                answer: "< 4 mét",
                type: "one-choice",
                question: "Ông/Bà dự kiến hiến được tối đa bao nhiêu mét đất?"
            },
            {
                questionId: 3,
                answer: "Từ 30/4/1975 đến năm 1994",
                type: "one-choice",
                question: "Ông/Bà đã sinh sống trên đất và nhà ở hiện tại từ giai đoạn năm nào đến nay?"
            }
        ],
        userId: 103
    },
    {
        id: 11,
        surveyId: 1,
        answers: [
            {
                questionId: 1,
                answer: "Đồng ý",
                type: "one-choice",
                question: "Ông/Bà có đồng ý tự nguyện hiến đất để mở rộng đường dẫn vào thôn không?"
            },
            {
                questionId: 2,
                answer: "< 3 mét",
                type: "one-choice",
                question: "Ông/Bà dự kiến hiến được tối đa bao nhiêu mét đất?"
            },
            {
                questionId: 3,
                answer: "Trước 30/4/1975",
                type: "one-choice",
                question: "Ông/Bà đã sinh sống trên đất và nhà ở hiện tại từ giai đoạn năm nào đến nay?"
            }
        ],
        userId: 104
    },
    {
        id: 12,
        surveyId: 1,
        answers: [
            {
                questionId: 1,
                answer: "Đồng ý",
                type: "one-choice",
                question: "Ông/Bà có đồng ý tự nguyện hiến đất để mở rộng đường dẫn vào thôn không?"
            },
            {
                questionId: 2,
                answer: "< 5 mét",
                type: "one-choice",
                question: "Ông/Bà dự kiến hiến được tối đa bao nhiêu mét đất?"
            },
            {
                questionId: 3,
                answer: "Từ năm 1995 đến năm 2004",
                type: "one-choice",
                question: "Ông/Bà đã sinh sống trên đất và nhà ở hiện tại từ giai đoạn năm nào đến nay?"
            }
        ],
        userId: 105
    }
];

export const RESIDENTOPTION = [
    {
        value: 1,
        label: 'Tất cả'
    },
    {
        value: 2,
        label: 'Tổ 1'
    },
    {
        value: 3,
        label: 'Tổ 2'
    },
    {
        value: 4,
        label: 'Tổ 3'
    }
]

export const STAFFOPTION = [
    {
        value: 1,
        label: 'Nguyễn Văn A',
    },
    {
        value: 2,
        label: 'Trần Thị B',
    },
    {
        value: 3,
        label: 'Lê Văn C',
    },
    {
        value: 4,
        label: 'Phạm Thị D',
    },
    {
        value: 5,
        label: 'Hoàng Văn E',
    },
    {
        value: 6,
        label: 'Vũ Thị F',
    },
    {
        value: 7,
        label: 'Đặng Văn G',
    },
    {
        value: 8,
        label: 'Ngô Thị H',
    },
    {
        value: 9,
        label: 'Bùi Văn I',
    },
    {
        value: 10,
        label: 'Phan Thị J',
    },
];

export const MEETINGDATA = [
    {
        id: 1,
        title: 'Họp tổ dân phố đầu năm',
        description: 'Thảo luận và đề xuất các kế hoạch phát triển tổ dân phố trong năm mới, bao gồm các hoạt động cải thiện cơ sở hạ tầng, nâng cao đời sống văn hóa – xã hội, đảm bảo an ninh trật tự và khuyến khích tinh thần đoàn kết trong cộng đồng. Cuộc họp sẽ là cơ hội để người dân đóng góp ý kiến, chia sẻ nguyện vọng và cùng nhau xây dựng một môi trường sống tốt đẹp hơn cho mọi người.',
        meetingDate: '01/02/2025',
        startTime: '18:00',
        endTime: '20:00',
        address: 'Nhà văn hóa tổ dân phố 5, Phường Xuân An, Thành phố Đà Lạt',
        linkOnl: 'https://zoom.us/j/123456789',
        resident: 1,
        staff: [1, 2, 3, 4, 5, 6, 7],
        status: 2
    },
    {
        id: 2,
        title: 'Họp triển khai dự án xanh',
        description: 'Cuộc họp về kế hoạch triển khai dự án trồng cây xanh tại khu vực.',
        meetingDate: '10/02/2025',
        startTime: '09:00',
        endTime: '11:00',
        address: 'Phòng họp UBND Phường Xuân An',
        linkOnl: 'https://zoom.us/j/987654321',
        resident: 1,
        staff: [1, 2],
        status: 2
    },
    {
        id: 3,
        title: 'Họp tổng kết cuối năm',
        description: 'Đánh giá các hoạt động của tổ dân phố trong năm qua.',
        meetingDate: '15/02/2025',
        startTime: '14:00',
        endTime: '16:00',
        address: 'Hội trường nhà văn hóa huyện',
        linkOnl: 'https://zoom.us/j/123987456',
        resident: 2,
        staff: [1, 2],
        status: 2
    },
    {
        id: 4,
        title: 'Họp khẩn xử lý vấn đề môi trường',
        description: 'Thảo luận về các biện pháp xử lý vấn đề rác thải trên địa bàn.',
        meetingDate: '20/02/2025',
        startTime: '15:00',
        endTime: '17:00',
        address: 'Hội trường Phòng Tài nguyên Môi trường',
        linkOnl: 'https://zoom.us/j/456123789',
        resident: 3,
        staff: [1, 2, 3],
        status: 2
    },
    {
        id: 5,
        title: 'Họp phổ biến chính sách mới',
        description: 'Triển khai và phổ biến các chính sách mới cho cư dân.',
        meetingDate: '25/2/2025',
        startTime: '10:00',
        endTime: '12:00',
        address: 'Phòng họp UBND Quận 3',
        linkOnl: 'https://zoom.us/j/654321987',
        resident: 1,
        staff: [1, 2],
        status: 2
    },
]

export type TeamType = {
    id: number;
    fullname: string;
    position: string;
    phoneNumber: string;
    email: string;
    officeAddress: string;
    gender: number;
    birthDate: string;
    avatar?: string;
    status?: number;
    start_date?: string;
    end_date?: string;
    residential_group_id: number;
}

export const TEAMDATA: TeamType[] = [
    {
        id: 1,
        fullname: "Lê Hoàng Nam",
        position: "Trưởng khu phố",
        phoneNumber: "0912345678",
        email: "lehoangnam@example.com",
        officeAddress: "Khu phố 9",
        gender: 1,
        birthDate: "15/05/1985",
        avatar: "https://i.pinimg.com/736x/c9/45/0c/c9450c1a82fbf565176588363da3fcfa.jpg",
        status: 1,
        start_date: '12/12/2024',
        end_date: '12/12/2026',
        residential_group_id: 1
    },
    {
        id: 2,
        fullname: "Nguyễn Thị Mai",
        position: "Phó khu phố",
        phoneNumber: "0987654321",
        email: "nguyenthimai@example.com",
        officeAddress: "Khu phố 9",
        gender: 2,
        birthDate: "22/8/1989",
        avatar: "https://i.pinimg.com/736x/e5/08/cf/e508cff348d68a5bd0181a06509f6cbc.jpg",
        status: 1,
        start_date: '12/12/2024',
        end_date: '12/12/2026',
        residential_group_id: 1
    },
    {
        id: 3,
        fullname: "Trần Văn Hùng",
        position: "Tổ trưởng tổ 1",
        phoneNumber: "0909123456",
        email: "tranvanhung@example.com",
        officeAddress: "Khu phố 9",
        gender: 1,
        birthDate: "10/03/1990",
        avatar: "https://approachableai.com/wp-content/uploads/2022/12/SDv2.1-Example.jpg",
        status: 1,
        start_date: '12/12/2024',
        end_date: '12/12/2026',
        residential_group_id: 1
    },
    {
        id: 4,
        fullname: "Phạm Thị Lan",
        position: "Tổ phó tổ 1",
        phoneNumber: "0933123456",
        email: "phamthilan@example.com",
        officeAddress: "Khu phố 9",
        gender: 2,
        birthDate: "01/12/1998",
        avatar: "https://i.pinimg.com/736x/76/b7/14/76b7140f632311d942c446ed5e10e34f.jpg",
        status: 1,
        start_date: '12/12/2024',
        end_date: '12/12/2026',
        residential_group_id: 1
    },
    {
        id: 5,
        fullname: "Đỗ Minh Phúc",
        position: "Tổ phó tổ 2",
        phoneNumber: "0974567890",
        email: "dominphuc@example.com",
        officeAddress: "Khu phố 9",
        gender: 1,
        birthDate: "20/07/1982",
        avatar: "https://s.abcnews.com/images/GMA/HaleyYamadaLensa-hy-abc-20221205_1670289829448_hpEmbed_1x1_992.jpg",
        status: 1,
        start_date: '12/12/2024',
        end_date: '12/12/2026',
        residential_group_id: 1
    }
];

export const RESIDENTIALGROUPDATA = [
    {
        id: 1,
        name: "Tổ 1"
    },
    {
        id: 2,
        name: "Tổ 2"
    }
]

export type TermType = {
    id: number;
    staff_id: number;
    position: string;
    start_date: string;
    end_date: string;
    isCurrent: boolean;
}

export const TERMDATA: TermType[] = [
    {
        id: 1,
        staff_id: 1,
        position: 'Trưởng khu phố',
        isCurrent: true,
        start_date: '12/12/2024',
        end_date: '12/12/2026'
    },
    {
        id: 6,
        staff_id: 1,
        position: 'Phó khu phố',
        isCurrent: false,
        start_date: '12/12/2022',
        end_date: '12/12/2024'
    },
    {
        id: 7,
        staff_id: 1,
        position: 'Tổ trưởng tổ 3',
        isCurrent: false,
        start_date: '12/12/2020',
        end_date: '12/12/2022'
    },
    {
        id: 8,
        staff_id: 1,
        position: 'Tổ phó tổ 3',
        isCurrent: false,
        start_date: '12/12/2016',
        end_date: '12/12/2020'
    },
    {
        id: 2,
        staff_id: 2,
        position: 'Phó khu phố',
        isCurrent: true,
        start_date: '12/12/2024',
        end_date: '12/12/2026',
    },
    {
        id: 3,
        staff_id: 2,
        position: 'Tổ trưởng tổ 1',
        isCurrent: false,
        start_date: '12/12/2022',
        end_date: '12/12/2024'
    },
    {
        id: 4,
        staff_id: 3,
        position: 'Tổ trưởng tổ 1',
        isCurrent: true,
        start_date: '12/12/2022',
        end_date: '12/12/2024'
    },
    {
        id: 5,
        staff_id: 4,
        position: 'Tổ phó tổ 1',
        isCurrent: true,
        start_date: '12/12/2022',
        end_date: '12/12/2024'
    },
    {
        id: 6,
        staff_id: 5,
        position: 'Tổ trưởng tổ 2',
        isCurrent: true,
        start_date: '12/12/2022',
        end_date: '12/12/2024'
    },
]

export const TASKS = [
    {
        id: 1,
        title: "Hoàn thành tài liệu mới",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        assignedTo: 9,
        dueDate: "10/02/2025",
        status: 1,
        priority: 2,
        imageUrl: ["https://cdn.thuvienphapluat.vn/phap-luat/2022/KhanhHuyen/694.jpg"],
        note: '<p>Quá trình:</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Đang thu thập dự liệu</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Đã hoàn thành 50%</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Dự kiến hoàn thành trước thời hạn</li></ol><p>Khó khăn: Chưa có</p>',
        imageReport: ['https://glints.com/vn/blog/wp-content/uploads/2022/07/mau-bien-ban-cuoc-hop-giao-ban.jpg']
    },
    {
        id: 2,
        title: "Nộp báo cáo họp 14/02/2025",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        assignedTo: 9,
        dueDate: "08/02/2025",
        status: 2,
        priority: 1,
    },
    {
        id: 3,
        title: "Chuẩn bị báo cáo tổng",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        assignedTo: 10,
        dueDate: "12/02/2025",
        status: 3,
        priority: 3,
    },
    {
        id: 4,
        title: "Nộp báo cáo họp 10/02/2025",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        assignedTo: 10,
        dueDate: "15/02/2025",
        status: 1,
        priority: 2,
    },
    {
        id: 5,
        title: "Nộp báo cáo họp 08/02/2025",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        assignedTo: 10,
        dueDate: "20/02/2025",
        status: 3,
        priority: 1,
    },
]

export const TransactionColor = {
    "Thu": "#16a34a",
    "Chi": "#dc2626"
}

export type TransactionsType = {
    thuChiId: number;
    apId: number;
    loaiGiaoDichTaiChinhId: number;
    soTien: number;
    ngayGiaoDich: string;
    noiDung: string;
    congKhai: boolean;
    hoatDong: boolean;
}

export const TRANSACTIONSDATA = [
    {
        id: 1,
        transaction_type: 1, // 1: Thu, 2: Chi
        amount: 2000000,
        description: "Thu tiền quỹ khu phố tháng 1",
        category: "Quỹ khu phố",
        transaction_date: "31/01/2025",
    },
    {
        id: 2,
        transaction_type: 2,
        amount: 500000,
        description: "Chi tiền mua dụng cụ vệ sinh công cộng",
        category: "Vệ sinh môi trường",
        transaction_date: "02/02/2025",
    },
    {
        id: 3,
        transaction_type: 1,
        amount: 1500000,
        description: "Ủng hộ từ mạnh thường quân",
        category: "Quỹ từ thiện",
        transaction_date: "05/02/2025",
    },
    {
        id: 4,
        transaction_type: 2,
        amount: 700000,
        description: "Chi tổ chức Tết Trung Thu cho trẻ em",
        category: "Hoạt động cộng đồng",
        transaction_date: "08/02/2025",
    },
    {
        id: 5,
        transaction_type: 2,
        amount: 1200000,
        description: "Chi hỗ trợ hộ gia đình khó khăn",
        category: "Hỗ trợ cư dân",
        transaction_date: "10/02/2025",
    },
    {
        id: 6,
        transaction_type: 1,
        amount: 2500000,
        description: "Thu tiền đóng góp xây dựng đường",
        category: "Công trình khu phố",
        transaction_date: "15/02/2025",
    },
]

export type reportFinanceType = {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    totalIncome: number;
    totalExpense: number;
    remainingBalance: number;
    createdBy?: number;
    description?: string;
}

export const REPORTFINANCEDATA: reportFinanceType[] = [
    {
        id: 1,
        title: "Báo cáo thu chi tháng 1/2025",
        startDate: "01/01/2025",
        endDate: "31/01/2025",
        totalIncome: 50000000,
        totalExpense: 30000000,
        remainingBalance: 20000000,
        createdBy: 101,
        description: "Báo cáo thu chi cho tháng 1 năm 2025.",
    },
    {
        id: 2,
        title: "Báo cáo thu chi tháng 2/2025",
        startDate: "01/02/2025",
        endDate: "28/02/2025",
        totalIncome: 40000000,
        totalExpense: 25000000,
        remainingBalance: 15000000,
        createdBy: 102,
        description: "Báo cáo thu chi cho tháng 2 năm 2025.",
    },
    {
        id: 3,
        title: "Báo cáo thu chi quý 1/2025",
        startDate: "01/01/2025",
        endDate: "31/03/2025",
        totalIncome: 150000000,
        totalExpense: 90000000,
        remainingBalance: 60000000,
        createdBy: 103,
        description: "Tổng hợp thu chi trong quý 1 năm 2025.",
    },
];

export type NotificationType = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    status: number;
    sendTo: number[];
}

export const NOTIFICATIONDATA: NotificationType[] = [
    {
        id: 1,
        title: "Thông báo cuộc họp",
        content: "Bạn có một cuộc họp sắp diễn ra. Hãy tham gia và kiểm tra thông tin chi tiết ngay!",
        created_at: "2025-02-05T09:00:00",
        status: 1,
        sendTo: [101]
    },
    {
        id: 2,
        title: "Xét duyệt thông tin cư dân",
        content: "Thông tin cư dân của bạn đang được xét duyệt. Vui lòng theo dõi cập nhật từ admin.",
        created_at: "2025-02-06T09:00:00",
        status: 2,
        sendTo: [101]
    },
    {
        id: 3,
        title: "Thông báo cuộc họp",
        content: "Cuộc họp sắp tới có một số thay đổi. Vui lòng kiểm tra lại lịch và thông tin cập nhật.",
        created_at: "2025-02-01T09:00:00",
        status: 1,
        sendTo: [101]
    },
    {
        id: 4,
        title: "Xét duyệt thông tin cư dân",
        content: "Thông tin cư dân của bạn đã được xét duyệt thành công. Vui lòng kiểm tra lại hồ sơ của bạn.",
        created_at: "2025-01-05T09:00:00",
        status: 2,
        sendTo: [101]
    }
]