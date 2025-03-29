import { Icon } from "@iconify/react"
import { useGetUserInfo } from "apiRequest/user"
import images from "assets/images"
import SecondaryButton from "components/button/SecondaryButton"
import { EmptyData } from "components/data"
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton"
import React from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "utils/date"
import { Avatar, Box } from "zmp-ui"

export const InforItemMain = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex items-center justify-between gap-6 py-4 resident-item">
            <div className="text-[14px] text-[#767a7f] font-normal whitespace-nowrap">{label}</div>
            <div className="text-[14px] font-normal text-end">{value}</div>
        </div>
    )
}

type InforResidentItemMainType = {
    data: any
}

const InforResidentItemMain: React.FC<InforResidentItemMainType> = ({data}) => {
    const navigate = useNavigate()
    
    const thongTinDanCu = data.thongTinDanCu;

    return (
        <Box>
            <Box>
                <Box>
                    <div className="bg-[#731611] relative flex flex-col items-center justify-center py-[30px] overflow-hidden">
                        <img src={images.shape2} alt="shape" className="absolute top-0 left-0 w-fit h-auto opacity-[0.05] z-0" />
                        <Avatar size={120} src={data.anhDaiDien} style={{ background: '#f0f0f0' }} className="relative z-20 border-[4px] border-white" />
                        <div className="relative z-20 uppercase text-[18px] leading-[24px] font-semibold mt-3 text-white">{thongTinDanCu.hoTen}</div>
                    </div>
                </Box>
                <Box p={4}>
                    <InforItemMain label="Số định danh cá nhân" value={thongTinDanCu.soGiayTo} />
                    <InforItemMain label="Mối quan hệ với chủ hộ" value={thongTinDanCu.laChuHo ? 'Là chủ hộ' : thongTinDanCu.tenMoiQuanHeVoiChuHo} />
                    <InforItemMain label="Giới tính" value={thongTinDanCu.tenGioiTinh} />
                    <InforItemMain label="Ngày sinh" value={formatDate(thongTinDanCu.ngaySinh)} />
                    <InforItemMain label="Số điện thoại" value={thongTinDanCu.dienThoai} />
                    <InforItemMain label="Email" value={thongTinDanCu.email} />
                    <InforItemMain label="Thường trú" value={
                        `${thongTinDanCu.noiThuongTru.diaChi || ''} ${thongTinDanCu.noiThuongTru.tenAp ? ', ' + thongTinDanCu.noiThuongTru.tenAp : ''} ${thongTinDanCu.noiThuongTru.tenXa ? ', ' + thongTinDanCu.noiThuongTru.tenXa : ''} ${thongTinDanCu.noiThuongTru.tenHuyen ? ', ' + thongTinDanCu.noiThuongTru.tenHuyen : ''} ${thongTinDanCu.noiThuongTru.tenTinh ? ', ' + thongTinDanCu.noiThuongTru.tenTinh : ''}`
                    } />
                    <InforItemMain label="Quê quán" value={
                        `${thongTinDanCu.diaChi || ''} ${thongTinDanCu.tenAp ? ', ' + thongTinDanCu.tenAp : ''} ${thongTinDanCu.tenXa ? ', ' + thongTinDanCu.tenXa : ''} ${thongTinDanCu.tenHuyen ? ', ' + thongTinDanCu.tenHuyen : ''} ${thongTinDanCu.tenTinh ? ', ' + thongTinDanCu.tenTinh : ''}`
                    } />
                    <InforItemMain label="Nghề nghiệp" value={thongTinDanCu.ngheNghiep} />
                    <InforItemMain label="Nơi làm việc" value={thongTinDanCu.noiLamViec} />
                    <InforItemMain label="Dân tộc" value={thongTinDanCu.tenDanToc} />
                    <InforItemMain label="Tôn giáo" value={thongTinDanCu.tenTonGiao} />
                    <InforItemMain label="Quốc gia" value={thongTinDanCu.tenQuocGia} />
                    <InforItemMain label="Bảo hiểm y tế" value={thongTinDanCu.baoHiemYTe ? thongTinDanCu.baoHiemYTe.maSo : 'Chưa có'} />
                    <InforItemMain label="Website" value={thongTinDanCu.website} />
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