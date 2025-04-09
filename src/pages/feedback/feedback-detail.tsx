import { useGetHuyenList, useGetXaList } from "apiRequest/app";
import { useGetFeebackDetail, useGetFeedbackStatus } from "apiRequest/feeback";
import { EmptyData } from "components/data";
import { Divider } from "components/divider";
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton";
import { feedbackStatusColor } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { openUrlInWebview } from "services/zalo";
import { useStoreApp } from "store/store";
import { getFullImageUrl } from "utils/file";
import { Box, Page, Swiper } from "zmp-ui"

const FeedbackDetailPage: React.FC = () => {

    const { tinhs } = useStoreApp()
    const [maTinh, setMaTinh] = useState<string | null>(null);
    const [maHuyen, setMaHuyen] = useState<string | null>(null);

    const [searchParams] = useSearchParams();

    const feedbackId = searchParams.get("id");

    const { data, isLoading } = useGetFeebackDetail(Number(feedbackId));
    const { data: feedbackStatus } = useGetFeedbackStatus();

    const status = feedbackStatus?.find(item => item.tinhTrangId === data?.tinhTrangId);
    const statusColor = feedbackStatusColor[status?.tenTinhTrang] || "var(--gray-color)";

    useEffect(() => {
        if (data) {
            setMaTinh(data.maTinh || null);
            setMaHuyen(data.maHuyen || null);
        }
    }, [data]);

    const { data: huyens } = useGetHuyenList(maTinh ?? "");
    const { data: xas } = useGetXaList(maHuyen ?? "");

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[30px]">
            <Box>
                <HeaderSub title="Chi tiết Góp ý - Phản ánh" />
                {
                    isLoading ?
                        <NewsDetailSkeleton count={1} /> :
                        data ?
                            <Box>
                                <Box px={4} className="relative">
                                    <Box pb={3} mb={3} className="border-b-[2px]">
                                        <h3 className="text-[20px] leading-[26px] font-semibold mb-2">
                                            Kiến nghị về việc:
                                        </h3>
                                        <Box className="text-gray-color font-medium">
                                            <div>Vào lúc 10:00 ngày 01/04/2025</div>
                                            <div>- tại {`${data?.diaChi || ""} 
                                                ${tinhs?.find(tinh => tinh.value === data?.maTinh)?.label || ""} 
                                                ${huyens?.find(huyen => huyen.maHuyen === data?.maHuyen)?.tenHuyen || ""} 
                                                ${xas?.find(xa => xa.maXa === data?.maXa)?.tenXa || ""}`
                                                .replace(/ ,/g, "")
                                                .trim()}
                                            </div>
                                        </Box>
                                    </Box>
                                    <Box pb={3}>
                                        <div className="text-[16px] leading-[24px] font-medium" dangerouslySetInnerHTML={{ __html: data?.noiDung || '' }}>
                                        </div>
                                    </Box>
                                </Box>
                                {/* <Box flex alignItems="center" justifyContent="flex-end">
                                    {status && (
                                        <div
                                            style={{ backgroundColor: statusColor }}
                                            className="py-2 px-4 w-fit text-white font-semibold uppercase"
                                        >
                                            {status.tenTinhTrang}
                                        </div>
                                    )}
                                </Box> */}
                                <Box>
                                    <Swiper autoplay duration={8000} style={{ borderRadius: 0 }}>
                                        {
                                            data.tapTinPhanAnhs ?
                                                data.tapTinPhanAnhs.map((item, index) => (
                                                    <Swiper.Slide key={index}>
                                                        <img
                                                            onClick={() => openUrlInWebview(getFullImageUrl(item.tapTin))}
                                                            className="slide-img object-cover w-full h-full"
                                                            src={getFullImageUrl(item.tapTin)}
                                                            alt={data?.noiDung}
                                                        />
                                                    </Swiper.Slide>
                                                ))
                                                :
                                                <Swiper.Slide>
                                                    <img
                                                        className="slide-img"
                                                        src="https://actiosoftware.com/wp-content/uploads/2024/02/resposta-do-smiley-do-cliente-do-feedback-da-avaliacao-1.jpg"
                                                        alt={data?.noiDung}
                                                    />
                                                </Swiper.Slide>
                                        }
                                    </Swiper>
                                </Box>
                                {/* <Divider /> */}
                                {/* <Box p={4}>
                                    <Box pb={3} mb={3} className="border-b-[1px]">
                                        <h3 className="text-[18px] leading-[24px] font-medium line-clamp-2 mb-1">Trung tâm điều hành trả lời</h3>
                                        <div>{responseData?.timestamp}</div>
                                    </Box>
                                    {
                                    responseData
                                        ?
                                        <Box>
                                            <Box py={3}>
                                                <div className="detail-content" dangerouslySetInnerHTML={{
                                                    __html: `
                                                ${responseData?.content}
                                            `}}>
                                                </div>
                                            </Box>
                                            {
                                                responseData.files.length > 0 &&
                                                <Box>
                                                    <Swiper autoplay duration={8000} style={{ borderRadius: 0 }}>
                                                        {
                                                            responseData.files.map((item, index) => (
                                                                <Swiper.Slide key={index}>
                                                                    <img
                                                                        onClick={() => openUrlInWebview(item)}
                                                                        className="slide-img"
                                                                        src={item}
                                                                        alt={feedbackData.title}
                                                                    />
                                                                </Swiper.Slide>
                                                            ))
                                                        }
                                                    </Swiper>
                                                </Box>
                                            }
                                        </Box>
                                        :
                                        <Box mt={10}>
                                            <Box flex justifyContent="center">
                                                <img className="w-[120px] h-auto" src={images.empty} alt="Không có dữ liệu" />
                                            </Box>
                                        </Box>
                                }
                                </Box> */}
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

export default FeedbackDetailPage