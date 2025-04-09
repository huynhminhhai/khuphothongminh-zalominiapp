import React from "react"
import { Box } from "zmp-ui"
import ServiceItem from "./ServiceItem"
import images from "assets/images"
import { useStoreApp } from "store/store"

export type ServicesType = {
    label: string;
    url: string;
    icon?: string;
    isCheckLogin?: boolean,
    requiredPermission?: { moTaChucNang: string; quyen: "XEM" | "SUA" | "XOA" };
}

const SERVICES: ServicesType[] = [
    {
        label: 'Thông tin hộ dân',
        url: '/resident',
        icon: images.home,
        // requiredPermission: { moTaChucNang: "Lấy thông tin chi tiết 1 dân cư", quyen: "XEM" },
    },
    {
        label: 'Tin tức',
        url: '/news',
        icon: images.news,
        // requiredPermission: { moTaChucNang: "Lấy danh mục cần thiết của tin tức", quyen: "XEM" },
    },
    {
        label: 'Góp ý kiến',
        url: '/feedback',
        icon: images.idea,
        // requiredPermission: { moTaChucNang: "Lấy danh mục cần thiết của phản ánh", quyen: "XEM" },
    },
    {
        label: 'Thông tin cuộc họp',
        url: '/meeting',
        icon: images.meeting,
        // requiredPermission: { moTaChucNang: "Lấy danh mục cần thiết của cuộc họp", quyen: "XEM" },
    },
    {
        label: 'Khảo sát ý kiến',
        url: '/survey',
        icon: images.survey,
        // requiredPermission: { moTaChucNang: "Lấy danh mục cần thiết của khảo sát", quyen: "XEM" },
    },
    // {
    //     label: 'Thông tin tổ chức',
    //     url: '/team',
    //     icon: images.team,
    // },
    // {
    //     label: 'Bản đồ',
    //     url: '/maps',
    //     icon: images.map,
    // },
    {
        label: 'Tình hình tài chính',
        url: '/transactions',
        icon: images.money,
    },
    {
        label: 'Nhiệm vụ',
        url: '/task',
        icon: images.todo,
        // requiredPermission: { moTaChucNang: "Lấy danh mục cần thiết của khảo sát", quyen: "XEM" },
    },
    {
        label: 'Hóa đơn',
        url: '/invoice',
        icon: images.invoice
    }
]

const ServiceList: React.FC<any> = () => {

    const { hasPermission } = useStoreApp()

    const filteredServices = SERVICES.filter((item) => {
        if (!item.requiredPermission) return true;
        return hasPermission(item.requiredPermission.moTaChucNang, item.requiredPermission.quyen);
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