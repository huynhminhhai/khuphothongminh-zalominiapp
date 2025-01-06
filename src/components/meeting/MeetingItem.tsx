import React from "react";
import { meetingColor, meetingStatus, MeetingType } from "constants/utinities";
import { Box } from "zmp-ui";
import { renderDayOfWeek } from "utils/date";

type MeetingItemProps = {
    data: MeetingType
}

const MeetingItem: React.FC<MeetingItemProps> = ({ data }) => {
    return (
        <Box className="meeting-item">
            <Box>
                <div className="flex gap-4">
                    <Box px={4} py={6} className="bg-[#e9ca9433] text-[#731611] rounded-tl-2xl rounded-br-2xl">
                        <div className="flex-center flex-col h-[100%]">
                            <div className="text-[18px] leading-[1] font-semibold text-center mb-2 whitespace-nowrap">{renderDayOfWeek(data.date)}</div>
                            <div className="text-[14px] leading-[1] font-medium text-center">{data.date}</div>
                        </div>
                    </Box>
                    <Box py={3}>
                        <h3 className="text-[16px] leading-[22px] font-semibold line-clamp-2 mb-1">{data.title}</h3>
                        <div className="flex">
                            <Box>
                                <ul className="text-[14px] font-normal text-[#7c7c7c]">
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