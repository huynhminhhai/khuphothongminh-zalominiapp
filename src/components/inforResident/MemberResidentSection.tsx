import React from "react"
import { Box, useNavigate } from "zmp-ui"
import InforResidentList from "./InforResidentList"
import { PrimaryButton } from "components/button"
import { Icon } from "@iconify/react"
import InforResidentCraftList from "./InforResidentCraftList"
import { RESIDENT, RESIDENTCRAFT } from "constants/utinities"
import { Divider } from "components/divider"

const MemberResidentSection: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Box pt={4}>
            <Box>
                <InforResidentList />
                <Divider />
                <InforResidentCraftList />
                <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                    <Box py={3} flex alignItems="center" justifyContent="center" className="w-full">
                        <PrimaryButton fullWidth label="Thêm thành viên" handleClick={() => navigate('/resident-add')} iconLeft={<Icon fontSize={16} icon='material-symbols:add-rounded' />} />
                    </Box>
                </div>
            </Box>
        </Box>
    )
}

export default MemberResidentSection