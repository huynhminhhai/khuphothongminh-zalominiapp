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
        value: '9',
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
        url: '/feedback',
        icon: images.idea
    },
    {
        label: 'Thông tin cuộc họp',
        url: '/meeting',
        icon: images.meeting
    },
    {
        label: 'Khảo sát ý kiến',
        url: '/survey',
        icon: images.survey
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
        location: 'Cổng làng',
        time: '17:30 - 19:00',
        status: 2
    },
    {
        date: '09/07/2024',
        title: 'Họp ban hành công văn số CVS15/01072024 theo nghị quyết TWD',
        location: 'Phòng họp số 1',
        time: '08:30 - 10:00',
        status: 2
    },
    {
        date: '08/07/2024',
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
        status: 3
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
        residenceStatus: 1,
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
        residenceStatus: 1,
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
        residenceStatus: 1,
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
        residenceStatus: 1,
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
        title: "Cho trẻ làm quen với tiếng Anh",
        description: "Lứa tuổi mầm non là giai đoạn vàng để trẻ tiếp cận và làm quen với ngôn ngữ mới. Do vậy, một số trường mầm non trên địa bàn tỉnh Long An tổ chức cho trẻ làm quen với tiếng Anh, được phụ huynh ủng hộ và mang lại hiệu quả tích cực.",
        content: '<p>Bên cạnh nỗ lực của trường, GV trực tiếp dạy tiếng Anh cũng không ngừng đổi mới, áp dụng phương pháp dạy hay, hiệu quả. Cô Phùng Thị Ngọc Hảo - GV dạy tiếng Anh tại Trường Mầm non Hoa Hồng, chia sẻ: "Trong quá trình dạy tiếng Anh cho trẻ, tôi sử dụng nhiều phương pháp từ hình ảnh trực quan, âm nhạc đến tương tác bằng ứng dụng công nghệ thông tin. Ngoài ra, tôi còn tổ chức các hoạt động đội, nhóm nhằm tạo không khí vui tươi, giúp trẻ hứng thú học tập và có thể phát triển tối đa khả năng".</p><p>Cô Nguyễn Thị Thu Cúc thông tin thêm: “Qua hoạt động này, trẻ tự tin, nhanh nhẹn, hoạt bát; phụ huynh đồng tình ủng hộ đăng ký trên tinh thần tự nguyện, cho con đi học đều đặn, duy trì số lượng đăng ký; đặc biệt, chất lượng dạy và học của đơn vị ngày càng nâng lên”.</p><p>Trường Mẫu giáo Bình An (huyện Thủ Thừa) có khoảng 70% trẻ tham gia làm quen với tiếng Anh. Trường tạo điều kiện cho GV tiếng Anh tham gia các buổi sinh hoạt chuyên đề, tập huấn,... để học hỏi kinh nghiệm từ đồng nghiệp, chuyên gia, từ đó nâng cao trình độ chuyên môn, vận dụng tốt vào thực tế giảng dạy tại đơn vị.</p><p>Ngoài ra, trường còn tổ chức các hoạt động khác, lồng ghép song ngữ để trẻ có điều kiện thực hành, ôn tập cũng như phát huy khả năng nghe, nói.</p><p>Có thể thấy, cho trẻ làm quen với tiếng Anh góp phần nâng cao chất lượng giảng dạy tiếng Anh trong giáo dục mầm non, đáp ứng yêu cầu ngày càng cao của xã hội hiện đại./.</p>',
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250108/thumbnail/348x254/201_1736306275.jfif",
        publishedDate: "08/01/2025",
        author: "Phan Minh T",
        views: 1200,
    },
    {
        id: 2,
        title: "Thông tin mới nhất về bệnh đường hô hấp do virus HMPV",
        description: "HMPV được xác định lần đầu tiên vào năm 2001, là một bệnh nhiễm trùng đường hô hấp gây ra các triệu chứng giống cúm, đặc biệt ảnh hưởng đến mọi lứa tuổi, đặc biệt trẻ em và người lớn tuổi.",
        imageUrl: "",
        content: '<p>Hiện Trung Quốc, Ấn Độ và Kazakhstan đã ghi nhận nhiều ca nhiễm virus human metapneumovirus (HMPV) gây bệnh đường hô hấp.</p><p>HMPV được xác định lần đầu tiên vào năm 2001, là một bệnh nhiễm trùng đường hô hấp gây ra các triệu chứng giống cúm.</p><p>Loại virus này có thể tác động đến mọi người ở mọi lứa tuổi; đặc biệt, trẻ em dưới 5 tuổi, người lớn tuổi và những người có hệ miễn dịch yếu phải đối mặt với nguy cơ cao hơn./.</p>',
        publishedDate: "07/01/2025",
        author: "Lê Thị B",
        views: 800,
    },
    {
        id: 3,
        title: "Long An: Tập trung triển khai hiệu quả quy hoạch tỉnh",
        description: "UBND tỉnh chỉ đạo các đơn vị liên quan tập trung phối hợp thực hiện có hiệu quả quy hoạch tỉnh thời kỳ 2021-2030, tầm nhìn đến năm 2050; nâng cao hiệu quả công tác lập, quản lý và triển khai thực hiện các quy hoạch theo Luật Quy hoạch.",
        content: '<p><a href="https://baolongan.vn/long-an-tap-trung-phoi-hop-thuc-hien-tot-cong-tac-lap-quy-hoach-ke-hoach-su-dung-dat-a187733.html" target="_blank"><span><strong>Quy hoạch tỉnh Long An </strong></span></a>thời kỳ 2021-2030, tầm nhìn đến năm 2050 đã được Thủ tướng Chính phủ phê duyệt tại Quyết định số 686/QĐ-TTg, ngày 13/6/2023.</p><p>Ngay sau khi quy hoạch được phê duyệt, UBND tỉnh đã ban hành nhiều văn bản, quyết định triển khai thực hiện quy hoạch tỉnh.&nbsp;Sở Kế hoạch và Đầu tư phối hợp với đơn vị tư vấn, các sở, ngành tỉnh thực hiện chuyển đổi cơ sở dữ liệu hồ sơ quy hoạch và sơ đồ, bản đồ quy hoạch tỉnh theo Thông tư số 04/2023/TT-BKHĐT, ngày 26/6/2023 của Bộ Kế hoạch và Đầu tư về hướng dẫn yêu cầu nội dung và kỹ thuật của cơ sở dữ liệu hồ sơ quy hoạch và sơ đồ, bản đồ các quy hoạch theo luật quy hoạch.</p><p>Hiện Thủ tướng Chính phủ đã phê duyệt kế hoạch thực hiện quy hoạch tỉnh Long An thời kỳ 2021-2030, tầm nhìn đến năm 2050 tại Quyết định số 1003/QĐ-TTg, ngày 19/9/2024.</p><p>Trong thời gian tới, UBND tỉnh tập trung <a href="https://baolongan.vn/quy-hoach-su-dung-dat-gop-phan-thuc-day-kinh-te-xa-hoi-dia-phuong-phat-trien-a113276.html" target="_blank"><span><strong>nâng cao hiệu quả công tác lập, quản lý và triển khai thực hiện các quy hoạch </strong></span></a>theo Luật Quy hoạch. Trong đó, tỉnh&nbsp;thực hiện có hiệu quả quy hoạch tỉnh thời kỳ 2021-2030, tầm nhìn đến năm 2050; hoàn thành lập các quy hoạch xây dựng vùng huyện, quy hoạch xây dựng dọc các trục giao thông động lực của tỉnh; điều chỉnh, hoàn thiện các quy hoạch đô thị (đặc biệt quy hoạch đô thị Đức Hòa, Bến Lức, Cần Giuộc), quy hoạch nông thôn cho phù hợp với quy hoạch tỉnh; triển khai xây dựng các quy hoạch mang tính chất kỹ thuật, chuyên ngành để cụ thể hóa quy hoạch tỉnh.</p><p>Đồng thời, tỉnh kịp thời điều chỉnh quy hoạch tỉnh cho phù hợp với quy hoạch cấp trên, tình hình thực tế của địa phương (nếu có);.../.</p>',
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250106/images/z5853771514310_4e9304e176258f21a761cb8cdb9db801.jpg",
        publishedDate: "06/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 4,
        title: "Long An còn gần 2.700 hộ nghèo",
        description: "UBND tỉnh Long An đã ban hành quyết định phê duyệt hộ nghèo, hộ cận nghèo cuối năm 2024 trên địa bàn tỉnh.",
        content: '<p style="text-align: center;"></p><p><a href="https://baolongan.vn/toan-tinh-long-an-con-208-nha-o-tam-bo-dot-nat-a181948.html" target="_blank"><span style="color:#0000CD;"><strong>Tổng số hộ nghèo đầu năm 2024</strong></span></a> là 3.654 hộ; trong đó khu vực thành thị 571 hộ, khu vực nông thôn 3.083 hộ.</p><p>Qua rà soát, tổng số hộ nghèo toàn tỉnh cuối năm 2024 chỉ còn lại 2.692 hộ (giảm 962 hộ so với đầu năm); trong đó, hộ nghèo khu vực thành thị còn 404 hộ và khu vực nông thôn còn 2.288 hộ. Tính trên tổng số 484.997 hộ dân của toàn tỉnh thì hộ nghèo còn chiếm 0,56%.</p><p>Ngoài ra, qua thống kê, tổng số hộ cận nghèo toàn tỉnh vào đầu năm 2024 là 9.026 hộ; trong đó, hộ cận nghèo khu vực thành thị 1.456 hộ và khu vực nông thôn 7.570 hộ. Đến cuối 2024, tổng số hộ cận nghèo toàn tỉnh còn 7.358 hộ (giảm 1.668 hộ so với đầu năm); trong đó, hộ cận nghèo khu vực thành thị 1.257 hộ và khu vực nông thôn 6.101 hộ. Với tổng số 484.997 hộ dân toàn tỉnh thì số hộ cận nghèo hiện còn 1,52%.</p><p>Trên cơ sở ban hành quyết định này, UBND tỉnh giao Sở Lao động - Thương binh và Xã hội chủ trì, phối hợp các sở, ngành liên quan, UBND các huyện, thị xã, thành phố<a href="https://baolongan.vn/da-dang-giai-phap-giam-ngheo-ben-vung-hieu-qua-a175722.html" target="_blank"><span style="color:#0000CD;"><strong> triển khai, thực hiện các chính sách hỗ trợ đối với hộ nghèo, hộ cận nghèo theo quy định</strong></span></a>. Từ đó, tạo điều kiện giúp người nghèo, người cận nghèo vươn lên, thoát nghèo bền vững, phát triển kinh tế, ổn định cuộc sống./.</p>',
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250108/thumbnail/348x254/704_1736326202.jpg",
        publishedDate: "05/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 5,
        title: "Rực rỡ ruộng lúa, bờ hoa",
        description: "Những ngày này, có một tuyến đường hoa rực sắc trên địa bàn xã An Vĩnh Ngãi, TP.Tân An, tỉnh Long An thu hút sự quan tâm của người dân địa phương và khu vực lân cận. Đây là tuyến đường thuộc mô hình Ruộng lúa, bờ hoa của Hội Nông dân xã An Vĩnh Ngãi triển khai, thực hiện, góp phần nâng cao nhận thức của người dân trong bảo vệ môi trường, chung tay thực hiện tiêu chí xã nông thôn mới kiểu mẫu.",
        content: '<p>Được biết, tuyến đường bêtông thực hiện mô hình Ruộng lúa, bờ hoa là đường Năm Minh, ấp Hòa Ngãi, có chiều dài khoảng 200m, khu vực trồng hoa dài khoảng 150m.</p><p>Sau khi đặt mua hạt giống hoa sao nhái Thái (hoa cánh bướm), đầu tháng 11/2024, các hội viên nông dân bắt đầu gieo hạt và cùng nhau vun trồng, chăm bón. Sau khoảng 45 ngày, hoa bắt đầu nở rộ, mang đến diện mạo mới cho khu vực này.</p><p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Trên tuyến đường thuộc mô hình Ruộng lúa, bờ hoa, một bên là ruộng lúa xanh mướt, một bên là hàng hoa rực rỡ</em></p><p>Chủ tịch Hội Nông dân xã An Vĩnh Ngãi - Trương Thị Diệu cho biết: Không ai bảo ai, các hội viên tự giác dọn rác, bao bì thuốc bảo vệ thực vật, chung tay chăm sóc, tưới nước, nhổ cỏ, giúp hoa phát triển tốt. Chủ ruộng gần đó cũng nhiệt tình hỗ trợ chăm hoa, giúp hoa thêm đẹp lâu hơn.</p><p>Từ khi mô hình Ruộng lúa, bờ hoa được triển khai, cảnh sắc nơi đây như khoác lên “tấm áo mới” đầy sức sống. Một bên là ruộng lúa xanh mướt mênh mông, một bên là hàng hoa rực rỡ tạo nên bức tranh nông thôn xinh đẹp. Lúc sáng sớm hay buổi chiều mát mẻ, nhiều người thường đến đây tản bộ, chụp ảnh hay đơn giản là hít thở không khí trong lành, tận hưởng vẻ đẹp thanh bình của quê hương.</p><p>Chị Nguyễn Thị Ngọc Sương - người dân ấp Hòa Ngãi, xã An Vĩnh Ngãi, chia sẻ: "Từ khi có tuyến đường hoa, chiều nào gia đình tôi cũng ra đây dạo chơi và chụp ảnh. Chẳng cần đi đâu xa, tôi cũng có thể check-in khung cảnh tuyệt đẹp ngay gần nhà. Khi đăng ảnh lên mạng, bạn bè tôi đều trầm trồ hỏi thăm và muốn được đến tham quan con đường này".</p><p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Từ khi mô hình Ruộng lúa, bờ hoa được triển khai, cảnh sắc nơi đây như khoác lên “tấm áo mới” đầy sức sống</em></p><p>Hiện nay, Hội Nông dân xã tiếp tục ươm hoa hướng dương để trồng xen kẽ với hoa sao nhái Thái, tạo thêm sự đa dạng về màu sắc, hứa hẹn mang đến một tuyến đường hoa ngày càng rực rỡ, tạo điểm nhấn nổi bật, góp phần làm đẹp <a href="https://baolongan.vn/vung-que-sang-xanh-sach-dep-an-toan-a186491.html" target="_blank"><span style="color:#0000FF;">cảnh quan nông thôn</span></a>.</p><p>Bí thư Chi đoàn ấp Hòa Ngãi, xã An Vĩnh Ngãi - Nguyễn Hữu Trọng cho biết: “Nhà tôi ở gần tuyến đường này nên thường xuyên vận động người dân, đoàn viên, thanh niên ấp nâng cao ý thức bảo vệ môi trường, giữ cho tuyến đường hoa sạch, đẹp”.</p><p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Người dân check-in tại tuyến đường hoa</em></p><p>Tuyến đường hoa của Hội Nông dân xã An Vĩnh Ngãi không chỉ góp phần làm đẹp cảnh quan mà còn gắn kết cộng đồng, nâng cao đời sống tinh thần cho người dân./.</p>',
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250107/thumbnail/348x254/682_1736264791.jpg",
        publishedDate: "04/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 10,
        title: "Hội thi thể thao khu phố năm 2025",
        description: "Một trong những sự kiện thể thao lớn nhất trong khu phố sẽ diễn ra vào cuối tuần này với sự tham gia của các đội thể thao từ các khu vực lân cận.",
        content: '<p>Hội thi thể thao khu phố năm 2025 sẽ bao gồm các môn thi đấu như bóng đá, bóng chuyền, và cầu lông. Đây là cơ hội để các cư dân trong khu phố giao lưu, thể hiện tài năng và xây dựng tinh thần đoàn kết.</p>',
        imageUrl: "",
        publishedDate: "10/01/2025",
        author: "Lê Minh Hải",
        views: 350,
    },
    {
        id: 11,
        title: "Lễ hội mùa xuân của khu phố",
        description: "Lễ hội mùa xuân sắp tới sẽ bao gồm các hoạt động văn hóa, ẩm thực và biểu diễn nghệ thuật. Đây là dịp để các gia đình trong khu phố quây quần bên nhau.",
        content: '<p>Lễ hội mùa xuân là sự kiện thường niên tại khu phố, với các hoạt động thú vị như thi nấu ăn, diễu hành, và các tiết mục văn nghệ. Sự kiện này luôn thu hút sự tham gia của nhiều gia đình trong khu vực.</p>',
        imageUrl: "",
        publishedDate: "12/01/2025",
        author: "Nguyễn Thị Lan",
        views: 450,
    },
    {
        id: 12,
        title: "Cải tạo công viên khu phố",
        description: "Công viên khu phố sẽ được cải tạo với nhiều tiện ích mới như khu vui chơi cho trẻ em và các khu vực thể thao ngoài trời.",
        content: '<p>Dự án cải tạo công viên khu phố đang được triển khai, hứa hẹn mang đến một không gian sống xanh và lành mạnh cho cư dân trong khu vực. Các tiện ích mới sẽ bao gồm khu vui chơi cho trẻ em, các sân thể thao, và đường đi bộ rợp bóng cây.</p>',
        imageUrl: "",
        publishedDate: "14/01/2025",
        author: "Trần Văn Bình",
        views: 500,
    },
    {
        id: 13,
        title: "Lớp học miễn phí cho người lớn tuổi trong khu phố",
        description: "Một lớp học miễn phí về kỹ năng sống và sử dụng công nghệ cho người lớn tuổi sẽ được tổ chức tại trung tâm cộng đồng khu phố.",
        content: '<p>Lớp học dành cho người lớn tuổi tại khu phố sẽ giúp các cư dân cao tuổi cải thiện kỹ năng sống và học cách sử dụng các thiết bị công nghệ thông minh. Chương trình này nhằm mục đích giúp họ tiếp cận với các tiện ích hiện đại trong đời sống hàng ngày.</p>',
        imageUrl: "",
        publishedDate: "16/01/2025",
        author: "Phạm Minh Tuấn",
        views: 550,
    },
    {
        id: 14,
        title: "Công tác bảo vệ môi trường khu phố",
        description: "Chương trình dọn dẹp khu phố và nâng cao nhận thức về bảo vệ môi trường sẽ diễn ra vào cuối tuần này.",
        content: '<p>Chương trình bảo vệ môi trường khu phố sẽ bao gồm các hoạt động dọn dẹp đường phố, thu gom rác thải và trồng cây xanh. Đây là một hoạt động ý nghĩa giúp cải thiện môi trường sống trong khu phố và nâng cao ý thức cộng đồng về bảo vệ thiên nhiên.</p>',
        imageUrl: "",
        publishedDate: "18/01/2025",
        author: "Nguyễn Minh Tâm",
        views: 600,
    }
];

