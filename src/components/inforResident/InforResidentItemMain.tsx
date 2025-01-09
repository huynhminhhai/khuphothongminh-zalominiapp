import { Icon } from "@iconify/react"
import { genderLabel, RESIDENTMAIN } from "constants/utinities"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Box } from "zmp-ui"

export const InforItemMain = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex items-center justify-between gap-6 py-3 resident-item">
            <div className="text-[14px] text-[#767a7f] font-normal whitespace-nowrap">{label}</div>
            <div className="text-[14px] font-normal">{value}</div>
        </div>
    )
}

const InforResidentItemMain: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Box>
            <Box>
                <Box>
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[18px] leading-[1] font-medium">Thông tin chi tiết</h4>
                    </div>
                </Box>
                <Box>
                    <InforItemMain label="Họ và tên" value={RESIDENTMAIN.fullname} />
                    <InforItemMain label="Số định danh cá nhân" value={RESIDENTMAIN.numberCard} />
                    <InforItemMain label="Giới tính" value={genderLabel[RESIDENTMAIN.gender]} />
                    <InforItemMain label="Ngày sinh" value={RESIDENTMAIN.birthDate} />
                    <InforItemMain label="Dân tộc" value={RESIDENTMAIN.nation} />
                    <InforItemMain label="Tôn giáo" value={RESIDENTMAIN.religion} />
                    <InforItemMain label="Quốc tịch" value={RESIDENTMAIN.nationality} />
                    <InforItemMain label="Quê quán" value={RESIDENTMAIN.address} />
                    <InforItemMain label="Bảo hiểm y tế" value={RESIDENTMAIN.bhyt} />
                </Box>
            </Box>
            <Box p={4} mt={4} className="border-[1px] rounded-lg" onClick={() => navigate('/resident-member')}>
                <div className="flex items-center justify-between">
                    <div className="text-[14px] font-normal">Thành viên khác trong hộ gia đình (4)</div>
                    <div>
                        <Icon fontSize={16} icon='mingcute:right-line' />
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default InforResidentItemMain