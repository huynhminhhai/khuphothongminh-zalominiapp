import React from "react"
import { Box } from "zmp-ui"
import { FeedbackList } from "."

const FeedbackSection: React.FC = () => {
    return (
        <Box>
            <Box p={4}>
                <FeedbackList />
            </Box>
        </Box>
    )
}

export default FeedbackSection