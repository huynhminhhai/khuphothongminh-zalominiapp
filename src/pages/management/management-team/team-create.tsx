import { HeaderSub } from "components/header-sub"
import { TeamAddForm } from "components/team"
import React from "react"
import { Box, Page } from "zmp-ui"

const TeamAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm thành viên ban điều hành" />
                <TeamAddForm />
            </Box>
        </Page>
    )
}

export default TeamAddPage