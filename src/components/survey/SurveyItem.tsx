import images from "assets/images"
import React from "react"
import { formatDate, isExpired } from "utils/date"
import { Box, useNavigate } from "zmp-ui"
import { SurveyDetail } from "./type"
import { Icon } from "@iconify/react"

type SurveyItemProps = {
    data: SurveyDetail
}

const SurveyItem: React.FC<SurveyItemProps> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(`/survey-detail?id=${data.khaoSatId}`)}
        >
            <Box py={4} className="survey-item border-b-[1px]" flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-6 w-[100%]">
                    <Box>
                        <img className="w-[40px]" src={images.survey} alt={data.tieuDe} />
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <h3 className="survey-title text-[16px] leading-[20px] font-semibold line-clamp-2 mb-1">{data.tieuDe}</h3>
                            <div className="flex items-center justify-between w-[100%]">
                                <h4 className="text-[14px] font-medium text-gray-color">{formatDate(data.tuNgay)} - {formatDate(data.denNgay)}</h4>
                                {
                                    isExpired(formatDate(data.denNgay)) &&
                                    <div className="text-[13px] text-red-700 font-semibold leading-[1] bg-red-50 px-4 py-[6px] rounded-xl">Đã kết thúc</div>
                                }
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SurveyItem