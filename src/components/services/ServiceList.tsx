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
    requiredPermission?: { maChucNang: string; quyen:  "XEM" | "XEMCONGKHAI" | "SUA" | "XOA" | "THEM" | "XUATBAN" | "BAOCAO" | "TIEPNHAN" | "XOACUATOI" | "THUCHIEN" };
    isRequireApId?: boolean,
    isComingSoon?: boolean,
    isRequireLogin?: boolean
}

const SERVICES: ServicesType[] = [
    {
        label: 'Hộ gia đình',
        url: '/resident',
        icon: images.home,
        isRequireApId: true,
        isRequireLogin: true
        // requiredPermission: { maChucNang: permissionsList.khuPhoToChucDanCu, quyen: PermissionActions.XEM },
    },
    // {
    //     label: 'Thẻ BHYT',
    //     url: '/insurance',
    //     icon: images.safety,
    //     isRequireApId: true,
    //     // requiredPermission: { maChucNang: permissionsList.khuPhoToChucDanCu, quyen: PermissionActions.XEM },
    // },
    // {
    //     label: 'Cuộc họp',
    //     url: '/meeting',
    //     icon: images.meeting,
    //     requiredPermission: { maChucNang: permissionsList.khuPhoCongViecCuocHop, quyen: PermissionActions.XEM },
    // },
    // {
    //     label: 'Nhiệm vụ',
    //     url: '/task',
    //     icon: images.todo,
    //     requiredPermission: { maChucNang: permissionsList.khuPhoNhiemVuNhiemVuCuaToi, quyen: PermissionActions.XEM },
    // },
    // {
    //     label: 'Thông tin tổ chức',
    //     url: '/team',
    //     icon: images.team,
    //     requiredPermission: { maChucNang: permissionsList.khuPhoToChucDanCuBanDieuHanh, quyen: PermissionActions.XEM },
    // },
    {
        label: 'Thông tin cần biết',
        url: '/news',
        icon: images.news,
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, quyen: PermissionActions.XEM },
    },
    
    {
        label: 'Khảo sát',
        url: '/survey',
        icon: images.survey,
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhKhaoSat, quyen: PermissionActions.XEMCONGKHAI },
        isRequireApId: true,
        isRequireLogin: true
    },
    
    // {
    //     label: 'Hóa đơn',
    //     url: '/invoice',
    //     icon: images.invoice,
    //     requiredPermission: { maChucNang: "Lấy danh sách giao dịch thu chi có phân trang", quyen: PermissionActions.XEM },
    // },
    // {
    //     label: 'Tình hình tài chính',
    //     url: '/transactions',
    //     icon: images.money,
    //     isRequireApId: true,
    //     // requiredPermission: { maChucNang: permissionsList.khuPhoCongViecTaiChinh, quyen: PermissionActions.XEM },
    // },
    {
        label: 'Văn bản cần biết',
        url: '/document',
        icon: images.document,
        // isComingSoon: true,
        isRequireLogin: true
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, quyen: PermissionActions.XEM },
    },
    {
        label: 'Hỏi đáp',
        url: '/chatbox',
        icon: images.question,
        // isComingSoon: true
        // isRequireLogin: true
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, quyen: PermissionActions.XEM },
    },
    {
        label: 'Gửi ý kiến',
        url: '/feedback',
        icon: images.idea,
        isRequireLogin: true
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, quyen: PermissionActions.XEM },
    },
    {
        label: 'Thu phí rác',
        url: '/garbage-fee',
        icon: images.garbageFee,
        isComingSoon: true,
        isRequireLogin: true
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, quyen: PermissionActions.XEM },
    },
    {
        label: 'Đóng tiền quỹ',
        url: '/garbage-fee',
        icon: images.fund,
        isComingSoon: true,
        isRequireLogin: true
        // requiredPermission: { maChucNang: permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, quyen: PermissionActions.XEM },
    },
]

const ServiceList: React.FC<any> = () => {

    const { hasPermission } = useStoreApp()

    const filteredServices = SERVICES.filter((item) => {
        if (!item.requiredPermission) return true;
        return hasPermission(item.requiredPermission.maChucNang, item.requiredPermission.quyen);
    });

    return (
        <Box>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4">
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