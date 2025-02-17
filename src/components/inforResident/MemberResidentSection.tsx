import React from "react"
import { Box, useNavigate } from "zmp-ui"
import InforResidentList from "./InforResidentList"
import { PrimaryButton } from "components/button"
import { Icon } from "@iconify/react"
import InforResidentCraftList from "./InforResidentCraftList"

const MemberResidentSection: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Box pt={4}>
            <Box>
                <Box pb={2} px={4}>
                    <h3 className="text-[18px] font-semibold">Thông tin thành viên đã duyệt</h3>
                </Box>
                <InforResidentList />
                <Box mt={4} pt={4} pb={2} px={4}>
                    <h3 className="text-[18px] font-semibold">Thông tin thành viên chưa duyệt</h3>
                </Box>
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