import { MEETING, MeetingType } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import MeetingItem from "./MeetingItem"

const MeetingList: React.FC = () => {
    return (
        <Box>
            <div className="grid grid-cols-1 gap-4">
                {
                    MEETING.map((item: MeetingType, index: React.Key ) => (
                        <MeetingItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default MeetingList