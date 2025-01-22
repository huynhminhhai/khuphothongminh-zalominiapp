import React from "react"
import { Box } from "zmp-ui"
import { RESIDENT, ResidentType } from "constants/utinities"
import { Divider } from "components/divider"
import { InforResidentItemSub } from "."

const InforResidentList: React.FC = () => {

    const myId = 1

    const filteredData = RESIDENT.filter(item =>  item.parentId === myId);

    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    filteredData.map((item: ResidentType, index: React.Key) => (
                        <Box key={index}>
                            <InforResidentItemSub data={item}/>
                            <Divider />
                        </Box>
                    ))
                }
            </div>
        </Box>
    )
}

export default InforResidentList