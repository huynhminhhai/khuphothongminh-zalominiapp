import React from "react"
import { Box, Button } from "zmp-ui"
import FeedbackItem from "./FeedbackItem"
import { FEEDBACKDATA } from "constants/utinities"
import FeedbackMenu from "./FeedbackMenu"

const NewsList: React.FC = () => {

    const feedbackWithStatus2 = FEEDBACKDATA.filter(feedback => feedback.status === 2);

    return (
        <Box>
            <FeedbackMenu />
            <div className="grid grid-cols-1">
                {
                    feedbackWithStatus2.map((item, index) => (
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

export default NewsList