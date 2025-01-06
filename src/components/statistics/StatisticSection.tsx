import React from "react"
import { Box } from "zmp-ui"
import StatisticList from "./StatisticList"
import StatisticMain from "./StatisticMain"

const StatisticSection: React.FC<any> = () => {
    return (
        <Box p={4}>
            <StatisticList />
            <StatisticMain/>
        </Box>
    )
}

export default StatisticSection