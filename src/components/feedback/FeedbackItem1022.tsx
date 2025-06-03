import { Icon } from "@iconify/react"
import images from "assets/images"
import React from "react"
import { openUrlInWebview } from "services/zalo"
import { formatDate, getHourFromDate, isExpired } from "utils/date"
import { getTinhTrangFeedback1022Color } from "utils/renderColor"
import { Box } from "zmp-ui"

const FeedbackItem1022: React.FC<any> = ({ data }) => {

    const { color, bg } = getTinhTrangFeedback1022Color(data?.tenTinhTrang);

    return (
        <Box
            // onClick={() => navigate(`/feedback-1022-detail?id=${data.phanAnh1022Id}`)}
            onClick={() => {
                openUrlInWebview(`https://1022.longan.gov.vn/vi/phan-anh-kien-nghi/tra-cuu/chi-tiet/${data.phanAnh1022Id}`)
            }}
        >
            <Box py={4} className="survey-item border-b-[1px] relative" flex alignItems="center" justifyContent="space-between">
                {
                    <div
                        className={`${color} ${bg} py-[6px] px-3 rounded-xl absolute bottom-[14px] right-[2px] font-bold text-[12px] leading-[1]`}
                    >
                        {data.tenTinhTrang}
                    </div>
                }
                <Box flex alignItems="center" className="gap-4 w-[100%]">
                    <Box>
                        <img className="w-[40px]" src={images.idea} alt={data.tieuDe} />
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-1 mb-1 ml-1">{data.tieuDe}</h3>
                            <div className="mt-1 text-gray-color font-medium flex items-center gap-1">
                                <Icon fontSize={20} icon='qlementine-icons:location-16' />
                                <div className="flex-1">
                                    <div className="line-clamp-1">
                                        {[data?.diaChi, data?.tenAp, data?.tenXa, data?.tenHuyen, data?.tenTinh].filter(Boolean).join(', ')}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-gray-color font-medium flex items-center gap-1">
                                <Icon fontSize={20} icon='lets-icons:date-range-duotone-line' />
                                <div className="flex-1">
                                    <div className="line-clamp-1">
                                        {formatDate(data?.ngayTao)} - {getHourFromDate(data?.ngayTao)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default FeedbackItem1022