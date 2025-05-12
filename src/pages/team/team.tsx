import { HeaderSub } from "components/header-sub"
import { TeamList } from "components/team"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const TeamPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Ban điều hành" onBackClick={() => navigate('/')} />
                <Box pb={4}>
                    <TeamList />
                </Box>
            </Box>
        </Page>
    )
}

export default TeamPage