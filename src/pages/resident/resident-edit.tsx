import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import ResidentEditForm from "./ResidentEditForm"

const ResidentEditPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <HeaderSub title="Cập nhật thông tin thành viên" />
            <Box>
                <Box>
                    <ResidentEditForm />
                </Box>
            </Box>
        </Page>
    )
}

export default ResidentEditPage