import { FeedbackSection } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const FeedbackPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Góp ý - Phản ánh" />
                <FeedbackSection />
            </Box>
        </Page>
    )
}

export default FeedbackPage