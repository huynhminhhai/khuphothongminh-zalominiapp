import React, { useState } from "react"
import { Box } from "zmp-ui"
import { InforItemMain } from "./InforResidentItemMain"
import { Icon } from "@iconify/react"
import { genderLabel, relationships, ResidentType } from "constants/utinities"
import { getLabelOptions } from "utils/options"

type InforResidentItemProps = {
    data: ResidentType

}

const InforResidentItem: React.FC<InforResidentItemProps> = ({data}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <Box>
            <Box p={4}>
                <Box onClick={toggleDropdown}>
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[18px] leading-[1] font-medium">{data.fullname}</h4>
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
                            <InforItemMain label="Số định danh cá nhân" value={data.numberCard} />
                            <InforItemMain label="Ngày sinh" value={data.birthDate} />
                            <InforItemMain label="Giới tính" value={genderLabel[data.gender]} />
                            <InforItemMain label="Quan hệ với chủ hộ" value={getLabelOptions(data.relationship, relationships) || 'Chủ hộ'} />
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default InforResidentItem