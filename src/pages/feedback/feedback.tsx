import { FeedbackList, FeedbackMenu } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FEEDBACKDATA } from "constants/utinities"
import React from "react"
import { Box, Page } from "zmp-ui"

const FeedbackPage: React.FC = () => {

    const feedbackWithStatus2 = FEEDBACKDATA.filter(feedback => feedback.status === 2);

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Góp ý - Phản ánh" />
                <Box p={4}>
                    <FeedbackMenu />
                    <FeedbackList data={feedbackWithStatus2} />
                </Box>
            </Box>
        </Page>
    )
}

export default FeedbackPage