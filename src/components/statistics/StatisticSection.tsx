import React from "react"
import { Box } from "zmp-ui"
import StatisticList from "./StatisticList"
import StatisticMain from "./StatisticMain"

const StatisticSection: React.FC<any> = () => {
    return (
        <Box>
            <StatisticList />
            <StatisticMain/>
        </Box>
    )
}

export default StatisticSection