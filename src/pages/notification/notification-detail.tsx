import { Icon } from "@iconify/react"
import { useGetNotificationDetail, useReadNotification } from "apiRequest/notification"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton"
import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
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
    const { mutate: readNotification, isPending: isReadPending } = useReadNotification();

    useEffect(() => {
        if (thongBaoId) {
            readNotification(Number(thongBaoId));
        }
    }, [thongBaoId]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết thông báo" />
                <Box pt={4}>
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