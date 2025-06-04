import { Icon } from "@iconify/react"
import { useGetDocumentPublicDetail } from "apiRequest/document"
import { useGetNotificationDetail } from "apiRequest/notification"
import images from "assets/images"
import { EmptyData } from "components/data"
import FileSummaryItem from "components/document/FileSummaryItem"
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { openUrlInWebview } from "services/zalo"
import { formatDate } from "utils/date"
import { getFullImageUrl, isImage } from "utils/file"
import { Box, Page } from "zmp-ui"

interface FieldTextDisplayProps {
    label: string;
    content?: string | null;
}

const FieldTextDisplay: React.FC<FieldTextDisplayProps> = ({ label, content }) => {
    return (
        <div className="font-medium border-b-[1px] pb-3 mt-3">
            <div className="text-[15px] text-gray-color mb-[1px]">{label}</div>
            <div className="text-[16px] leading-[24px]">
                {content || "-"}
            </div>
        </div>
    );
};


const NotificationDetailPage: React.FC = () => {


    const [searchParams] = useSearchParams();

    const thongBaoId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetNotificationDetail(Number(thongBaoId));

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết thông báo" />
                <Box>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box px={4}>
                                    <div className="flex items-start gap-2 border-b-[1px] pb-4">
                                        <span className="title-page">
                                          <Icon icon='emojione-v1:speaker-high-volume' className="inline-block mb-1" /> Thông báo: {detailData?.tieuDe}
                                        </span>
                                    </div>
                                    <FieldTextDisplay
                                        label="Nội dung"
                                        content={detailData?.noiDung}
                                    />
                                    <FieldTextDisplay
                                        label="Nơi nhận thông báo"
                                        content=
                                        {[detailData?.diaChi, detailData?.tenAp, detailData?.tenXa, detailData?.tenHuyen, detailData?.tenTinh].filter(Boolean).join(', ')}
                                    />
                                    <FieldTextDisplay
                                        label="Người tạo"
                                        content={detailData?.hoTenNguoiTao}
                                    />
                                </Box>
                                :
                                <EmptyData title="Không tìm thấy thông báo" />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default NotificationDetailPage