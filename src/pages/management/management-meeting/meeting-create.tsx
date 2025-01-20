import { HeaderSub } from "components/header-sub"
import { MeetingCreateForm } from "components/meeting"
import React from "react"
import { Box, Page } from "zmp-ui"

const MeetingAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm cuộc họp" />
                <MeetingCreateForm />
            </Box>
        </Page>
    )
}

export default MeetingAddPage