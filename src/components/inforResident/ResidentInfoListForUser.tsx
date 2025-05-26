import React from "react";
import { useStoreApp } from "store/store";
import { Box } from "zmp-ui";

export const formatAddress = (data?: any) => {
    if (!data) return "";
    return [
        data.diaChi,
        data.tenAp,
        data.tenXa,
        data.tenHuyen,
        data.tenTinh
    ].filter(Boolean).join(", ");
};

const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
};

export const InforItemMain = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex items-center justify-between gap-6 py-4 resident-item">
            <div className="text-[14px] text-[#767a7f] font-normal whitespace-nowrap">{label}</div>
            <div className="text-[14px] font-normal text-end">{value}</div>
        </div>
    )
}

interface ResidentInfoListForUserProps {
    residentDetailData: any;
    isShow?: boolean
}

const ResidentInfoListForUser: React.FC<ResidentInfoListForUserProps> = ({ residentDetailData, isShow=false }) => {

    const { ngheNghieps } = useStoreApp()

    const infoItems = [
        { label: "Số định danh cá nhân", value: residentDetailData.soGiayTo },
        // { label: "Vai trò", value: residentDetailData.laChuHo ? "Là chủ hộ" : residentDetailData.tenMoiQuanHeVoiChuHo },
        { label: "Giới tính", value: residentDetailData.tenGioiTinh },
        { label: "Ngày sinh", value: formatDate(residentDetailData.ngaySinh) },
        { label: "Số điện thoại", value: residentDetailData.dienThoai },
        { label: "Email", value: residentDetailData.email },
        { label: "Địa chỉ", value: formatAddress(residentDetailData.noiThuongTru), condition: !!residentDetailData.noiThuongTru },
        { label: "Nghề nghiệp", value: ngheNghieps.find((item: any) => item.value === Number(residentDetailData?.ngheNghiep))?.label },
        { label: "Nơi làm việc", value: residentDetailData.noiLamViec },
        { label: "Bảo hiểm y tế", value: residentDetailData.baoHiemYTe ? residentDetailData.baoHiemYTe.maSo : "" },
    ];

    return (
        <Box>
            {infoItems.map((item, index) => {
                const shouldShow = isShow || (item.value && (item.condition === undefined || item.condition));
                return shouldShow ? (
                    <InforItemMain
                        key={index}
                        label={item.label}
                        value={item.value ?? ""}
                    />
                ) : null;
            })}
        </Box>
    );
};

export default ResidentInfoListForUser;
