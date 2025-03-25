import { Icon } from "@iconify/react"
import { StatisticsType } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"

type StatisticItemProps = {
    data: StatisticsType
}

const StatisticItem: React.FC<StatisticItemProps> = ({data}) => {

    return (
        <Box>
            <div style={{backgroundColor: data.color}} className={`text-white w-[100%] p-3 py-4 rounded-xl`}>
                <div className="flex items-center gap-3">
                    <Box>
                        <div className="w-[40px] h-[40px] bg-white rounded-full flex-center">
                            <Icon style={{color: data.color}} fontSize={24} icon={data.iconUrl || 'fluent:layer-24-filled'} />
                        </div>
                    </Box>
                    <Box>
                        <h5 className="text-[13px] leading-[1] font-medium mb-[6px]">{data.label}</h5>
                        <h4 className="text-[16px] leading-[1] font-semibold">{data.value}</h4>
                    </Box>
                </div>
            </div>
        </Box>
    )
}

export default StatisticItem