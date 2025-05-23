import { Icon } from "@iconify/react"
import { useGetFeedbackStatus } from "apiRequest/feeback"
import React from "react"
import { getFullImageUrl, isImage } from "utils/file"
import { getTinhTrangFeedbackColor } from "utils/renderColor"
import { Box, useNavigate } from "zmp-ui"
import { formatDate, getHourFromDate } from "utils/date"
import images from "assets/images"

type FeedbackItemProps = {
    data: any
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ data }) => {

    const navigate = useNavigate();

    const { data: feedbackStatus } = useGetFeedbackStatus();

    const status = feedbackStatus?.tinhTrangs?.find((item: any) => item.tinhTrangId === data.tinhTrangId);
    const { color, bg } = getTinhTrangFeedbackColor(status?.tenTinhTrang);

    const imageFiles = data?.tapTinPhanAnhs?.filter(item =>
        isImage(item.tapTin)
    ) || [];

    return (
        <Box
            pb={4} mb={4} className="feedback-item border-b-[1px] relative"
            onClick={() => navigate(`/feedback-detail?id=${data.phanAnhId}`)}
        >
            {status && (
                <div
                    className={`${color} ${bg} feedback-tag py-[6px] px-3 rounded-xl absolute bottom-[14px] right-[2px] font-bold text-[12px] leading-[1]`}
                >
                    {status.tenTinhTrang}
                </div>
            )}
            <Box className="relative rounded-lg overflow-hidden">
                <img className="w-[100%] h-[200px] object-cover" src={imageFiles[0]?.tapTin ? getFullImageUrl(imageFiles[0].tapTin) : images.feedback} alt={data.noiDung} />
            </Box>
            <Box mt={2}>
                <h3 className="feedback-title text-[16px] leading-[20px] font-semibold line-clamp-2 mb-2">{data.noiDung}</h3>
                <div className="text-gray-color font-medium flex items-center gap-1">
                    <Icon fontSize={20} icon='qlementine-icons:location-16' />
                    <div className="flex-1">
                        <div className="line-clamp-1">
                            {[data?.diaChi, data?.tenAp, data?.tenXa, data?.tenHuyen, data?.tenTinh].filter(Boolean).join(', ')}
                        </div>
                    </div>
                </div>
            </Box>
            <Box mt={2} className="feeback-time">
                <div className="text-gray-color font-medium flex items-center gap-1">
                    <Icon fontSize={20} icon='lets-icons:date-range-duotone-line' />
                    <div className="flex-1">
                        <div className="line-clamp-1">
                            {formatDate(data?.ngayTao)} - {getHourFromDate(data?.ngayTao)}
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default FeedbackItem