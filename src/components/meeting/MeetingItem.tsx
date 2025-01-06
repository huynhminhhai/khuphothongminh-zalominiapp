import React from "react";
import { meetingColor, meetingStatus, MeetingType } from "constants/utinities";
import { Box } from "zmp-ui";
import { Icon } from "@iconify/react";

type MeetingItemProps = {
    data: MeetingType
}

const MeetingItem: React.FC<MeetingItemProps> = ({ data }) => {
    return (
        <Box>
            <Box pb={4} className="border-b-[1px]">
                <div className="flex gap-3">
                    <Box px={4} py={6} className="bg-[#e9ca9433] clip-path-1">
                        <div className="flex-center flex-col h-[100%]">
                            <div className="text-[18px] leading-[1] font-semibold text-center mb-2">Thứ 2</div>
                            <div className="text-[14px] leading-[1] font-medium text-center">{data.date}</div>
                        </div>
                    </Box>
                    <Box py={3}>
                        <h3 className="text-[16px] leading-[22px] font-semibold line-clamp-2 mb-1">{data.title}</h3>
                        <div className="flex">
                            <Box>
                                <ul className="text-[14px] font-medium text-[#7c7c7c]">
                                    <li>
                                        Địa điểm: {data.location}
                                    </li>
                                    <li>
                                        Thời gian: {data.time}
                                    </li>
                                </ul>
                                <div style={{backgroundColor: meetingColor[data.status]}} className="mt-2 py-1 px-2 text-white w-fit rounded-xl text-[12px] leading-[1] font-medium">
                                    {
                                        meetingStatus[data.status]
                                    }
                                </div>
                            </Box>
                            <Box>

                            </Box>
                        </div>
                    </Box>
                </div>
            </Box>
        </Box>
    )
}

export default MeetingItem