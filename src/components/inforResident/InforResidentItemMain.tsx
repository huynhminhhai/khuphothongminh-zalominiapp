import React from "react"
import { useNavigate } from "react-router-dom"
import { Box } from "zmp-ui"
import ResidentInfoListForUser from "./ResidentInfoListForUser"

type InforResidentItemMainType = {
    data: any
}

const InforResidentItemMain: React.FC<InforResidentItemMainType> = ({ data }) => {
    const navigate = useNavigate()

    const thongTinDanCu = data.thongTinDanCu;

    return (
        <Box>
            <Box>
                <Box px={4}>
                    <ResidentInfoListForUser residentDetailData={thongTinDanCu} isShow={true} />
                </Box>
            </Box>
            {/* <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                <Box py={3} flex alignItems="center" justifyContent="center" className="w-full">
                    <SecondaryButton fullWidth label="Cập nhật thông tin" handleClick={() => navigate(`/resident-edit?id=${thongTinDanCu.danCuId}`)} iconLeft={<Icon fontSize={16} icon='tabler:edit' />} />
                </Box>
            </div> */}
        </Box>
    )
}

export default InforResidentItemMain