export type feedbackType = {
    [key: number]: string;
}

export const feedbackStatus = [
    { value: 1, label: "Chưa đăng tải" },
    { value: 2, label: "Đã đăng tải" }
]

export type Feedback = {
    id: number;
    title: string;
    content: string;
    imageUrl?: string[];
    status: number;
    timestamp: string;
}

export const feedbackColor = {
    1: '#FFC107',
    2: '#28a745'
}

export const FEEDBACKDATA: Feedback[] = [
    {
        id: 1,
        title: "Phản ánh về việc dựng rạp đám cưới đường Phạm Hùng, phường Long Hoa, thị xã Hòa Thành",
        content: "Rạp đám cưới dựng trên vỉa hè gây cản trở giao thông và mất mỹ quan khu vực.",
        imageUrl: [
            "https://nld.mediacdn.vn/291774122806476800/2023/6/26/z4461875447574a5a34083b8d92b895cc769347040f03e-1687750514245873334494.jpg",
        ],
        status: 1, // Trạng thái đã được xử lý
        timestamp: "07/01/2025 10:14"
    },
    {
        id: 2,
        title: "Đề xuất cải thiện hệ thống đèn chiếu sáng tại khu vực chợ Long Hoa",
        content: "Hệ thống đèn chiếu sáng tại chợ Long Hoa không đủ sáng vào buổi tối, cần thay mới đèn.",
        status: 1, // Trạng thái chưa xử lý
        timestamp: "08/01/2025 14:30"
    },
    {
        id: 3,
        title: "Góp ý về việc tăng cường bảo vệ môi trường tại công viên",
        content: "Công viên cần có thêm thùng rác để giữ gìn vệ sinh chung.",
        imageUrl: [
            'https://1022-api.tayninh.gov.vn/Upload/PhanAnh/2710/hinhanh/6376124582091266512602.jpg',
            'https://1022-api.tayninh.gov.vn/Upload/PhanAnh/2710/hinhanh/6376124582091266512602.jpg',
            'https://1022-api.tayninh.gov.vn/Upload/PhanAnh/2710/hinhanh/6376124582091266512602.jpg'
        ],
        status: 2, // Trạng thái chưa xử lý
        timestamp: "09/01/2025 09:00"
    },
    {
        id: 4,
        title: "Phản ánh đèn đường chiếu sáng không hoạt động",
        content: "Dạ em xin gửi thông tin đèn đường không hoạt động đường Huỳnh Văn Thanh. Kính gửi và nhờ quý cơ quan xem xét và xử lý sớm. Vị trí đèn không hoạt động giống vị trí hình em gửi. Em xin cảm ơn",
        imageUrl: [
            'https://api.paht-phuly.vn/Upload/PhanAnh/84370/hinhanh/6384043033904145152310_0.png'
        ],
        status: 2, // Trạng thái chưa xử lý
        timestamp: "09/01/2025 09:00"
    },
    {
        id: 5,
        title: "Phản ánh đội ngũ thu gom rác",
        content: "Nhờ cơ quan quản lý Đô thị xử lý giúp. Đội ngũ thu gom rác thường xuyên không thu rác gây ô nhiễm khu vực 152 30/4 kp4 Phường 3.",
        imageUrl: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnmw5URfZVe2CIiqOPycvWoJl8BTDiy0-Qfz9hqL5cs125hTJgfsO-tv7hVE3giC3rGA&usqp=CAU'
        ],
        status: 2, // Trạng thái chưa xử lý
        timestamp: "09/01/2025 09:00"
    },
];

