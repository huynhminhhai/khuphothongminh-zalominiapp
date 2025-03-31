import { HeaderSub } from "components/header-sub"
import { ProfileCreateForm } from "components/profile"
import React from "react"
import { Box, Page } from "zmp-ui"

const ResidentProfileAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm dân cư" />
                <ProfileCreateForm />
            </Box>
        </Page>
    )
}

export default ResidentProfileAddPage