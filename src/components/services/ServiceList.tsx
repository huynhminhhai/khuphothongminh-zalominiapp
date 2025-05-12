import React from "react"
import { Box } from "zmp-ui"
import ServiceItem from "./ServiceItem"
import images from "assets/images"
import { useStoreApp } from "store/store"
import { PermissionActions, permissionsList } from "utils/permission"

export type ServicesType = {
    label: string;
    url: string;
    icon?: string;
    isCheckLogin?: boolean,
    requiredPermission?: { maChucNang: string; quyen: "XEM" | "SUA" | "XOA" | "THEM" | "XUATBAN" };
}

const SERVICES: ServicesType[] = [
    {
        label: 'Thông tin hộ dân',
        url: '/resident',
        icon: images.home,
        requiredPermission: { maChucNang: permissionsList.khuPhoToChucDanCu, quyen: PermissionActions.XEM },
    },
    {
        label: 'Thẻ BHYT',
        url: '/insurance',
        icon: images.safety,
        requiredPermission: { maChucNang: permissionsList.khuPhoToChucDanCu, quyen: PermissionActions.XEM },
    },
    {
        label: 'Tin tức',
        url: '/news',
        icon: images.news,
        requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, quyen: PermissionActions.XEM },
    },
    {
        label: 'Cuộc họp',
        url: '/meeting',
        icon: images.meeting,
        requiredPermission: { maChucNang: permissionsList.khuPhoCongViecCuocHop, quyen: PermissionActions.XEM },
    },
    {
        label: 'Khảo sát',
        url: '/survey',
        icon: images.survey,
        requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhKhaoSat, quyen: PermissionActions.XEM },
    },
    {
        label: 'Phản ánh',
        url: '/feedback',
        icon: images.idea,
        requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, quyen: PermissionActions.XEM },
    },
    {
        label: 'Nhiệm vụ',
        url: '/task',
        icon: images.todo,
        requiredPermission: { maChucNang: permissionsList.khuPhoCongViec, quyen: PermissionActions.XEM },
    },
    {
        label: 'Tình hình thu chi',
        url: '/transactions',
        icon: images.money,
        requiredPermission: { maChucNang: permissionsList.khuPhoCongViecTaiChinh, quyen: PermissionActions.XEM },
    },
    // {
    //     label: 'Hóa đơn',
    //     url: '/invoice',
    //     icon: images.invoice,
    //     requiredPermission: { maChucNang: "Lấy danh sách giao dịch thu chi có phân trang", quyen: PermissionActions.XEM },
    // }
    {
        label: 'Thông tin tổ chức',
        url: '/team',
        icon: images.team,
        requiredPermission: { maChucNang: permissionsList.khuPhoToChucDanCuBanDieuHanh, quyen: PermissionActions.XEM },
    },
    // {
    //     label: 'Bản đồ',
    //     url: '/maps',
    //     icon: images.map,
    // },
]

const ServiceList: React.FC<any> = () => {

    const { hasPermission } = useStoreApp()

    const filteredServices = SERVICES.filter((item) => {
        if (!item.requiredPermission) return true;
        return hasPermission(item.requiredPermission.maChucNang, item.requiredPermission.quyen);
    });

    return (
        <Box>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4 min-h-[224px]">
                {
                    filteredServices.map((item, index) => (
                        <ServiceItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default ServiceList