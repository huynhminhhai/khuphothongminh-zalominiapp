import React from "react"
import { Box } from "zmp-ui"
import { useGetChuHosList, useGetResidentData } from "apiRequest/resident"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion";
import images from "assets/images";
import { useGetSoLieuHienThi, useGetSoLuongTaiKhoanTrongAp } from "apiRequest/app";

const StatisticList: React.FC<any> = () => {

    const { familyNumberQuery, residentNumberQuery } = useGetResidentData();
    const { data, isLoading } = useGetSoLieuHienThi();
    const { data: soLuongTaiKhoanTrongAp, isLoading: isLoadingSoLuongTaiKhoanTrongAp } = useGetSoLuongTaiKhoanTrongAp();

    console.log(soLuongTaiKhoanTrongAp)

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
                        </div>
                    </div>
                </Box>

            </div>
            <Box mt={3}>
                <div className="bg-blue-50 text-[#153568] w-[100%] p-3 py-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-[50%] left-0 transform translate-y-[-50%] w-[100%]">
                        <motion.img
                            src={images.shapeWave}
                            initial={{ WebkitMaskSize: "0% 100%", opacity: 0 }}
                            animate={{ WebkitMaskSize: "100% 100%", opacity: 0.1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="relative z-2">
                            <div className="grid grid-cols-2 gap-2 gap-y-3">
                                <h5 className="text-[13px] leading-[1] font-semibold flex items-center gap-1">
                                    <span className="opacity-90">Hộ nghèo:</span> <span className="text-[16px] font-semibold opacity-100">
                                        {
                                            isLoading ? (
                                                <Icon icon="line-md:loading-twotone-loop" />
                                            ) : (
                                                `${((data?.soLuongHoNgheo ? (data.soLuongHoNgheo) : 0))}`
                                            )
                                        }
                                    </span>
                                </h5>
                                <h5 className="text-[13px] leading-[1] font-semibold flex items-center gap-1">
                                    <span className="opacity-90">Hộ cận nghèo:</span> <span className="text-[16px] font-semibold opacity-100">
                                        {
                                            isLoading ? (
                                                <Icon icon="line-md:loading-twotone-loop" />
                                            ) : (
                                                `${((data?.soLuongCanNgheo
                                                    ? (data.soLuongCanNgheo)
                                                    : 0))}`
                                            )
                                        }
                                    </span>
                                </h5>
                                <h5 className="text-[13px] leading-[1] font-semibold flex items-center gap-1">
                                    <span className="opacity-90">Đạt văn hóa:</span> <span className="text-[16px] font-semibold opacity-100">
                                        {
                                            isLoading ? (
                                                <Icon icon="line-md:loading-twotone-loop" />
                                            ) : (
                                                `${((data?.soLuongGiaDinhVanHoa
                                                    ? (data.soLuongGiaDinhVanHoa)
                                                    : 0))}`
                                            )
                                        }
                                    </span>
                                </h5>
                                <h5 className="text-[13px] leading-[1] font-semibold flex items-center gap-1">
                                    <span className="opacity-90">Người dùng:</span> <span className="text-[16px] font-semibold opacity-100">
                                        {
                                            isLoadingSoLuongTaiKhoanTrongAp ? (
                                                <Icon icon="line-md:loading-twotone-loop" />
                                            ) : (
                                                `${((soLuongTaiKhoanTrongAp
                                                    ? (soLuongTaiKhoanTrongAp)
                                                    : 0))}`
                                            )
                                        }
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default StatisticList