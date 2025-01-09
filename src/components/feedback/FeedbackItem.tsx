import { Feedback, feedbackColor, feedbackStatus } from "constants/utinities"
import React from "react"
import { getLabelOptions } from "utils/options"
import { Box } from "zmp-ui"

type FeedbackItemProps = {
    data: Feedback
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({data}) => {


    return (
        <Box pb={4} mb={4} className="border-b-[1px]">
            <Box>
                <img className="rounded-lg w-[100%] h-[200px] object-cover" src={data.imageUrl || 'https://actiosoftware.com/wp-content/uploads/2024/02/resposta-do-smiley-do-cliente-do-feedback-da-avaliacao-1.jpg'} alt="Phản ánh 1" />
            </Box>
            <Box mt={2}>
                <h3 className="text-[18px] leading-[22px] font-medium line-clamp-2 mb-2">{data.title}</h3>
                <div className="flex items-center justify-between text-[12px] leading-[1] font-medium text-[#7c7c7c]">
                    <div style={{borderColor: feedbackColor[data.status], color: feedbackColor[data.status]}} className="border-[1px] py-1 px-2 rounded">{getLabelOptions(data.status, feedbackStatus)}</div>
                    <div>{data.timestamp}</div>
                </div>
            </Box>
        </Box>
    )
}

export default FeedbackItem