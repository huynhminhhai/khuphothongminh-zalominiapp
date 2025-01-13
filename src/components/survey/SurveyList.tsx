import React from "react"
import { Box, Button } from "zmp-ui"
import { Feedback, SurveyType } from "constants/utinities"
import images from "assets/images"
import SurveyItem from "./SurveyItem"

type SurveyListProps = {
    data: SurveyType[]
}

const SurveyList: React.FC<SurveyListProps> = ({data}) => {

    return (
        <Box>
            {
                data && data.length > 0 ? 
                <Box>
                    <div className="grid grid-cols-1">
                        {
                            data.map((item, index) => (
                                <SurveyItem key={index} data={item} />
                            ))
                        }
                    </div>
                </Box>
                :
                <Box mt={10}>
                    <Box flex justifyContent="center">
                        <img src={images.empty} alt="Không có dữ liệu" />
                    </Box>
                    <Box mt={4}>
                        <h3 className="text-[18px] leading-[1] font-medium text-center">Hiện chưa có khảo sát nào !</h3>
                        <p className="text-[14px] leading-[20px] text-[#555] mt-2 text-center">
                            Khi có khảo sát từ ban quản lý, bạn có thể tham gia và đóng góp ý kiến ngay tại đây. Vui lòng quay lại sau!
                        </p>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default SurveyList