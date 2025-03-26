import { Icon } from "@iconify/react";
import React from "react";
import { Box } from "zmp-ui";

const StatisticMain: React.FC<any> = () => {
    return (
        <Box mt={3}>
            <div className="bg-[#52459f] text-white w-[100%] p-3 py-4 rounded-xl relative overflow-hidden">
                <img className="invert brightness-0 absolute top-[50%] left-0 transform translate-y-[-50%] w-[100%] opacity-[0.07]" src="https://images.vexels.com/media/users/3/145867/isolated/lists/015b2a1aac5e9d4d3c18376bbbae1819-sound-wave-line.png" alt="shape" />
                <div className="flex flex-col gap-3">
                    <div className="relative z-2">
                        <div className="grid grid-cols-2 gap-2 gap-y-3">
                            <h5 className="text-[13px] leading-[1] font-medium">
                                Hộ nghèo: <span className="text-[16px] font-bold">5%</span>
                            </h5>
                            <h5 className="text-[13px] leading-[1] font-medium">
                                Hộ cận nghèo: <span className="text-[16px] font-bold">15%</span>
                            </h5>
                            <h5 className="text-[13px] leading-[1] font-medium">
                                Gia đình văn hóa: <span className="text-[16px] font-bold">5%</span>
                            </h5>
                            <h5 className="text-[13px] leading-[1] font-medium">
                                Phản ánh đã xử lý: <span className="text-[16px] font-bold">25%</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default StatisticMain