import TitleSection from "components/titleSection"
import React from "react"
import { Box } from "zmp-ui"
import ServiceList from "./ServiceList"

const ServiceSection: React.FC<any> = () => {
    return (
        <Box>
            <div className="bg-white rounded-t-2xl">
                <Box p={4}>
                    <TitleSection title="Cư dân" />
                    <ServiceList />
                </Box>
            </div>
        </Box>
    )
}

export default ServiceSection