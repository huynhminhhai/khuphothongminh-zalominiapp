import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import ResidentAddForm from "./ResidentAddForm"

const ResidentAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <HeaderSub title="Yêu cầu thêm thành viên" />
            <Box>
                <Box>
                    <ResidentAddForm />
                </Box>
            </Box>
        </Page>
    )
}

export default ResidentAddPage