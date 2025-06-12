import { useGetFeebackDetail, useGetFeedbackStatus } from "apiRequest/feeback";
import { EmptyData } from "components/data";
import { Divider } from "components/divider";
import { FileViewerList } from "components/file";
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton";
import React, { useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { formatDate, getHourFromDate } from "utils/date";
import { handleClickAnchorToWebview } from "utils/handleClickAnchorToWebview";
import { getTinhTrangFeedbackColor } from "utils/renderColor";
import { Box, Page, useNavigate } from "zmp-ui"

const FeedbackDetailPage: React.FC = () => {

    const contentRef = useRef<HTMLDivElement>(null);

    const [searchParams] = useSearchParams();
    const feedbackId = searchParams.get("id");

    const navigate = useNavigate();

    const { data, isLoading } = useGetFeebackDetail(Number(feedbackId));
    const { data: feedbackStatus } = useGetFeedbackStatus();

    const status = feedbackStatus?.tinhTrangs?.find(item => item.tinhTrangId === data?.tinhTrangId);
    const { color, bg } = getTinhTrangFeedbackColor(status?.tenTinhTrang);

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[30px]">
            <Box>
                <HeaderSub title="Chi tiết ý kiến" />
                <Box pt={4}>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            data ?
                                <Box>
                                    <Box px={4} className="relative">
                                        <Box pb={4} mb={4} className="border-b-[1px]">
                                            <h3 className="title-page mb-2">
                                                Nội dung ý kiến:
                                            </h3>
                                            <Box flex alignItems="center" className="font-medium gap-2">
                                                <div>Vào lúc <span className="font-semibold">{getHourFromDate(data?.ngayTao)}</span> ngày <span className="font-semibold">{formatDate(data?.ngayTao)}</span></div>
                                                {status && (
                                                    <div
                                                        className={`${color} ${bg} feedback-tag py-[6px] px-3 rounded-xl font-bold text-[12px] leading-[1] w-fit`}
                                                    >
                                                        {status.tenTinhTrang}
                                                    </div>
                                                )}
                                            </Box>
                                        </Box>
                                        <Box pb={4} mb={4} className="border-b-[1px]">
                                            <div
                                                ref={contentRef}
                                                onClick={(e) => handleClickAnchorToWebview(e as any, contentRef.current)}
                                                className="text-[14px] leading-[24px] font-medium detail-content" dangerouslySetInnerHTML={{ __html: data?.noiDung || '' }}>
                                            </div>
                                        </Box>
                                    </Box>
                                    <Box px={4} pb={4}>
                                        <FileViewerList files={data?.tapTinPhanAnhs} />
                                    </Box>
                                    {
                                        data?.ketQuaXuLyPhanAnh &&
                                        <>
                                            <Divider />
                                            <Divider />
                                            <Box pt={4} px={4} className="relative">
                                                <Box pb={2} mb={3} className="border-b-[1px]">
                                                    <h3 className="text-[17px] leading-[26px] font-semibold">
                                                        Ban điều hành Khu phố/Ấp phản hồi
                                                    </h3>
                                                    <Box my={1} className="font-medium">
                                                        <div>Vào lúc <span className="font-semibold">{getHourFromDate(data?.ngayTao)}</span> ngày <span className="font-semibold">{formatDate(data?.ngayTao)}</span></div>
                                                    </Box>
                                                </Box>
                                                <Box pb={2} className="border-b-[1px]" mb={4}>
                                                    <div
                                                        ref={contentRef}
                                                        onClick={(e) => handleClickAnchorToWebview(e as any, contentRef.current)}
                                                        className="detail-content text-[14px] leading-[24px] font-medium" dangerouslySetInnerHTML={{ __html: data?.ketQuaXuLyPhanAnh?.noiDung || '' }}>
                                                    </div>
                                                </Box>
                                                <Box className="space-y-2">
                                                    <FileViewerList files={data?.ketQuaXuLyPhanAnh?.tapTinKetQuaXuLyPhanAnhs} />
                                                </Box>
                                            </Box>
                                        </>
                                    }
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
            </Box>
        </Page>
    )
}

export default FeedbackDetailPage