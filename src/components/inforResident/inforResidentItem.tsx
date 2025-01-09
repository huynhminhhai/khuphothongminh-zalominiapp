import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { InforItemMain } from "./InforResidentItemMain"
import { Icon } from "@iconify/react"
import { genderLabel, relationships, ResidentType } from "constants/utinities"
import { getLabelOptions } from "utils/options"
import { residentRequest, residentStatus, residentType } from "constants/mock"
import SecondaryButton from "components/button/SecondaryButton"

type InforResidentItemProps = {
    data: ResidentType
    isCraft?: boolean
}

const InforResidentItem: React.FC<InforResidentItemProps> = ({data, isCraft=false}) => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const status = getLabelOptions(data.status, residentRequest)

    return (
        <Box>
            <Box p={4}>
                <Box onClick={toggleDropdown}>
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[16px] leading-[1] font-medium">
                            {data.fullname} {" "}
                            {data.status !== 1 && 
                                <span className="text-[12px]">
                                    ({status})
                                </span>
                            }
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
                                <InforItemMain label="Số định danh cá nhân" value={data.numberCard} />
                                <InforItemMain label="Ngày sinh" value={data.birthDate} />
                                <InforItemMain label="Giới tính" value={genderLabel[data.gender]} />
                                <InforItemMain label="Quan hệ với chủ hộ" value={getLabelOptions(data.relationship, relationships) || 'Chủ hộ'} />
                                <InforItemMain
                                    label="Loại cư trú"
                                    value={`${getLabelOptions(data.residenceType, residentType)}`}
                                />
                                {
                                    getLabelOptions(data.residenceStatus, residentStatus) && 
                                    <InforItemMain
                                        label="Tình trạng"
                                        value={`${ getLabelOptions(data.residenceStatus, residentStatus)}`}
                                    />
                                }
                                <InforItemMain label="Bảo hiểm y tế" value={data.bhyt} />
                            </Box>
                            <Box mt={2}>
                                <div className=" flex items-center justify-end gap-3">
                                    {
                                        data.status === 1 &&
                                        <SecondaryButton label="Cập nhật" handleClick={() => navigate(`/resident-edit?id=${data.id}`)} size="small" />
                                    }
                                </div>
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default InforResidentItem