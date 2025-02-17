import { HeaderSub } from "components/header-sub"
import { TeamList } from "components/team"
import React from "react"
import { Box, Page } from "zmp-ui"

const TeamPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Nhân sự/ Cán bộ" />
                <Box pb={4}>
                    <TeamList />
                </Box>
            </Box>
        </Page>
    )
}

export default TeamPage