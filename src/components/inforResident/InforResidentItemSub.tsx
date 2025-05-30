import React, { useState } from "react"
import { Box } from "zmp-ui"
import { Icon } from "@iconify/react"
import ResidentInfoListForUser from "./ResidentInfoListForUser"
import ResidentInfoList from "./ResidentInfoList"

type InforResidentItemProps = {
    data: any,
    isForUser?: boolean
}

const InforResidentItem: React.FC<InforResidentItemProps> = ({ data, isForUser }) => {

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
                                {
                                    isForUser ?
                                    <ResidentInfoListForUser residentDetailData={data} />
                                    :
                                    <ResidentInfoList residentDetailData={data} />
                                }
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default InforResidentItem