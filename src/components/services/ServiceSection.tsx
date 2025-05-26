import TitleSection from "components/titleSection"
import React from "react"
import { Box } from "zmp-ui"
import ServiceList from "./ServiceList"

const ServiceSection: React.FC<any> = () => {
    return (
        <Box>
            <Box px={4} pb={6} pt={4}>
                <ServiceList />
            </Box>
        </Box>
    )
}

export default ServiceSection