export type FeedbackResponse = {
    id: number;
    feedbackId: number;
    content: string;
    timestamp: string;
    files: string[];
}

export const FEEDBACKRESPONSES: FeedbackResponse[] = [
    // {
    //     id: 1,
    //     feedbackId: 1,
    //     content: "Cảm ơn bạn đã phản ánh. Chúng tôi đã xử lý và yêu cầu tháo dỡ rạp đám cưới trên vỉa hè để đảm bảo giao thông và mỹ quan khu vực.",
    //     timestamp: "07/01/2025 12:00",
    //     files: [
    //         "https://example.com/file1.jpg",
    //     ],
    // },
    // {
    //     id: 2,
    //     feedbackId: 2,
    //     content: "Chúng tôi đã ghi nhận phản ánh và sẽ tiến hành thay mới hệ thống đèn chiếu sáng tại khu vực chợ Long Hoa trong thời gian sớm nhất.",
    //     timestamp: "08/01/2025 16:00",
    //     files: [],
    // },
    {
        id: 3,
        feedbackId: 3,
        content: `
        <p>Cảm ơn anh/chị đã gửi ý kiến đóng góp về việc cần bổ sung thùng rác tại công viên để giữ gìn vệ sinh chung. Đây là một ý kiến rất thiết thực và hữu ích trong việc nâng cao chất lượng môi trường sống của khu vực chúng ta.</p>
        <p>Hiện tại, chúng tôi đã ghi nhận phản ánh này và sẽ nhanh chóng làm việc với các cơ quan liên quan để:</p>
        <ol>
            <li>Đánh giá tình hình hiện tại về số lượng và vị trí các thùng rác trong công viên.</li>
            <li>Lập kế hoạch bổ sung thêm thùng rác tại các khu vực còn thiếu.</li>
            <li>Triển khai giải pháp trong thời gian sớm nhất nhằm đảm bảo công viên luôn sạch đẹp và thuận tiện cho người dân.</li>
        </ol>
        <p>Chúng tôi rất mong nhận được thêm các ý kiến đóng góp từ phía anh/chị để cùng nhau xây dựng một môi trường sống văn minh và sạch đẹp hơn.</p>
      `,
        timestamp: "09/01/2025 10:30",
        files: [
            'https://trithucviet.net/wp-content/uploads/2019/10/ban-cam-ket-moi-nhat-729x1024.png',
        ],
    },
    {
        id: 4,
        feedbackId: 4,
        content: "Cảm ơn bạn đã phản ánh. Chúng tôi sẽ kiểm tra và sửa chữa đèn đường không hoạt động tại đường Huỳnh Văn Thanh.",
        timestamp: "09/01/2025 10:45",
        files: [
            'https://cdn1.123job.vn/123job//uploads/images/mau-bien-ban-lam-viec.jpg',
            'https://trithucviet.net/wp-content/uploads/2019/10/ban-cam-ket-moi-nhat-729x1024.png',
        ],
    },
    {
        id: 5,
        feedbackId: 5,
        content: "Chúng tôi đã tiếp nhận phản ánh về đội ngũ thu gom rác và sẽ xử lý vấn đề này trong thời gian tới.",
        timestamp: "09/01/2025 11:00",
        files: [],
    },
];

