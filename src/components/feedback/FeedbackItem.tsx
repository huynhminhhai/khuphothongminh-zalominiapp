import { Icon } from "@iconify/react"
import { useGetHuyenList, useGetXaList } from "apiRequest/app"
import { useGetFeedbackStatus } from "apiRequest/feeback"
import { formatAddress } from "components/inforResident/ResidentInfoList"
import { Feedback, feedbackStatusColor } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { getFullImageUrl } from "utils/file"
import { Box, useNavigate } from "zmp-ui"

type FeedbackItemProps = {
    data: Feedback
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ data }) => {

    const navigate = useNavigate();

    const { tinhs } = useStoreApp()
    const [maTinh, setMaTinh] = useState<string | null>(null);
    const [maHuyen, setMaHuyen] = useState<string | null>(null);
    const { data: feedbackStatus } = useGetFeedbackStatus();

    const status = feedbackStatus?.find(item => item.tinhTrangId === data.tinhTrangId);
    const statusColor = feedbackStatusColor[status?.tenTinhTrang] || "#7c7c7c";

    useEffect(() => {
        if (data) {
            setMaTinh(data.maTinh || null);
            setMaHuyen(data.maHuyen || null);
        }
    }, [data]);

    const { data: huyens } = useGetHuyenList(maTinh ?? "");
    const { data: xas } = useGetXaList(maHuyen ?? "");

    return (
        <Box
            pb={4} mb={4} className="border-b-[1px]"
            onClick={() => navigate(`/feedback-detail?id=${data.phanAnhId}`)}
        >
            <Box className="relative rounded-lg overflow-hidden">
                <img className="w-[100%] h-[200px] object-cover" src={getFullImageUrl(data.tapTinPhanAnhs[0]?.tapTin) || 'https://actiosoftware.com/wp-content/uploads/2024/02/resposta-do-smiley-do-cliente-do-feedback-da-avaliacao-1.jpg'} alt={data.noiDung} />
                {status && (
                    <div
                        style={{ backgroundColor: statusColor }}
                        className="py-2 px-4 absolute bottom-0 right-0 text-white font-semibold uppercase"
                    >
                        {status.tenTinhTrang}
                    </div>
                )}
            </Box>
            <Box mt={2}>
                <h3 className="text-[16px] leading-[20px] font-medium line-clamp-2 mb-1">{data.noiDung}</h3>
                <div className="text-[#666666] font-medium flex items-center gap-2">
                    <Icon fontSize={24} icon='qlementine-icons:location-16' />
                    <div className="line-clamp-1">
                        {`${data?.diaChi || ""} 
                            ${tinhs?.find(tinh => tinh.value === data?.maTinh)?.label || ""} 
                            ${huyens?.find(huyen => huyen.maHuyen === data?.maHuyen)?.tenHuyen || ""} 
                            ${xas?.find(xa => xa.maXa === data?.maXa)?.tenXa || ""}`
                        .replace(/ ,/g, "")
                        .trim()}
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default FeedbackItem