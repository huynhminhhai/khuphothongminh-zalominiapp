import React from "react"
import { Box } from "zmp-ui"
import { useGetChuHosList, useGetResidentData } from "apiRequest/resident"
import { Icon } from "@iconify/react"

const StatisticList: React.FC<any> = () => {

    const { familyNumberQuery, residentNumberQuery } = useGetResidentData();
    const { data: chuHos, isLoading } = useGetChuHosList();

    return (
        <Box>
            <div className="grid grid-cols-2 gap-3">
                <Box>
                    <div className={'bg-[#2265a2] text-white w-[100%] p-3 py-4 rounded-xl relative overflow-hidden'}>
                        <div className="flex items-center gap-3">
                            <Box>
                                <h5 className="text-[13px] leading-[1] font-medium mb-[6px] opacity-90">Hộ dân</h5>
                                <h4 className="text-[20px] leading-[1] font-semibold">
                                    {
                                        (familyNumberQuery.isLoading || isLoading)
                                            ? <Icon icon='line-md:loading-twotone-loop' />
                                            : (chuHos.length > 0 ? chuHos.length : familyNumberQuery.data || 0)
                                    }
                                </h4>
                            </Box>
                            <Icon fontSize={80} className="absolute bottom-[-20%] right-[-10%] opacity-50" icon={'line-md:home'} />
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className={'bg-[#2265a2] text-white w-[100%] p-3 py-4 rounded-xl relative overflow-hidden'}>
                        <div className="flex items-center gap-3">
                            <Box>
                                <h5 className="text-[13px] leading-[1] font-medium mb-[6px] opacity-90">Nhân khẩu</h5>
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