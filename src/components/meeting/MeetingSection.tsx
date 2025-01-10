import TitleSection from "components/titleSection"
import React from "react"
import { Box } from "zmp-ui"
import MeetingList from "./MeetingList"
import { MEETING } from "constants/utinities"

const MeetingSection: React.FC<any> = () => {

    const firstTwoMeetings = MEETING.slice(0, 2);

    return (
        <Box>
            <Box p={4}>
                <TitleSection title="Cuộc họp hôm nay" />
                <MeetingList data={firstTwoMeetings} />
            </Box>
        </Box>
    )
}

export default MeetingSection