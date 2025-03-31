import { HeaderSub } from "components/header-sub"
import { ProfileUpdateForm } from "components/profile"
import React from "react"
import { Box, Page } from "zmp-ui"

const ResidentProfileUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật dân cư" />
                <ProfileUpdateForm />
            </Box>
        </Page>
    )
}

export default ResidentProfileUpdatePage