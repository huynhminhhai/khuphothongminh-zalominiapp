import { MeetingType } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import MeetingItem from "./MeetingItem"

type MeetingListProps = {
    data: MeetingType[]
}

const MeetingList: React.FC<MeetingListProps> = ({data}) => {

    return (
        <Box>
            <div className="grid grid-cols-1 gap-4">
                {
                    data.map((item: MeetingType, index: React.Key ) => (
                        <MeetingItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default MeetingList