import { useGetFeebackDetail, useGetFeedbackStatus } from "apiRequest/feeback";
import { EmptyData } from "components/data";
import { Divider } from "components/divider";
import { FeedbackAnswerAddForm, FeedbackAnswerUpdateForm } from "components/feedback";
import { FileViewerList } from "components/file";
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton";
import React, { useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { formatDate, getHourFromDate } from "utils/date";
import { handleClickAnchorToWebview } from "utils/handleClickAnchorToWebview";
import { Box, Page, useNavigate } from "zmp-ui"

const FeedbackAnswerPage: React.FC = () => {

    const contentRef = useRef<HTMLDivElement>(null);

    const [searchParams] = useSearchParams();
    const feedbackId = searchParams.get("id");

    const navigate = useNavigate();

    const { data, isLoading } = useGetFeebackDetail(Number(feedbackId));
    const { data: feedbackStatus } = useGetFeedbackStatus();

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box pt={4}>
                <HeaderSub title="Phản hồi ý kiến" />
                {
                    isLoading ?
                        <NewsDetailSkeleton count={1} /> :
                        data ?
                            <Box>
                                <Box px={4} className="relative">
                                    <Box pb={3} mb={3} className="border-b-[1px]">
                                        <h3 className="text-[18px] leading-[26px] font-semibold mb-2">
                                            Ý kiến về: {data?.tenLinhVucPhanAnh}
                                        </h3>
                                        <Box className="font-medium">
                                            <div>Vào lúc <span className="font-semibold">{getHourFromDate(data?.ngayTao)}</span> ngày <span className="font-semibold">{formatDate(data?.ngayTao)}</span></div>
                                            <div>- tại <span className="font-semibold">
                                                {[data?.diaChi, data?.tenAp, data?.tenXa, data?.tenHuyen, data?.tenTinh].filter(Boolean).join(', ')}
                                            </span></div>
                                        </Box>
                                    </Box>
                                    <Box pb={3}>
                                        <div
                                            ref={contentRef}
                                            onClick={(e) => handleClickAnchorToWebview(e as any, contentRef.current)}
                                            className="detail-content text-[16px] leading-[24px] font-medium border-b-[1px] pb-3" dangerouslySetInnerHTML={{ __html: data?.noiDung || '' }}>
                                        </div>
                                    </Box>
                                </Box>
                                <Box px={4} pb={4}>
                                    <FileViewerList files={data?.tapTinPhanAnhs} />
                                </Box>
                                <Divider />
                                <Divider />
                                <Box p={4}>
                                    <Box pb={2}>
                                        <h3 className="text-[17px] leading-[26px] font-semibold">
                                            Ban điều hành Khu phố/Ấp phản hồi
                                        </h3>
                                    </Box>
                                    {
                                        !data?.ketQuaXuLyPhanAnh ?
                                            <FeedbackAnswerAddForm />
                                            :
                                            <FeedbackAnswerUpdateForm />
                                    }
                                </Box>
                            </Box>
                            :
                            <Box px={4} pb={10}>
                                <EmptyData
                                    title="Ý kiến không tồn tại!"
                                    desc="Không thể tìm thấy ý kiến bạn yêu cầu"
                                />
                            </Box>
                }
            </Box>
        </Page>
    )
}

export default FeedbackAnswerPage