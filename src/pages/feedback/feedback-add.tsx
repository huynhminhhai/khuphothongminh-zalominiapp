import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import FeedbackAddForm from "./FeedbackAddForm"

const FeedbackAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm ý kiến" />
                <FeedbackAddForm />
            </Box>
        </Page>
    )
}

export default FeedbackAddPage