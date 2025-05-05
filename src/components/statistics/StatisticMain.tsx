import React from "react";
import { Box, useNavigate } from "zmp-ui";
import { motion } from "framer-motion";
import images from "assets/images";

const StatisticMain: React.FC<any> = () => {

    const navigate = useNavigate();

    return (
        <Box mt={3}>
            <div className="bg-[#1d5488] text-white w-[100%] p-3 py-4 rounded-xl relative overflow-hidden" onClick={() => navigate('/maps')}>
                <div className="absolute top-[50%] left-0 transform translate-y-[-50%] w-[100%]">
                    <motion.img
                        className="invert brightness-0 w-[100%]"
                        src={images.shapeWave}
                        alt="shape"
                        style={{
                            WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
                            maskImage: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
                        }}
                        initial={{ WebkitMaskSize: "0% 100%", opacity: 0 }}
                        animate={{ WebkitMaskSize: "100% 100%", opacity: 0.18 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative z-2">
                        <div className="grid grid-cols-2 gap-2 gap-y-3">
                            <h5 className="text-[13px] leading-[1] font-medium">
                                <span className="opacity-90">Hộ nghèo:</span> <span className="text-[16px] font-bold opacity-100">5%</span>
                            </h5>
                            <h5 className="text-[13px] leading-[1] font-medium">
                                <span className="opacity-90">Hộ cận nghèo:</span> <span className="text-[16px] font-bold opacity-100">15%</span>
                            </h5>
                            <h5 className="text-[13px] leading-[1] font-medium">
                                <span className="opacity-90">Gia đình văn hóa:</span> <span className="text-[16px] font-bold opacity-100">5%</span>
                            </h5>
                            <h5 className="text-[13px] leading-[1] font-medium">
                                <span className="opacity-90">Phản ánh đã xử lý:</span> <span className="text-[16px] font-bold opacity-100">25%</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default StatisticMain