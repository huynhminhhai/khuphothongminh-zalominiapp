import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { Icon } from "@iconify/react"
import SecondaryButton from "components/button/SecondaryButton"
import ResidentInfoList from "./ResidentInfoList"
import { useStoreApp } from "store/store"

type InforResidentItemProps = {
    data: any
}

const InforResidentItem: React.FC<InforResidentItemProps> = ({ data }) => {

    const navigate = useNavigate()

    const { account } = useStoreApp();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <Box className="border-b-[1px]">
            <Box p={4}>
                <Box onClick={toggleDropdown}>
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[16px] leading-[1] font-medium">
                            {data.hoTen} {data.laChuHo ? '(Chủ hộ)' : ''}
                        </h4>
                        <div>
                            {
                                isOpen ? <Icon fontSize={22} icon='mingcute:down-line' /> : <Icon fontSize={22} icon='mingcute:right-line' />
                            }
                        </div>
                    </div>
                </Box>
                {
                    isOpen && (
                        <Box>
                            <Box>
                                <ResidentInfoList residentDetailData={data} />
                            </Box>
                            {/* {
                                account?.thongTinDanCu?.laChuHo && (
                                    <Box mt={2}>
                                        <div className=" flex items-center justify-end gap-3">
                                            <SecondaryButton label="Cập nhật" handleClick={() => navigate(`/resident-edit?id=${data.danCuId}`)} size="small" />
                                        </div>
                                    </Box>
                                )
                            } */}
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default InforResidentItem