export type SurveyType = {
    id?: number;
    title: string;
    description: string;
    status?: number;
    timestamp?: string;
    expiryDate: string;
    questions: any[];
    countAnswer?: number;
}

export const SURVEYDATA: SurveyType[] = [
    {
        id: 1,
        title: "Lấy ý kiến mở rộng đường vào thôn",
        description: "Để xin ý kiến hiến đất đường vào thôn. Xin Ông/Bà/DN vui lòng chọn vào phiếu khảo sát dưới đây",
        status: 2,
        timestamp: "10/01/2025 08:00",
        expiryDate: '18/01/2025',
        questions: [
            {
                id: 1,
                type: "one-choice",
                question: "Ông/Bà có đồng ý tự nguyện hiến đất để mở rộng đường dẫn vào thôn không?",
                options: ["Đồng ý", "Không đồng ý"],
            },
            {
                id: 2,
                type: "one-choice",
                question: "Ông/Bà dự kiến hiến được tối đa bao nhiêu mét đất?",
                options: ["< 2 mét", "< 3 mét", "< 4 mét", "< 5 mét"],
            }, {
                id: 3,
                type: "one-choice",
                question: "Ông/Bà đã sinh sống trên đất và nhà ở hiện tại từ giai đoạn năm nào đến nay?",
                options: ["Trước 30/4/1975", "Từ 30/4/1975 đến năm 1994", "Từ năm 1995 đến năm 2004", "Từ năm 2005 đến nay"],
            },
        ],
        countAnswer: 0
    },
    {
        id: 3,
        title: "Khảo sát thành lập tổ quyên góp từ thiện",
        description: "Chúng tôi muốn tìm kiếm các cá nhân cùng chí hướng để tham gia và đóng góp cho tổ chức từ thiện này. Vui lòng trả lời các câu hỏi dưới đây.",
        expiryDate: "30/01/2025",
        status: 2,
        timestamp: "10/01/2025 08:00",
        questions: [
            {
                id: 1,
                question: "Họ và tên của bạn là gì?",
                type: "text",
            },
            {
                id: 2,
                question: "Bạn có sẵn sàng tham gia tổ chức từ thiện không?",
                type: "one-choice",
                options: ["Có", "Không"],
            },
            {
                id: 3,
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
                id: 4,
                question: "Nếu bạn có ý kiến đóng góp hoặc hình thức đóng góp khác, hãy ghi rõ:",
                type: "text",
            },
        ],
        countAnswer: 5
    },
    {
        id: 2,
        title: "Khảo sát 1",
        description: "Mô tả khảo sát",
        status: 1,
        timestamp: "05/01/2025 14:30",
        expiryDate: '13/01/2025',
        questions: [
            {
                id: 1,
                type: "text",
                question: "Câu hỏi văn bản",
            },
            {
                id: 2,
                type: "multiple-choice",
                question: "Câu hỏi nhiều chọn",
                options: ["Giá vé", "Chất lượng phương tiện", "Thời gian hoạt động", "An toàn"],
                answer: [],
            },
            {
                id: 3,
                type: "one-choice",
                question: "Câu hỏi một chọn",
                options: ["Có", "Không"],
            },
        ],
        countAnswer: 0
    },
];

