import { STATISTICS, StatisticsType } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import StatisticItem from "./StatisticItem"

type StatisticListProps = {

}

const StatisticList: React.FC<StatisticListProps> = () => {
    return (
        <Box>
            <div className="grid grid-cols-2 gap-3">
                {
                    STATISTICS.map((item: StatisticsType, index: React.Key) => (
                        <StatisticItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default StatisticList