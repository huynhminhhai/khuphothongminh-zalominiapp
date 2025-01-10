import { FeedbackList } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FEEDBACKDATA } from "constants/utinities"
import React from "react"
import { Box, Page } from "zmp-ui"

const FeedbackHistoryPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Phản ánh đã gửi" />
                <Box p={4}>
                    <FeedbackList data={FEEDBACKDATA} />
                </Box>
            </Box>
        </Page>
    )
}

export default FeedbackHistoryPage