import React from "react"
import { Box } from "zmp-ui"
import ServiceItem from "./ServiceItem"
import images from "assets/images"

type ServicesType = {
    label: string;
    url: string;
    icon?: string;
    isCheckLogin: boolean
}

const SERVICES: ServicesType[] = [
    {
        label: 'Thông tin hộ dân',
        url: '/resident',
        icon: images.home,
        isCheckLogin: true
    },
    {
        label: 'Tin tức',
        url: '/news',
        icon: images.news,
        isCheckLogin: false
    },
    {
        label: 'Góp ý kiến',
        url: '/feedback',
        icon: images.idea,
        isCheckLogin: false
    },
    {
        label: 'Thông tin cuộc họp',
        url: '/meeting',
        icon: images.meeting,
        isCheckLogin: true
    },
    {
        label: 'Khảo sát ý kiến',
        url: '/survey',
        icon: images.survey,
        isCheckLogin: true
    },
    {
        label: 'Thông tin tổ chức',
        url: '/team',
        icon: images.team,
        isCheckLogin: false
    },
    {
        label: 'Bản đồ',
        url: '/maps',
        icon: images.map,
        isCheckLogin: false
    },
    {
        label: 'Tình hình tài chính',
        url: '/transactions',
        icon: images.money,
        isCheckLogin: false
    },
]

const ServiceList: React.FC<any> = () => {

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