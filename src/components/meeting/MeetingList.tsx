import React from "react"
import { Box } from "zmp-ui"
import MeetingItem from "./MeetingItem"
import { FormDataMeeting } from "./type"

type MeetingListProps = {
    data: FormDataMeeting[]
}

const MeetingList: React.FC<MeetingListProps> = ({data}) => {

    return (
        <Box>
            <div className="grid grid-cols-1 gap-4">
                {
                    data.map((item: FormDataMeeting, index: React.Key ) => (
                        <MeetingItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default MeetingList