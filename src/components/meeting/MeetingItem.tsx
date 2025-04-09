import React from "react";
import { Box, useNavigate } from "zmp-ui";
import { formatDate, getHourFromDate, getMeetingStatus, renderDayOfWeek } from "utils/date";
import { MeetingType } from "./type";
import { Icon } from "@iconify/react";
import images from "assets/images";

type MeetingItemProps = {
    data: MeetingType
}

export const MeetingStatus: React.FC<{ meetingDate: string, startTime: string, endTime: string }> = ({ meetingDate, startTime, endTime }) => {
    const { status, bgColor, color } = getMeetingStatus(meetingDate, startTime, endTime);

    return (
        <div style={{ backgroundColor: bgColor, color  }} className="mt-2 py-[6px] px-3 text-white w-fit rounded-xl text-[12px] leading-[1] font-semibold">
            {status}
        </div>
    );
};

const MeetingItem: React.FC<MeetingItemProps> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box className="meeting-item" onClick={() => navigate(`/meeting-detail?id=${data.cuocHopId}`)}>
            <Box>
                <div className="flex items-start gap-4">
                    <Box px={4} py={6} width={108} height={152} className="bg-[#e9ca9433] text-[#003080] rounded-tl-2xl rounded-br-2xl relative overflow-hidden">
                        <img className="w-[100%] h-[100%] absolute top-0 left-0 opacity-5 scale-[2.5]" src={images.shape4} alt="shape" />
                        <div className="flex-center flex-col h-[100%] relative z-[2]">
                            <div className="text-[18px] leading-[1] font-semibold text-center mb-2 whitespace-nowrap">{renderDayOfWeek(formatDate(data.thoiGianBatDau))}</div>
                            <div className="text-[14px] leading-[1] font-medium text-center">{formatDate(data.thoiGianBatDau)}</div>
                        </div>
                    </Box>
                    <Box py={2} className="flex-1">
                        <h3 className="text-[16px] leading-[22px] font-semibold line-clamp-2 mb-2">{data.tieuDe}</h3>
                        <div className="flex flex-col">
                            <Box>
                                <ul className="flex flex-col gap-[6px] text-[14px] leading-4 font-normal text-[#666666] mb-1">
                                    <li className="flex items-start gap-1">
                                        <Icon fontSize={18} icon='qlementine-icons:location-16'/> <span className="flex-1 font-medium line-clamp-2 whitespace-normal">{data.diaDiem}</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                        <Icon fontSize={18} icon='ion:time-outline' /> <span className="font-medium flex-1">{getHourFromDate(data.thoiGianBatDau)} - {getHourFromDate(data.thoiGianKetThuc)}</span>
                                    </li>
                                </ul>
                                {/* {
                                    data.status && 
                                    <div style={{backgroundColor: meetingColor[data.status]}} className="mt-2 py-1 px-2 text-white w-fit rounded-xl text-[12px] leading-[1] font-medium">
                                        {
                                            meetingStatus[data.status]
                                        }
                                    </div>
                                } */}
                            </Box>
                            <MeetingStatus meetingDate={formatDate(data.thoiGianBatDau)} startTime={getHourFromDate(data.thoiGianBatDau)} endTime={getHourFromDate(data.thoiGianKetThuc)} />
                        </div>
                    </Box>
                </div>
            </Box>
        </Box>
    )
}

export default MeetingItem