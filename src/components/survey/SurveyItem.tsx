import images from "assets/images"
import { SurveyType } from "constants/utinities"
import React from "react"
import { useLocation } from "react-router-dom"
import { Box, useNavigate } from "zmp-ui"

type SurveyItemProps = {
    data: SurveyType
}

const SurveyItem: React.FC<SurveyItemProps> = ({data}) => {

    const navigate = useNavigate()
    const location = useLocation();

    console.log(location.pathname)

    return (
        <Box
            onClick={() => {
                location.pathname === '/survey-management' ?
                navigate(`/survey-update?id=${data.id}`) :
                navigate(`/survey-detail?id=${data.id}`)
            }}
        >
            <Box py={4} className="border-b-[1px]" flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-3">
                    <Box>
                        <img className="w-[40px]" src={images.checklist} alt={data.title} />
                    </Box>
                    <Box className="flex-1">
                        <div className="flex flex-col">
                            <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2 mb-1">{data.title}</h3>
                            <h4 className="text-[14px] font-normal text-[#7c7c7c]">Thời hạn: {data.expiryDate}</h4>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SurveyItem