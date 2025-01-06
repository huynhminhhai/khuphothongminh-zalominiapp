import { SERVICES, ServicesType } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import ServiceItem from "./ServiceItem"

const ServiceList: React.FC<any> = () => {
    return (
        <Box>
            <div className="grid grid-cols-4 gap-3">
                {
                    SERVICES.map((item: ServicesType, index: React.Key) => (
                        <ServiceItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default ServiceList