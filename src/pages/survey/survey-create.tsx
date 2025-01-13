import { HeaderSub } from "components/header-sub"
import { SurveyCreateForm } from "components/survey"
import React from "react"
import { Box, Page } from "zmp-ui"

const SurveyAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm khảo sát" />
                <SurveyCreateForm />
            </Box>
        </Page>
    )
}

export default SurveyAddPage