export const SURVEYRESULT = [
    {
        id: 2,
        surveyId: 3,
        responses: [
            {
                id: 1,
                answer: "Lê Thị B",
                type: "text"
            },
            {
                id: 2,
                answer: "Không",
                type: "one-choice"
            },
            {
                id: 3,
                answer: [
                    "Tiền mặt",
                    "Dịch vụ (y tế, giáo dục)",
                ],
                type: "multiple-choice"
            },
            {
                id: 4,
                answer: "Cần thêm thông tin về chương trình",
                type: "text"
            }
        ],
        userId: 102
    },
    {
        id: 3,
        surveyId: 3,
        responses: [
            {
                id: 1,
                answer: "Trần Minh C",
                type: "text"
            },
            {
                id: 2,
                answer: "Có",
                type: "one-choice"
            },
            {
                id: 3,
                answer: [
                    "Tiền mặt",
                    "Vật phẩm (quần áo)",
                ],
                type: "multiple-choice"
            },
            {
                id: 4,
                answer: "Rất ủng hộ",
                type: "text"
            }
        ],
        userId: 103
    },
    {
        id: 4,
        surveyId: 3,
        responses: [
            {
                id: 1,
                answer: "Nguyễn Thị D",
                type: "text"
            },
            {
                id: 2,
                answer: "Có",
                type: "one-choice"
            },
            {
                id: 3,
                answer: [
                    "Vật phẩm (sách vở)",
                    "Dịch vụ (y tế)",
                ],
                type: "multiple-choice"
            },
            {
                id: 4,
                answer: "Tôi không có ý kiến",
                type: "text"
            }
        ],
        userId: 104
    },
    {
        id: 5,
        surveyId: 3,
        responses: [
            {
                id: 1,
                answer: "Phạm Văn E",
                type: "text"
            },
            {
                id: 2,
                answer: "Không",
                type: "one-choice"
            },
            {
                id: 3,
                answer: [
                    "Tiền mặt",
                    "Vật phẩm (sách vở, quần áo)",
                ],
                type: "multiple-choice"
            },
            {
                id: 4,
                answer: "Sẵn sàng tham gia nếu có thêm thông tin",
                type: "text"
            }
        ],
        userId: 105
    }
];

