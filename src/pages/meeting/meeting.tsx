import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { MeetingList } from "components/meeting"
import { FilterBar2 } from "components/table"
import React from "react"
import { Box, Input, Page, Select } from "zmp-ui"

const MeetingPage: React.FC = () => {

    const { Option } = Select;

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