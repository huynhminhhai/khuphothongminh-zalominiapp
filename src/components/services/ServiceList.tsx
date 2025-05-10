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
        requiredPermission: { moTaChucNang: "Lấy thông tin người dùng hiện tại", quyen: "XEM" },
    },
    {
        label: 'Tin tức',
        url: '/news',
        icon: images.news,
        requiredPermission: { moTaChucNang: "Lấy danh sách bài viết có phân trang", quyen: "XEM" },
    },
    {
        label: 'Cuộc họp',
        url: '/meeting',
        icon: images.meeting,
        requiredPermission: { moTaChucNang: "Lấy danh sách cuộc họp có phân trang", quyen: "XEM" },
    },
    {
        label: 'Khảo sát',
        url: '/survey',
        icon: images.survey,
        requiredPermission: { moTaChucNang: "Lấy danh sách khảo sát có phân trang", quyen: "XEM" },
    },
    {
        label: 'Phản ánh',
        url: '/feedback',
        icon: images.idea,
        requiredPermission: { moTaChucNang: "Lấy danh sách phản ánh có phân trang", quyen: "XEM" },
    },
    {
        label: 'Nhiệm vụ',
        url: '/task',
        icon: images.todo,
        requiredPermission: { moTaChucNang: "Lấy danh sách nhiệm vụ của 1 người có phân trang", quyen: "XEM" },
    },
    {
        label: 'Tình hình thu chi',
        url: '/transactions',
        icon: images.money,
        requiredPermission: { moTaChucNang: "Lấy danh sách giao dịch thu chi có phân trang", quyen: "XEM" },
    },
    {
        label: 'Hóa đơn',
        url: '/invoice',
        icon: images.invoice,
        requiredPermission: { moTaChucNang: "Lấy danh sách giao dịch thu chi có phân trang", quyen: "XEM" },
    }
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
                    SERVICES.map((item, index) => (
                        <ServiceItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default ServiceList