import { Icon } from "@iconify/react";
import { Divider } from "components/divider";
import { HeaderSub } from "components/header-sub"
import { Feedback, FEEDBACKDATA } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { openUrlInWebview } from "services/zalo";
import { Box, Page, Swiper, useNavigate, useSnackbar } from "zmp-ui"

const FeedbackDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [feedbackData, setFeedbackData] = useState<Feedback>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();

    const feedbackId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchResidentData = async () => {
            setLoading(true);
            try {
                // Giả sử API trả về thông tin thành viên
                // const response = await fetch(`/api/residents/${feedbackId}`);
                // const data = await response.json();

                const data = FEEDBACKDATA.find(resident => resident.id === Number(feedbackId))

                setFeedbackData(data)

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin thành viên. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
    }, [feedbackId]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[30px]">
            <Box>
                <HeaderSub title="Chi tiết Góp ý - Phản ánh" />
                {
                    feedbackData && !loading ?
                        <Box>
                            <Box>
                                <Swiper autoplay duration={8000} style={{ borderRadius: 0 }}>
                                    {
                                        feedbackData.imageUrl ?
                                            feedbackData.imageUrl.map((item, index) => (
                                                <Swiper.Slide key={index}>
                                                    <img
                                                        className="slide-img"
                                                        src={item}
                                                        alt={feedbackData.title}
                                                    />
                                                </Swiper.Slide>
                                            ))
                                            :
                                            <Swiper.Slide>
                                                <img
                                                    className="slide-img"
                                                    src="https://actiosoftware.com/wp-content/uploads/2024/02/resposta-do-smiley-do-cliente-do-feedback-da-avaliacao-1.jpg"
                                                    alt={feedbackData.title}
                                                />
                                            </Swiper.Slide>
                                    }
                                </Swiper>
                            </Box>
                            <Box p={4}>
                                <Box pb={3} mb={3} className="border-b-[1px]">
                                    <h3 className="text-[18px] leading-[22px] font-medium line-clamp-2 mb-1">{feedbackData.title}</h3>
                                    <div>{feedbackData.timestamp}</div>
                                </Box>
                                <Box py={3}>
                                    <div dangerouslySetInnerHTML={{__html: feedbackData?.content || ''}}>
                                    </div>
                                </Box>
                            </Box>
                            <Divider />
                            <Box p={4}>
                                <Box pb={3} mb={3} className="border-b-[1px]">
                                    <h3 className="text-[18px] leading-[22px] font-medium line-clamp-2 mb-1">Trung tâm điều hành trả lời</h3>
                                    <div>10/01/2025 9:00</div>
                                </Box>
                                <Box py={3}>
                                    <div className="detail-content" dangerouslySetInnerHTML={{__html: `
                                        <p>Cảm ơn anh/chị đã gửi ý kiến đóng góp về việc cần bổ sung thùng rác tại công viên để giữ gìn vệ sinh chung. Đây là một ý kiến rất thiết thực và hữu ích trong việc nâng cao chất lượng môi trường sống của khu vực chúng ta.</p>
                                        <p>Hiện tại, chúng tôi đã ghi nhận phản ánh này và sẽ nhanh chóng làm việc với các cơ quan liên quan để:</p>
                                        <ol>
                                            <li>Đánh giá tình hình hiện tại về số lượng và vị trí các thùng rác trong công viên.</li>
                                            <li>Lập kế hoạch bổ sung thêm thùng rác tại các khu vực còn thiếu.</li>
                                            <li>Triển khai giải pháp trong thời gian sớm nhất nhằm đảm bảo công viên luôn sạch đẹp và thuận tiện cho người dân.</li>
                                        </ol>
                                        <p>Chúng tôi rất mong nhận được thêm các ý kiến đóng góp từ phía anh/chị để cùng nhau xây dựng một môi trường sống văn minh và sạch đẹp hơn.</p>
                                    `}}>
                                    </div>
                                </Box>
                                <Box className="text-[blue] border-t-[1px]">
                                    <div
                                        className="border-b-[1px] py-3 flex items-center gap-1"
                                        onClick={() => openUrlInWebview('https://1022-api.tayninh.gov.vn/Upload/PhanAnh/122797/hinhanh/ 6387196537674946091205.png?typeInapp=1')}
                                    ><Icon icon='mingcute:download-line' /> Biên bản 1.png</div>
                                    <div
                                        className="border-b-[1px] py-3 flex items-center gap-1"
                                        onClick={() => openUrlInWebview('https://1022-api.tayninh.gov.vn/Upload/PhanAnh/122797/hinhanh/ 6387196537674946091205.png?typeInapp=1')}
                                    ><Icon icon='mingcute:download-line' /> Biên bản 2.png</div>
                                </Box>
                            </Box>
                        </Box>
                        :
                        <Box>Sekeleton</Box>
                }
            </Box>
        </Page>
    )
}

export default FeedbackDetailPage