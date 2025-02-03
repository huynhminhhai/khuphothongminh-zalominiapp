import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { MeetingList } from "components/meeting"
import { FormDataMeeting } from "components/meeting/type"
import { MEETING, MEETINGDATA } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Page, Select } from "zmp-ui"

const MeetingPage: React.FC = () => {

    const { Option } = Select;

    const [filteredMeetings, setFilteredMeetings] = useState<FormDataMeeting[]>(MEETINGDATA);

    // const handleFilterChange = (value: number) => {
    //     let filtered = MEETINGDATA;

    //     if (value !== 4) {
    //         filtered = MEETING.filter(meeting => meeting.status === value);
    //     }

    //     setFilteredMeetings(filtered);
    // };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cuộc họp" />
                <Box>
                    <Box px={4} pb={4} pt={1} flex>
                        <div className="text-[#731611] flex items-center gap-1 border-r-[1px] pr-2 mr-2">
                            <Icon fontSize={20} icon='mdi:filter-outline' />
                            <span className="text-[16px] font-semibold">Lọc</span>
                        </div>
                        <Box className="filter">
                            <Select
                                placeholder="Placeholder"
                                defaultValue={4}
                                // onChange={(value) => handleFilterChange(value as number)}
                                closeOnSelect={true}
                            >
                                <Option value={4} title="Tất cả" />
                                <Option value={1} title="Đã diễn ra" />
                                <Option value={2} title="Sắp/Đang diễn ra" />
                                <Option value={3} title="Đã hủy" />
                            </Select>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={4}>
                        <MeetingList data={MEETINGDATA} />
                        <div className="flex items-center justify-center gap-3 pt-6 pb-2 border-t-[1px] border-[#e5e7eb] mt-4">
                            <Button onClick={() => console.log('call api list news')} size="medium">Xem thêm</Button>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default MeetingPage