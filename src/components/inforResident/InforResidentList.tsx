import React from "react"
import { Box } from "zmp-ui"
import { RESIDENT, ResidentType } from "constants/utinities"
import { Divider } from "components/divider"
import InforResidentItem from "./InforResidentItem"

const InforResidentList: React.FC = () => {
    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    RESIDENT.map((item: ResidentType, index: React.Key) => (
                        <Box key={index}>
                            <InforResidentItem data={item}/>
                            <Divider />
                        </Box>

                    ))
                }
            </div>
        </Box>
    )
}

export default InforResidentList