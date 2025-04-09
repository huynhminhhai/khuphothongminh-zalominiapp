import { Icon } from "@iconify/react"
import images from "assets/images"
import SecondaryButton from "components/button/SecondaryButton"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, Box } from "zmp-ui"
import ResidentInfoList from "./ResidentInfoList"
import { EmptyData } from "components/data"

type InforResidentItemMainType = {
    data: any
}

const InforResidentItemMain: React.FC<InforResidentItemMainType> = ({ data }) => {
    const navigate = useNavigate()

    const thongTinDanCu = data.thongTinDanCu;

    return (
        <Box>
            <Box>
                <Box>
                    <div className="bg-primary-color relative flex flex-col items-center justify-center py-[30px] overflow-hidden">
                        <img src={images.shape2} alt="shape" className="absolute top-0 left-0 w-fit h-auto opacity-[0.05] z-0" />
                        <Avatar size={120} src={data.anhDaiDien || images.avatarDefault} style={{ background: '#f0f0f0' }} className="relative z-20 border-[4px] border-white" />
                        <div className="relative z-20 uppercase text-[18px] leading-[24px] font-semibold mt-3 text-white">{thongTinDanCu.hoTen}</div>
                    </div>
                </Box>
                <Box px={4}>
                    <ResidentInfoList residentDetailData={thongTinDanCu} />
                </Box>
            </Box>
            <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                <Box py={3} flex alignItems="center" justifyContent="center" className="w-full">
                    <SecondaryButton fullWidth label="Cập nhật thông tin" handleClick={() => navigate(`/resident-edit?id=${thongTinDanCu.danCuId}`)} iconLeft={<Icon fontSize={16} icon='tabler:edit' />} />
                </Box>
            </div>
        </Box>
    )
}

export default InforResidentItemMain