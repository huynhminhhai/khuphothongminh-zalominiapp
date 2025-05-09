import React from "react"
import { Box } from "zmp-ui"
import StatisticList from "./StatisticList"
import StatisticMain from "./StatisticMain"

const StatisticSection: React.FC<any> = () => {
    return (
        <Box>
            <Box px={4} pb={4}>
                <StatisticList />
                <StatisticMain />
            </Box>
        </Box>
    )
}

export default StatisticSection