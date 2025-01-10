import React from "react"
import { Box, Button } from "zmp-ui"
import FeedbackItem from "./FeedbackItem"
import { Feedback } from "constants/utinities"

type FeedbackListProps = {
    data: Feedback[]
}

const FeedbackList: React.FC<FeedbackListProps> = ({data}) => {

    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    data.map((item, index) => (
                        <FeedbackItem key={index} data={item} />
                    ))
                }
            </div>
            <div className="flex items-center justify-center gap-3 pt-6 pb-2">
                <Button onClick={() => console.log('call api')} size="medium">Xem thêm</Button>
            </div>
        </Box>
    )
}

export default FeedbackList