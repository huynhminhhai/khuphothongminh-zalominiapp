import TitleSection from "components/titleSection"
import React from "react"
import { Box } from "zmp-ui"
import MeetingList from "./MeetingList"

const MeetingSection: React.FC<any> = () => {
    return (
        <Box>
            <Box p={4}>
                <TitleSection title="Cuộc họp" />
                <MeetingList />
            </Box>
        </Box>
    )
}

export default MeetingSection