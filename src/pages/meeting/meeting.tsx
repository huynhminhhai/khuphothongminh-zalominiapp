import { HeaderSub } from "components/header-sub"
import { MeetingList } from "components/meeting"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const MeetingPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cuộc họp" />
                <Box>
                    <MeetingList />
                </Box>
            </Box>
        </Page>
    )
}

export default MeetingPage