import { Icon } from "@iconify/react"
import { useDeleteFeedback, useGetFeedbackStatus } from "apiRequest/feeback"
import React from "react"
import { getFullImageUrl, isImage } from "utils/file"
import { getTinhTrangFeedbackColor } from "utils/renderColor"
import { Box, Button, useNavigate } from "zmp-ui"
import { formatDate, getHourFromDate } from "utils/date"
import images from "assets/images"

type FeedbackItemHistoryProps = {
    data: any
}

const FeedbackItemHistory: React.FC<FeedbackItemHistoryProps> = ({ data }) => {

    const navigate = useNavigate();

    const { data: feedbackStatus } = useGetFeedbackStatus();
    const { mutate: deleteFeedback } = useDeleteFeedback();

    const status = feedbackStatus?.tinhTrangs?.find((item: any) => item.tinhTrangId === data.tinhTrangId);
    const { color, bg } = getTinhTrangFeedbackColor(status?.tenTinhTrang);

    const imageFiles = data?.tapTinPhanAnhs?.filter(item =>
        isImage(item.tapTin)
    ) || [];

    return (
        <Box
            pb={4} mb={4} className="border-b-[1px] relative"
        >
            <Box onClick={() => navigate(`/feedback-detail?id=${data.phanAnhId}`)}>
                <Box className="relative rounded-lg overflow-hidden">
                    <img className="w-[100%] h-[200px] object-cover" src={imageFiles[0]?.tapTin ? getFullImageUrl(imageFiles[0].tapTin) : images.feedback} alt={data.noiDung} />
                    {status && (
                        <div
                            className={`${color} ${bg} py-2 px-4 rounded-lg absolute bottom-[2px] right-[2px] font-bold uppercase text-[14px] leading-[1]`}
                        >
                            {status.tenTinhTrang}
                        </div>
                    )}
                </Box>
                <Box mt={2}>
                    <h3 className="text-[16px] leading-[20px] font-medium line-clamp-2 mb-2">{data.noiDung}</h3>
                    <div className="text-gray-color font-medium flex items-center gap-1">
                        <Icon fontSize={20} icon='qlementine-icons:location-16' />
                        <div className="flex-1">
                            <div className="line-clamp-1">
                                {[data?.diaChi, data?.tenAp, data?.tenXa, data?.tenHuyen, data?.tenTinh].filter(Boolean).join(', ')}
                            </div>
                        </div>
                    </div>
                </Box>
                <Box mt={2}>
                    <div className="text-gray-color font-medium flex items-center gap-1">
                        <Icon fontSize={20} icon='material-symbols-light:date-range-outline' />
                        <div className="flex-1">
                            <div className="line-clamp-1">
                                {formatDate(data?.ngayTao)} - {getHourFromDate(data?.ngayTao)}
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
            <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="secondary" size="small" fullWidth onClick={() => navigate(`/feedback-update?id=${data.phanAnhId}`)}>
                    <div className="flex items-center justify-center gap-1 font-semibold">
                        Cập nhật
                    </div>
                </Button>
                <Button className="!bg-red-100 !text-red-700" size="small" fullWidth onClick={() => deleteFeedback(data.phanAnhId)}>
                    <div className="flex items-center justify-center gap-1 font-semibold">
                        Xóa
                    </div>
                </Button>
            </div>
        </Box>
    )
}

export default FeedbackItemHistory