import React from "react"
import { Box } from "zmp-ui"
import { RESIDENTCRAFT, ResidentType } from "constants/utinities"
import { Divider } from "components/divider"
import { InforResidentItemSub } from "."

const InforResidentCraftList: React.FC = () => {

    const myId = 1

    const filteredData = RESIDENTCRAFT.filter(item => item.parentId === myId);
    
    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    filteredData.map((item: ResidentType, index: React.Key) => (
                        <Box key={index}>
                            <InforResidentItemSub data={item} isCraft />
                            <Divider />
                        </Box>
                    ))
                }
            </div>
        </Box>
    )
}

export default InforResidentCraftList