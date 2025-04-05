import { HeaderSub } from "components/header-sub"
import { SurveyList } from "components/survey"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const SurveyPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Khảo sát ý kiến" onBackClick={() => navigate('/')} />
                <Box>
                    <SurveyList />
                </Box>
            </Box>
        </Page>
    )
}

export default SurveyPage