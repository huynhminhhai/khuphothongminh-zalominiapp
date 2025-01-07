import React from "react"
import { Box, useNavigate } from "zmp-ui"
import InforResidentList from "./InforResidentList"
import { PrimaryButton } from "components/button"
import { Icon } from "@iconify/react"

const MemberResidentSection: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Box>
            <Box>
                <InforResidentList />
                <Box py={4} pt={6} flex alignItems="center" justifyContent="center">
                    <PrimaryButton label="Thêm thành viên" handleClick={() => navigate('/resident-add')} iconLeft={<Icon fontSize={16} icon='material-symbols:add-rounded' />} />
                </Box>
            </Box>
        </Box>
    )
}

export default MemberResidentSection