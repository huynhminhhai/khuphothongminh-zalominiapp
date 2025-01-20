import { HeaderSub } from "components/header-sub"
import { MeetingUpdateForm } from "components/meeting"
import React from "react"
import { Box, Page } from "zmp-ui"

const MeetingPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật cuộc họp" />
                <MeetingUpdateForm />
            </Box>
        </Page>
    )
}

export default MeetingPage