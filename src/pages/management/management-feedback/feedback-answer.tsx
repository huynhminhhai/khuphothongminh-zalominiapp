import { useGetFeebackDetail, useGetFeedbackStatus } from "apiRequest/feeback";
import { EmptyData } from "components/data";
import { Divider } from "components/divider";
import { FeedbackAnswerAddForm } from "components/feedback";
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton";
import React from "react"
import { useSearchParams } from "react-router-dom";
import { openUrlInWebview } from "services/zalo";
import { formatDate, getHourFromDate } from "utils/date";
import { getFullImageUrl, isImage } from "utils/file";
import { Box, Page, Swiper, useNavigate, useSnackbar } from "zmp-ui"

const FeedbackAnswerPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const feedbackId = searchParams.get("id");

    const navigate = useNavigate();

    const { data, isLoading } = useGetFeebackDetail(Number(feedbackId));
    const { data: feedbackStatus } = useGetFeedbackStatus();

    const imageFiles = data?.tapTinPhanAnhs?.filter(item =>
        isImage(item.tapTin)
    ) || [];

    const otherFiles = data?.tapTinPhanAnhs?.filter(item =>
        !isImage(item.tapTin)
    ) || [];

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Phản hồi phản ánh" />
                {
                    isLoading ?
                        <NewsDetailSkeleton count={1} /> :
                        data ?
                            <Box>
                                <Box px={4} className="relative">
                                    <Box pb={3} mb={3} className="border-b-[2px]">
                                        <h3 className="text-[18px] leading-[26px] font-semibold mb-2">
                                            Kiến nghị về: {data?.tenLinhVucPhanAnh}
                                        </h3>
                                        <Box className="text-gray-color font-medium">
                                            <div>Vào lúc <span className="font-semibold">{getHourFromDate(data?.ngayTao)}</span> ngày <span className="font-semibold">{formatDate(data?.ngayTao)}</span></div>
                                            <div>- tại <span className="font-semibold">
                                                {[data?.diaChi, data?.tenAp, data?.tenXa, data?.tenHuyen, data?.tenTinh].filter(Boolean).join(', ')}
                                            </span></div>
                                        </Box>
                                    </Box>
                                    <Box pb={3}>
                                        <div className="text-[16px] leading-[24px] font-medium" dangerouslySetInnerHTML={{ __html: data?.noiDung || '' }}>
                                        </div>
                                    </Box>
                                </Box>
                                <Box px={4} pb={4}>
                                    {imageFiles.length > 0 && (
                                        <Swiper autoplay duration={8000} style={{ borderRadius: 0 }}>
                                            {imageFiles.map((item, index) => (
                                                <Swiper.Slide key={index}>
                                                    <img
                                                        onClick={() => openUrlInWebview(getFullImageUrl(item.tapTin))}
                                                        className="slide-img object-cover w-full h-full"
                                                        src={getFullImageUrl(item.tapTin)}
                                                        alt={data?.noiDung || `Hình ảnh ${index + 1}`}
                                                    />
                                                </Swiper.Slide>
                                            ))}
                                        </Swiper>
                                    )}

                                    {otherFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h4 className="font-semibold">Tập tin đính kèm:</h4>
                                            <ul className="list-disc pl-5 text-sm text-blue-600">
                                                {otherFiles.map((item, index) => (
                                                    <li key={index}>
                                                        <button
                                                            onClick={() => openUrlInWebview(getFullImageUrl(item.tapTin))}
                                                            className="hover:underline"
                                                        >
                                                            📄 {item.tenTapTin || `Tập tin ${index + 1}`}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </Box>
                                <Divider />
                                <Divider />
                                <Divider />
                                <Box p={4}>
                                    <Box pb={4}>
                                        <h3 className="text-[18px] leading-[26px] font-semibold">
                                            Ban quản trị ấp trả lời
                                        </h3>
                                    </Box>
                                    {
                                        !data?.ketQuaXuLyPhanAnh ?
                                            <FeedbackAnswerAddForm />
                                            :
                                            <>Cập nhật</>
                                    }
                                </Box>
                            </Box>
                            :
                            <Box px={4} pb={10}>
                                <EmptyData
                                    title="Phản ánh không tồn tại!"
                                    desc="Không thể tìm thấy phản ánh bạn yêu cầu"
                                />
                            </Box>
                }
            </Box>
        </Page>
    )
}

export default FeedbackAnswerPage