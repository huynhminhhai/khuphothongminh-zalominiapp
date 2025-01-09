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
        url: '/',
        icon: images.idea
    },
    {
        label: 'Thông tin cuộc họp',
        url: '/meeting',
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
        title: "Cho trẻ làm quen với tiếng Anh",
        description: "Lứa tuổi mầm non là giai đoạn vàng để trẻ tiếp cận và làm quen với ngôn ngữ mới. Do vậy, một số trường mầm non trên địa bàn tỉnh Long An tổ chức cho trẻ làm quen với tiếng Anh, được phụ huynh ủng hộ và mang lại hiệu quả tích cực.",
        content: `
            <p style="text-align: center;"><span><img title="Cho trẻ làm quen với tiếng Anh" data-socail-link="https://baolongan.vn/cho-tre-lam-quen-voi-tieng-anh-a188491.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250108/images/36_72129891_gia-o-vie-n-a-p-du-ng-nhie-u-phu-o-ng-pha-p-gia-ng-da-y-mo-i-de-ta-o-hu-ng-thu-cho-tre-.jpg" style="width: 500px; height: 282px; cursor: pointer;" data-pos="0"></span><em style="font-size: small; color: rgb(128, 128, 128); float: left; margin: auto; width: 100%; display: inline !important;">Giáo viên áp dụng nhiều phương pháp giảng dạy mới để tạo hứng thú cho trẻ</em></p>

            <p><strong>Cho trẻ tiếp cận tiếng Anh</strong></p>

            <p>Với sự hiếu kỳ, nhạy bén và khả năng tiếp thu nhanh chóng, trẻ ở độ tuổi 4-5 và 5-6 tuổi có thể xây dựng nền tảng về tiếng Anh, góp phần phát triển toàn diện các <a href="https://baolongan.vn/trang-bi-ky-nang-song-cho-hoc-sinh-a186970.html" target="_blank"><span style="color:#0000FF;">kỹ năng giao tiếp</span></a>, tư duy và xã hội. Cho trẻ làm quen với tiếng Anh được ngành Giáo dục và Đào tạo cũng như xã hội quan tâm.</p>

            <p>Hiện nay, việc tổ chức cho trẻ làm quen với tiếng Anh là hoạt động ngoại khóa, tự nguyện tham gia, được một số trường mầm non trên địa bàn tỉnh thực hiện mang lại hiệu quả và ngày càng có xu hướng nhân rộng. Đây là hoạt động góp phần định hướng cho công tác giáo dục sớm, giúp trẻ có bước khởi đầu thuận lợi trong việc học ngôn ngữ thứ hai.</p>

            <p>Trường Mầm non Huỳnh Thị Mai&nbsp;(TP.Tân An) tổ chức cho trẻ làm quen với tiếng Anh đến nay là năm thứ 4 với sự tham gia của hơn 60% trẻ toàn trường, gồm độ tuổi 3-4 tuổi, 4-5 tuổi và 5-6 tuổi. Tham gia làm quen với tiếng Anh, trẻ học trong giờ ngoại khóa với 2 tiết/tuần.</p>


            <p>Hiệu trưởng Trường Mầm non Huỳnh Thị Mai - Nguyễn Thị Mai Trinh cho biết: “Cho trẻ làm quen với tiếng Anh là nhu cầu thực tế từ xã hội hiện đại cũng như của phụ huynh. Do vậy, hoạt động này của trường diễn ra thuận lợi, được phụ huynh ủng hộ. Qua hoạt động này, trẻ được tiếp cận sớm với tiếng Anh, giúp phát triển ngôn ngữ, phát huy khả năng tiếp thu,<br>
            ghi nhớ”.</p>

            <p style="text-align: center;"><span><img title="Cho trẻ làm quen với tiếng Anh" data-socail-link="https://baolongan.vn/cho-tre-lam-quen-voi-tieng-anh-a188491.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250108/images/36_727698_tre-nha-n-bie-t-tu-vu-ng-va-no-i-tie-ng-anh.jpg" style="width: 500px; height: 375px; cursor: pointer;" data-pos="1"></span><em style="font-size: small; color: rgb(128, 128, 128); float: left; margin: auto; width: 100%; display: inline !important;">Trẻ nhận biết từ vựng và nói tiếng Anh</em></p>

            <p>Trường Mầm non Hoa Hồng (huyện Đức Huệ) tổ chức cho trẻ làm quen với tiếng Anh từ đầu năm học này vào các buổi chiều sau khi kết thúc hoạt động chính khóa. Hiệu trưởng Trường Mầm non Hoa Hồng - Nguyễn Thị Thu Cúc thông tin: “Đây là hoạt động mới giúp trẻ được giao tiếp bằng 2 thứ tiếng. Trẻ vừa học, vừa được thao tác bằng các trò chơi nên rất hứng thú tham gia các hoạt động do giáo viên (GV) tổ chức. Từ đó, trẻ phát triển ngôn ngữ tự nhiên, kích thích tư duy phát triển ngày càng linh hoạt, xử lý nhiều tình huống trong khoảng thời gian ngắn, mở ra nhiều hướng suy nghĩ và tăng khả năng giải quyết vấn đề. Đặc biệt, với địa bàn vùng sâu, hoạt động này càng nhận được sự ủng hộ của nhiều phụ huynh. Tiếng Anh là phương tiện ngôn ngữ&nbsp;hữu ích nên chú trọng cho trẻ làm quen để&nbsp;dễ dàng tiếp thu những kiến thức mới một cách tự nhiên”.</p>

            <p>Phụ huynh của trẻ đang học tiếng Anh ở Trường Mầm non Hoa Hồng, chị Nguyễn Thị Cẩm Nhung chia sẻ: “Với tôi, cho trẻ làm quen với tiếng Anh là rất cần thiết và phù hợp. Việc sắp xếp thời gian,&nbsp;thời lượng học tiếng Anh hợp lý, không cắt xén chương trình; dựa trên tinh thần tự nguyện; mức học phí phù hợp (125.000 đồng/trẻ/ tháng). Mặt khác, ở cấp tiểu học, tiếng Anh đưa vào chương trình giảng dạy lớp 1 nên tôi mong muốn con sớm được tiếp cận với tiếng Anh để không bỡ ngỡ. Sau khi con học tiếng Anh ở trường, tôi nhận thấy ở nhà, con thích sử dụng một vài từ tiếng Anh thông dụng trong giao tiếp như xin chào,&nbsp;cảm ơn, xin lỗi, tập đếm số bằng tiếng Anh,&nbsp;nói một số từ chỉ màu sắc, tên gọi,... bằng tiếng Anh. Mỗi ngày, con biết thêm một vài từ mới để giao tiếp với cả nhà nên rất thích đi học và ngày càng mạnh dạn, tự tin trong giao tiếp”.</p>

            <p><strong>Tạo hứng thú cho trẻ</strong></p>

            <p>Để đạt hiệu quả trong việc cho trẻ làm quen với tiếng Anh, các trường quan tâm tạo điều kiện về cơ sở vật chất cũng như theo sát GV để tiết học sinh động, tạo hứng thú cho trẻ. Theo đó, 100% các phòng học của Trường Mầm non Huỳnh Thị Mai đều có tivi kết nối Internet, tạo điều kiện cho GV ứng dụng công nghệ thông tin trong quá trình dạy. Ngoài ra, trường quan sát, theo sát quá trình dạy học của GV; mời phụ huynh đến tham quan tiết học, tham gia sinh hoạt cụm chuyên môn về cho trẻ làm quen với tiếng Anh để <a href="https://baolongan.vn/nang-cao-chat-luong-day-mon-tieng-anh-a184971.html" target="_blank"><span style="color:#0000FF;">nâng cao chất lượng dạy học</span></a>; khảo sát kết quả học tập cuối năm và có khen thưởng để khích lệ tinh thần học tập của trẻ;...</p>

            <p style="text-align: center;"><span><img title="Cho trẻ làm quen với tiếng Anh" data-socail-link="https://baolongan.vn/cho-tre-lam-quen-voi-tieng-anh-a188491.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250108/images/36_12266539_tre-hu-ng-thu-tro-ng-tie-t-ho-c-tie-ng-anh.jpg" style="width: 500px; height: 334px; cursor: pointer;" data-pos="2"></span><em style="font-size: small; color: rgb(128, 128, 128); float: left; margin: auto; width: 100%; display: inline !important;">Trẻ hứng thú&nbsp;trong tiết học&nbsp;tiếng Anh</em></p>

            <p>Bên cạnh nỗ lực của trường, GV trực tiếp dạy tiếng Anh cũng không ngừng đổi mới, áp dụng phương pháp dạy hay, hiệu quả. Cô Phùng Thị Ngọc Hảo - GV dạy tiếng Anh tại Trường Mầm non Hoa Hồng, chia sẻ: "Trong quá trình dạy tiếng Anh cho trẻ, tôi sử dụng nhiều phương pháp từ hình ảnh trực quan, âm nhạc đến tương tác bằng ứng dụng công nghệ thông tin. Ngoài ra, tôi còn tổ chức các hoạt động đội, nhóm nhằm tạo không khí vui tươi, giúp trẻ hứng thú học tập và có thể phát triển tối đa khả năng".</p>

            <p>Cô Nguyễn Thị Thu Cúc thông tin thêm: “Qua hoạt động này, trẻ tự tin, nhanh nhẹn, hoạt bát; phụ huynh đồng tình ủng hộ đăng ký trên tinh thần tự nguyện, cho con đi học đều đặn, duy trì số lượng đăng ký; đặc biệt, chất lượng dạy và học của đơn vị ngày càng nâng lên”.</p>

            <p>Trường Mẫu giáo Bình An (huyện Thủ Thừa) có khoảng 70% trẻ tham gia làm quen với tiếng Anh. Trường tạo điều kiện cho GV tiếng Anh tham gia các buổi sinh hoạt chuyên đề, tập huấn,... để học hỏi kinh nghiệm từ đồng nghiệp, chuyên gia, từ đó nâng cao trình độ chuyên môn, vận dụng tốt vào thực tế giảng dạy tại đơn vị.</p>

            <p>Ngoài ra, trường còn tổ chức các hoạt động khác, lồng ghép song ngữ để trẻ có điều kiện thực hành, ôn tập cũng như phát huy khả năng nghe, nói.</p>

            <p>Có thể thấy, cho trẻ làm quen với tiếng Anh góp phần nâng cao chất lượng giảng dạy tiếng Anh trong giáo dục mầm non, đáp ứng yêu cầu ngày càng cao của xã hội hiện đại./.</p>
        `,
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
        content: `
            <p style="text-align: center;"><img alt="" src="https://www.baolongan.vn/image/news/2025/20250107/images/virus-hmpv(1).jpg" style="width: 1000px; height: 3597px;"></p>
            <p>Hiện Trung Quốc, Ấn Độ và Kazakhstan đã ghi nhận nhiều ca nhiễm virus human metapneumovirus (HMPV) gây bệnh đường hô hấp.</p>
            <p>HMPV được xác định lần đầu tiên vào năm 2001, là một bệnh nhiễm trùng đường hô hấp gây ra các triệu chứng giống cúm.</p>
            <p>Loại virus này có thể tác động đến mọi người ở mọi lứa tuổi; đặc biệt, trẻ em dưới 5 tuổi, người lớn tuổi và những người có hệ miễn dịch yếu phải đối mặt với nguy cơ cao hơn./.</p>
            <p style="text-align: right;"><strong>(TTXVN/Vietnam+)</strong></p>
            <p style="text-align: right;">Nguồn:&nbsp;https://www.vietnamplus.vn/thong-tin-moi-nhat-ve-benh-duong-ho-hap-do-virus-hmpv-post1006275.vnp</p>
        `,
        publishedDate: "07/01/2025",
        author: "Lê Thị B",
        views: 800,
    },
    {
        id: 3,
        title: "Long An: Tập trung triển khai hiệu quả quy hoạch tỉnh",
        description: "UBND tỉnh chỉ đạo các đơn vị liên quan tập trung phối hợp thực hiện có hiệu quả quy hoạch tỉnh thời kỳ 2021-2030, tầm nhìn đến năm 2050; nâng cao hiệu quả công tác lập, quản lý và triển khai thực hiện các quy hoạch theo Luật Quy hoạch.",
        content: `
            <p><a href="https://baolongan.vn/long-an-tap-trung-phoi-hop-thuc-hien-tot-cong-tac-lap-quy-hoach-ke-hoach-su-dung-dat-a187733.html" target="_blank"><span style="color:#0000CD;"><strong>Quy hoạch tỉnh Long An </strong></span></a>thời kỳ 2021-2030, tầm nhìn đến năm 2050 đã được Thủ tướng Chính phủ phê duyệt tại Quyết định số 686/QĐ-TTg, ngày 13/6/2023.</p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;"><div class="b-img-slider-jsgallery" data-pos="0"><img title="Long An: Tập trung triển khai hiệu quả quy hoạch tỉnh" data-socail-link="https://baolongan.vn/long-an-tap-trung-trien-khai-hieu-qua-quy-hoach-tinh-a188369.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250106/images/z5853771514310_4e9304e176258f21a761cb8cdb9db801.jpg" style="width: 500px; height: 282px; cursor: pointer;" data-pos="0"></div></em></p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Tỉnh Long An tập trung triển khai hiệu quả quy hoạch tỉnh (ảnh minh họa)</em></p>

            <p>Ngay sau khi quy hoạch được phê duyệt, UBND tỉnh đã ban hành nhiều văn bản, quyết định triển khai thực hiện quy hoạch tỉnh.&nbsp;Sở Kế hoạch và Đầu tư phối hợp với đơn vị tư vấn, các sở, ngành tỉnh thực hiện chuyển đổi cơ sở dữ liệu hồ sơ quy hoạch và sơ đồ, bản đồ quy hoạch tỉnh theo Thông tư số 04/2023/TT-BKHĐT, ngày 26/6/2023 của Bộ Kế hoạch và Đầu tư về hướng dẫn yêu cầu nội dung và kỹ thuật của cơ sở dữ liệu hồ sơ quy hoạch và sơ đồ, bản đồ các quy hoạch theo luật quy hoạch.</p>

            <p>Hiện Thủ tướng Chính phủ đã phê duyệt kế hoạch thực hiện quy hoạch tỉnh Long An thời kỳ 2021-2030, tầm nhìn đến năm 2050 tại Quyết định số 1003/QĐ-TTg, ngày 19/9/2024.</p>

            <p>Trong thời gian tới, UBND tỉnh tập trung <a href="https://baolongan.vn/quy-hoach-su-dung-dat-gop-phan-thuc-day-kinh-te-xa-hoi-dia-phuong-phat-trien-a113276.html" target="_blank"><span style="color:#0000CD;"><strong>nâng cao hiệu quả công tác lập, quản lý và triển khai thực hiện các quy hoạch </strong></span></a>theo Luật Quy hoạch. Trong đó, tỉnh&nbsp;thực hiện có hiệu quả quy hoạch tỉnh thời kỳ 2021-2030, tầm nhìn đến năm 2050; hoàn thành lập các quy hoạch xây dựng vùng huyện, quy hoạch xây dựng dọc các trục giao thông động lực của tỉnh; điều chỉnh, hoàn thiện các quy hoạch đô thị (đặc biệt quy hoạch đô thị Đức Hòa, Bến Lức, Cần Giuộc), quy hoạch nông thôn cho phù hợp với quy hoạch tỉnh; triển khai xây dựng các quy hoạch mang tính chất kỹ thuật, chuyên ngành để cụ thể hóa quy hoạch tỉnh.</p>

            <p>Đồng thời, tỉnh kịp thời điều chỉnh quy hoạch tỉnh cho phù hợp với quy hoạch cấp trên, tình hình thực tế của địa phương (nếu có);.../.</p>
        `,
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250106/images/z5853771514310_4e9304e176258f21a761cb8cdb9db801.jpg",
        publishedDate: "06/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 4,
        title: "Long An còn gần 2.700 hộ nghèo",
        description: "UBND tỉnh Long An đã ban hành quyết định phê duyệt hộ nghèo, hộ cận nghèo cuối năm 2024 trên địa bàn tỉnh.",
        content: `
            <p style="text-align: center;"><div class="b-img-slider-jsgallery" data-pos="0"><img title="Long An còn gần 2.700 hộ nghèo" data-socail-link="https://baolongan.vn/long-an-con-gan-2-700-ho-ngheo-a188511.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250108/images/IMG_20240129_191906(1).jpg" style="width: 500px; height: 274px; cursor: pointer;" data-pos="0"></div><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Tặng quà cho người nghèo, có hoàn cảnh khó khăn</em></p>

            <p><a href="https://baolongan.vn/toan-tinh-long-an-con-208-nha-o-tam-bo-dot-nat-a181948.html" target="_blank"><span style="color:#0000CD;"><strong>Tổng số hộ nghèo đầu năm 2024</strong></span></a> là 3.654 hộ; trong đó khu vực thành thị 571 hộ, khu vực nông thôn 3.083 hộ.</p>

            <p>Qua rà soát, tổng số hộ nghèo toàn tỉnh cuối năm 2024 chỉ còn lại 2.692 hộ (giảm 962 hộ so với đầu năm); trong đó, hộ nghèo khu vực thành thị còn 404 hộ và khu vực nông thôn còn 2.288 hộ. Tính trên tổng số 484.997 hộ dân của toàn tỉnh thì hộ nghèo còn chiếm 0,56%.</p>

            <p>Ngoài ra, qua thống kê, tổng số hộ cận nghèo toàn tỉnh vào đầu năm 2024 là 9.026 hộ; trong đó, hộ cận nghèo khu vực thành thị 1.456 hộ và khu vực nông thôn 7.570 hộ. Đến cuối 2024, tổng số hộ cận nghèo toàn tỉnh còn 7.358 hộ (giảm 1.668 hộ so với đầu năm); trong đó, hộ cận nghèo khu vực thành thị 1.257 hộ và khu vực nông thôn 6.101 hộ. Với tổng số 484.997 hộ dân toàn tỉnh thì số hộ cận nghèo hiện còn 1,52%.</p>

            <p>Trên cơ sở ban hành quyết định này, UBND tỉnh giao Sở Lao động - Thương binh và Xã hội chủ trì, phối hợp các sở, ngành liên quan, UBND các huyện, thị xã, thành phố<a href="https://baolongan.vn/da-dang-giai-phap-giam-ngheo-ben-vung-hieu-qua-a175722.html" target="_blank"><span style="color:#0000CD;"><strong> triển khai, thực hiện các chính sách hỗ trợ đối với hộ nghèo, hộ cận nghèo theo quy định</strong></span></a>. Từ đó, tạo điều kiện giúp người nghèo, người cận nghèo vươn lên, thoát nghèo bền vững, phát triển kinh tế, ổn định cuộc sống./.</p>
        `,
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250108/thumbnail/348x254/704_1736326202.jpg",
        publishedDate: "05/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    },
    {
        id: 5,
        title: "Rực rỡ ruộng lúa, bờ hoa",
        description: "Những ngày này, có một tuyến đường hoa rực sắc trên địa bàn xã An Vĩnh Ngãi, TP.Tân An, tỉnh Long An thu hút sự quan tâm của người dân địa phương và khu vực lân cận. Đây là tuyến đường thuộc mô hình Ruộng lúa, bờ hoa của Hội Nông dân xã An Vĩnh Ngãi triển khai, thực hiện, góp phần nâng cao nhận thức của người dân trong bảo vệ môi trường, chung tay thực hiện tiêu chí xã nông thôn mới kiểu mẫu.",
        content: `
            <p>Được biết, tuyến đường bêtông thực hiện mô hình Ruộng lúa, bờ hoa là đường Năm Minh, ấp Hòa Ngãi, có chiều dài khoảng 200m, khu vực trồng hoa dài khoảng 150m.</p>

            <p>Sau khi đặt mua hạt giống hoa sao nhái Thái (hoa cánh bướm), đầu tháng 11/2024, các hội viên nông dân bắt đầu gieo hạt và cùng nhau vun trồng, chăm bón. Sau khoảng 45 ngày, hoa bắt đầu nở rộ, mang đến diện mạo mới cho khu vực này.</p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;"><div class="b-img-slider-jsgallery" data-pos="0"><img title="Rực rỡ ruộng lúa, bờ hoa" data-socail-link="https://baolongan.vn/ruc-ro-ruong-lua-bo-hoa-a188469.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250107/images/2(1).jpg" style="width: 500px; height: 310px; cursor: pointer;" data-pos="0"></div></em></p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Trên tuyến đường thuộc mô hình Ruộng lúa, bờ hoa, một bên là ruộng lúa xanh mướt, một bên là hàng hoa rực rỡ</em></p>

            <p>Chủ tịch Hội Nông dân xã An Vĩnh Ngãi - Trương Thị Diệu cho biết: Không ai bảo ai, các hội viên tự giác dọn rác, bao bì thuốc bảo vệ thực vật, chung tay chăm sóc, tưới nước, nhổ cỏ, giúp hoa phát triển tốt. Chủ ruộng gần đó cũng nhiệt tình hỗ trợ chăm hoa, giúp hoa thêm đẹp lâu hơn.</p>

            <p>Sở dĩ chúng tôi chọn sao nhái Thái bởi không chỉ đẹp mà còn thu hút nhiều thiên địch, mang lợi ích cho ruộng lúa, giúp nông dân hạn chế sử dụng phân bón, thuốc hóa học, đỡ công chăm sóc và <a href="https://baolongan.vn/bao-ve-moi-truong-bang-viec-lam-thiet-thuc-a188089.html" target="_blank"><span style="color:#0000FF;">bảo vệ môi trường</span></a>.</p>

            <p>Từ khi mô hình Ruộng lúa, bờ hoa được triển khai, cảnh sắc nơi đây như khoác lên “tấm áo mới” đầy sức sống. Một bên là ruộng lúa xanh mướt mênh mông, một bên là hàng hoa rực rỡ tạo nên bức tranh nông thôn xinh đẹp. Lúc sáng sớm hay buổi chiều mát mẻ, nhiều người thường đến đây tản bộ, chụp ảnh hay đơn giản là hít thở không khí trong lành, tận hưởng vẻ đẹp thanh bình của quê hương.</p>

            <p>Chị Nguyễn Thị Ngọc Sương - người dân ấp Hòa Ngãi, xã An Vĩnh Ngãi, chia sẻ: "Từ khi có tuyến đường hoa, chiều nào gia đình tôi cũng ra đây dạo chơi và chụp ảnh. Chẳng cần đi đâu xa, tôi cũng có thể check-in khung cảnh tuyệt đẹp ngay gần nhà. Khi đăng ảnh lên mạng, bạn bè tôi đều trầm trồ hỏi thăm và muốn được đến tham quan con đường này".</p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;"><div class="b-img-slider-jsgallery" data-pos="1"><img title="Rực rỡ ruộng lúa, bờ hoa" data-socail-link="https://baolongan.vn/ruc-ro-ruong-lua-bo-hoa-a188469.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250107/images/5(1).jpg" style="width: 500px; height: 291px; cursor: pointer;" data-pos="1"></div></em></p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Từ khi mô hình Ruộng lúa, bờ hoa được triển khai, cảnh sắc nơi đây như khoác lên “tấm áo mới” đầy sức sống</em></p>

            <p>Hiện nay, Hội Nông dân xã tiếp tục ươm hoa hướng dương để trồng xen kẽ với hoa sao nhái Thái, tạo thêm sự đa dạng về màu sắc, hứa hẹn mang đến một tuyến đường hoa ngày càng rực rỡ, tạo điểm nhấn nổi bật, góp phần làm đẹp <a href="https://baolongan.vn/vung-que-sang-xanh-sach-dep-an-toan-a186491.html" target="_blank"><span style="color:#0000FF;">cảnh quan nông thôn</span></a>.</p>

            <p>Bí thư Chi đoàn ấp Hòa Ngãi, xã An Vĩnh Ngãi - Nguyễn Hữu Trọng cho biết: “Nhà tôi ở gần tuyến đường này nên thường xuyên vận động người dân, đoàn viên, thanh niên ấp nâng cao ý thức bảo vệ môi trường, giữ cho tuyến đường hoa sạch, đẹp”.</p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;"><div class="b-img-slider-jsgallery" data-pos="2"><img title="Rực rỡ ruộng lúa, bờ hoa" data-socail-link="https://baolongan.vn/ruc-ro-ruong-lua-bo-hoa-a188469.html" class="zoomimg i-img-slider-jsgallery" alt="" src="https://www.baolongan.vn/image/news/2025/20250107/images/1(1).jpg" style="width: 500px; height: 307px; cursor: pointer;" data-pos="2"></div></em></p>

            <p><em style="color:#808080;float:left;font-size:small;margin-bottom:5px;margin:auto;text-align:center;width:100%;">Người dân check-in tại tuyến đường hoa</em></p>

            <p>Tuyến đường hoa của Hội Nông dân xã An Vĩnh Ngãi không chỉ góp phần làm đẹp cảnh quan mà còn gắn kết cộng đồng, nâng cao đời sống tinh thần cho người dân./.</p>
        `,
        imageUrl: "https://www.baolongan.vn/image/news/2025/20250107/thumbnail/348x254/682_1736264791.jpg",
        publishedDate: "04/01/2025",
        author: "Trần Quốc D",
        views: 1500,
    }
];