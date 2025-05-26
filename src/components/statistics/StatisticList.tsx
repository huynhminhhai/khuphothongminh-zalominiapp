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
        <Box>
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
                            {/* <svg className="absolute bottom-[-20%] right-[-2%] opacity-70" xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24"><g fill="none" stroke="#153568" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path strokeDasharray={16} strokeDashoffset={16} d="M4.5 21.5h15"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"></animate></path><path strokeDasharray={16} strokeDashoffset={16} d="M4.5 21.5v-13.5M19.5 21.5v-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="16;0"></animate></path><path strokeDasharray={28} strokeDashoffset={28} d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="28;0"></animate></path><path strokeDasharray={24} strokeDashoffset={24} d="M9.5 21.5v-9h5v9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.4s" values="24;0"></animate></path></g></svg> */}
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
                                <h5 className="text-[13px] leading-[1] font-semibold mb-[6px] opacity-90">Nhân khẩu</h5>
                                <h4 className="text-[20px] leading-[1] font-semibold">{residentNumberQuery.isLoading ? <Icon icon='line-md:loading-twotone-loop' /> : residentNumberQuery.data}</h4>
                            </Box>
                            {/* <svg className="absolute bottom-[-20%] right-[-5%] opacity-70" xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24"><g fill="none" stroke="#153568" strokeDasharray={28} strokeDashoffset={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"></animate></path><path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="28;0"></animate></path></g></svg> */}
                        </div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default StatisticList