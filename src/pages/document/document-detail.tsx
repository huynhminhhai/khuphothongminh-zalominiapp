import { Icon } from "@iconify/react"
import { useGetDocumentDetail } from "apiRequest/document"
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


const DocumentDetailPage: React.FC = () => {


    const [searchParams] = useSearchParams();

    const documentId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetDocumentDetail(Number(documentId));


    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết văn bản cần biết" />
                <Box>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box px={4}>
                                    <FieldTextDisplay
                                        label="Trích yếu"
                                        content={detailData?.trichYeu}
                                    />
                                    <FieldTextDisplay
                                        label="Số ký hiệu"
                                        content={detailData?.soHieu}
                                    />
                                    <FieldTextDisplay
                                        label="Cơ quan ban hành"
                                        content={detailData?.tenCoQuanBanHanh}
                                    />
                                    <FieldTextDisplay
                                        label="Ngày ban hành"
                                        content={detailData?.ngayBanHanh ? formatDate(detailData.ngayBanHanh) : ""}
                                    />
                                    <Box mt={4}>
                                        <div className="font-medium text-[15px] text-gray-color mb-[6px]">Tập tin đính kèm</div>
                                        {detailData?.tapTinVanBans.map((item, index) => (
                                            <FileSummaryItem key={index} file={item} />
                                        ))}
                                    </Box>
                                </Box>
                                :
                                <EmptyData title="Không tìm thấy văn bản" />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default DocumentDetailPage