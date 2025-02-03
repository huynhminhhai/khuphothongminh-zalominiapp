import React from "react";
import { meetingColor, meetingStatus } from "constants/utinities";
import { Box, useNavigate } from "zmp-ui";
import { renderDayOfWeek } from "utils/date";
import { FormDataMeeting } from "./type";
import { Icon } from "@iconify/react";

type MeetingItemProps = {
    data: FormDataMeeting
}

const MeetingItem: React.FC<MeetingItemProps> = ({ data }) => {
    
    const navigate = useNavigate()
    
    return (
        <Box className="meeting-item" onClick={() => navigate(`/meeting-detail?id=${data.id}`)}>
            <Box>
                <div className="flex gap-4">
                    <Box px={4} py={6} width={108} height={152} className="bg-[#e9ca9433] text-[#731611] rounded-tl-2xl rounded-br-2xl">
                        <div className="flex-center flex-col h-[100%]">
                            <div className="text-[18px] leading-[1] font-semibold text-center mb-2 whitespace-nowrap">{renderDayOfWeek(data.meetingDate)}</div>
                            <div className="text-[14px] leading-[1] font-medium text-center">{data.meetingDate}</div>
                        </div>
                    </Box>
                    <Box py={2} className="flex-1">
                        <h3 className="text-[16px] leading-[22px] font-semibold line-clamp-2 mb-1">{data.title}</h3>
                        <div className="flex">
                            <Box>
                                <ul className="flex flex-col gap-[2px] text-[14px] font-normal text-[#7c7c7c]">
                                    <li className="flex items-start gap-2">
                                        <Icon fontSize={18} icon='tdesign:location-filled' /> <span className="flex-1 font-medium line-clamp-2">{data.address}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Icon fontSize={18} icon='mingcute:time-fill' /> <span className="font-medium">{data.startTime} - {data.endTime}</span>
                                    </li>
                                </ul>
                                {
                                    data.status && 
                                    <div style={{backgroundColor: meetingColor[data.status]}} className="mt-2 py-1 px-2 text-white w-fit rounded-xl text-[12px] leading-[1] font-medium">
                                        {
                                            meetingStatus[data.status]
                                        }
                                    </div>
                                }
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