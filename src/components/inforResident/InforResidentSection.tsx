import React from "react"
import { Box } from "zmp-ui"
import InforResidentItemMain from "./InforResidentItemMain"

const InforResidentSection: React.FC = () => {
    return (
        <Box>
            <Box p={4}>
                <InforResidentItemMain />
            </Box>
        </Box>
    )
}

export default InforResidentSection