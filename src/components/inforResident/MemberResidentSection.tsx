import React from "react"
import { Box } from "zmp-ui"
import InforResidentList from "./InforResidentList"

const MemberResidentSection: React.FC = () => {
    return (
        <Box>
            <Box>
                <InforResidentList />
            </Box>
        </Box>
    )
}

export default MemberResidentSection