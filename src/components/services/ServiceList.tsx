import React from "react"
import { Box } from "zmp-ui"
import ServiceItem from "./ServiceItem"
import images from "assets/images"
import { useStoreApp } from "store/store"

const ServiceList: React.FC<any> = () => {

    const { account } = useStoreApp()

    return (
        <Box>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4 min-h-[224px]">
                {
                    account &&
                    <>
                        <ServiceItem data={{
                            label: 'Thông tin hộ dân',
                            url: '/resident',
                            icon: images.home
                        }} />
                        <ServiceItem data={{
                            label: 'Thông tin cuộc họp',
                            url: '/meeting',
                            icon: images.meeting
                        }} />
                        <ServiceItem data={{
                            label: 'Khảo sát ý kiến',
                            url: '/survey',
                            icon: images.survey
                        }} />

                    </>
                }
                <>
                    
                    <ServiceItem data={{
                        label: 'Tin tức',
                        url: '/news',
                        icon: images.news
                    }} />
                    <ServiceItem data={{
                        label: 'Thông tin tổ chức',
                        url: '/team',
                        icon: images.team
                    }} />
                    <ServiceItem data={{
                        label: 'Góp ý kiến',
                        url: '/feedback',
                        icon: images.idea
                    }} />
                    <ServiceItem data={{
                        label: 'Tình hình tài chính',
                        url: '/transactions',
                        icon: images.money
                    }} />
                    <ServiceItem data={{
                        label: 'Bản đồ',
                        url: '/maps',
                        icon: images.map
                    }} />
                </>
            </div>
        </Box>
    )
}

export default ServiceList