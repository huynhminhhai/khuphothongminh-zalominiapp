import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { InforItemMain } from "./InforResidentItemMain"
import { Icon } from "@iconify/react"
import SecondaryButton from "components/button/SecondaryButton"
import { formatDate } from "utils/date"

type InforResidentItemProps = {
    data: any
}

const InforResidentItem: React.FC<InforResidentItemProps> = ({ data }) => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // const status = getLabelOptions(data.status, residentRequest)

    return (
        <Box>
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
                                <InforItemMain label="Số định danh cá nhân" value={data.soGiayTo} />
                                <InforItemMain label="Mối quan hệ với chủ hộ" value={data.laChuHo ? 'Là chủ hộ' : data.tenMoiQuanHeVoiChuHo} />
                                <InforItemMain label="Giới tính" value={data.tenGioiTinh} />
                                <InforItemMain label="Ngày sinh" value={formatDate(data.ngaySinh)} />
                                <InforItemMain label="Số điện thoại" value={data.dienThoai} />
                                <InforItemMain label="Email" value={data.email} />
                                <InforItemMain label="Quê quán" value={
                                    `${data.diaChi || ''} ${data.tenAp ? ', ' + data.tenAp : ''} ${data.tenXa ? ', ' + data.tenXa : ''} ${data.tenHuyen ? ', ' + data.tenHuyen : ''} ${data.tenTinh ? ', ' + data.tenTinh : ''}`
                                } />
                                <InforItemMain label="Nghề nghiệp" value={data.ngheNghiep} />
                                <InforItemMain label="Nơi làm việc" value={data.noiLamViec} />
                                <InforItemMain label="Dân tộc" value={data.tenDanToc} />
                                <InforItemMain label="Tôn giáo" value={data.tenTonGiao} />
                                <InforItemMain label="Quốc gia" value={data.tenQuocGia} />
                                <InforItemMain label="Website" value={data.website} />
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