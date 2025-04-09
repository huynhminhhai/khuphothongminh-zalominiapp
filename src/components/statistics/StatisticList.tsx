import React from "react"
import { Box } from "zmp-ui"
import { useGetResidentData } from "apiRequest/resident"
import { Icon } from "@iconify/react"

type StatisticListProps = {

}

const StatisticList: React.FC<StatisticListProps> = () => {

    const { familyNumberQuery, residentNumberQuery } = useGetResidentData();

    return (
        <Box>
            <div className="grid grid-cols-2 gap-3">
                {/* {
                    STATISTICS.map((item: StatisticsType, index: React.Key) => (
                        <StatisticItem key={index} data={item} />
                    ))
                } */}

                <Box>
                    <div className={'bg-[#0a7460] text-white w-[100%] p-3 py-4 rounded-xl relative overflow-hidden'}>
                        <div className="flex items-center gap-3">
                            <Box>
                                <h5 className="text-[13px] leading-[1] font-medium mb-[6px] opacity-80">Hộ dân</h5>
                                <h4 className="text-[20px] leading-[1] font-semibold">{ familyNumberQuery.isLoading ? <Icon icon='line-md:loading-twotone-loop' /> : familyNumberQuery.data}</h4>
                            </Box>
                            <Icon fontSize={80} className="absolute bottom-[-20%] right-[-10%] opacity-50" icon={'line-md:home'} />
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className={'bg-[#a1802c] text-white w-[100%] p-3 py-4 rounded-xl relative overflow-hidden'}>
                        <div className="flex items-center gap-3">
                            <Box>
                                <h5 className="text-[13px] leading-[1] font-medium mb-[6px] opacity-80">Nhân khẩu</h5>
                                <h4 className="text-[20px] leading-[1] font-semibold">{residentNumberQuery.isLoading ? <Icon icon='line-md:loading-twotone-loop' /> : residentNumberQuery.data}</h4>
                            </Box>
                            <Icon fontSize={80} className="absolute bottom-[-20%] right-[-10%] opacity-50" icon={'line-md:person'} />
                        </div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default StatisticList