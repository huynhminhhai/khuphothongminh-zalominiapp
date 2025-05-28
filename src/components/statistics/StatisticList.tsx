import React from "react"
import { Box } from "zmp-ui"
import { useGetChuHosList, useGetResidentData } from "apiRequest/resident"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion";
import images from "assets/images";
import { useGetSoLieuHienThi } from "apiRequest/app";

const StatisticList: React.FC<any> = () => {

    const { familyNumberQuery, residentNumberQuery } = useGetResidentData();
    const { data, isLoading } = useGetSoLieuHienThi();

    return (
        <Box mb={3}>
            <div className="grid grid-cols-2 gap-3">
                <Box>
                    <div className={'bg-blue-50 text-[#153568] w-[100%] p-3 py-4 rounded-xl relative overflow-hidden'}>
                        <div className="absolute top-[60%] -left-[-2%] transform translate-y-[-50%] w-[100%]">
                            <motion.img
                                className="scale-[1.5] rotate-[-25deg]"
                                src={images.shapeWave2}
                                alt="shape"
                                initial={{ WebkitMaskSize: "0% 100%", opacity: 0 }}
                                animate={{ WebkitMaskSize: "100% 100%", opacity: 0.8 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Box>
                                <h5 className="text-[13px] leading-[1] font-semibold mb-[6px] opacity-90">Hộ gia đình</h5>
                                <h4 className="text-[20px] leading-[1] font-semibold">
                                    {
                                        (familyNumberQuery.isLoading || isLoading)
                                            ? <Icon icon='line-md:loading-twotone-loop' />
                                            : (data ? data.tongSoHoGiaDinh : familyNumberQuery.data || 0)
                                    }
                                </h4>
                            </Box>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className={'bg-blue-50 text-[#153568] w-[100%] p-3 py-4 rounded-xl relative overflow-hidden'}>
                        <div className="absolute top-[65%] -left-[-50%] transform translate-y-[-50%] w-[100%]">
                            <motion.img
                                className="scale-[1.5] rotate-[45deg]"
                                src={images.shapeWave3}
                                alt="shape"
                                initial={{ WebkitMaskSize: "0% 100%", opacity: 0 }}
                                animate={{ WebkitMaskSize: "100% 100%", opacity: 0.3 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Box>
                                <h5 className="text-[13px] leading-[1] font-semibold mb-[6px] opacity-90">Thành viên HGD</h5>
                                <h4 className="text-[20px] leading-[1] font-semibold">{residentNumberQuery.isLoading ? <Icon icon='line-md:loading-twotone-loop' /> : residentNumberQuery.data}</h4>
                            </Box>
                        </div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default StatisticList