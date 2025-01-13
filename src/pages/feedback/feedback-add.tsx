import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import FeedbackAddForm from "./FeedbackAddForm"

const FeedbackAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thêm Góp ý - Phản ánh" />
                <FeedbackAddForm />
            </Box>
        </Page>
    )
}

export default FeedbackAddPage