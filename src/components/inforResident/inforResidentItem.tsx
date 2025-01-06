import React, { useState } from "react"
import { Box } from "zmp-ui"
import { InforItemMain } from "./InforResidentItemMain"
import { Icon } from "@iconify/react"
import { genderLabel, ResidentType } from "constants/utinities"

type InforResidentItemProps = {
    data: ResidentType

}

const InforResidentItem: React.FC<InforResidentItemProps> = ({data}) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <Box>
            <Box p={4}>
                <Box onClick={toggleDropdown}>
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[18px] font-semibold">{data.fullname}</h4>
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
                            <InforItemMain label="Quan hệ với chủ hộ" value={data.relationship} />
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default InforResidentItem