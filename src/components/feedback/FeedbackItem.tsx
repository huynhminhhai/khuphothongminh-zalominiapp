import { Icon } from "@iconify/react"
import { useGetFeedbackStatus } from "apiRequest/feeback"
import { formatAddress } from "components/inforResident/ResidentInfoList"
import { Feedback, feedbackStatusColor } from "constants/utinities"
import React from "react"
import { getFullImageUrl } from "utils/file"
import { Box, useNavigate } from "zmp-ui"

type FeedbackItemProps = {
    data: Feedback
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({data}) => {

    const navigate = useNavigate();
    const { data: feedbackStatus } = useGetFeedbackStatus();

    const status = feedbackStatus?.find(item => item.tinhTrangId === data.tinhTrangId);
    const statusColor = feedbackStatusColor[status?.tenTinhTrang] || "#7c7c7c";

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
                <h3 className="text-[18px] leading-[24px] font-medium line-clamp-2 mb-2">{data.noiDung}</h3>
                {/* <div className="flex items-center gap-2">
                    <Icon fontSize={20} icon='qlementine-icons:location-16' />
                    <div>
                        {
                            formatAddress(data)
                        }
                    </div>
                </div> */}
            </Box>
        </Box>
    )
}

export default FeedbackItem