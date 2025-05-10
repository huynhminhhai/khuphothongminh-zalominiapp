import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import FeedbackAddForm from "./FeedbackAddForm"
import FeedbackUpdateForm from "./FeedbackUpdateForm"

const FeedbackAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật phản ánh" />
                <FeedbackUpdateForm />
            </Box>
        </Page>
    )
}

export default FeedbackAddPage