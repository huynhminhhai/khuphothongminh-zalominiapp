import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { MeetingItem } from "components/meeting"
import { MEETING, MeetingType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Page, Select } from "zmp-ui"

const MeetingPage: React.FC = () => {

    const { Option } = Select;

    const [filteredMeetings, setFilteredMeetings] = useState<MeetingType[]>(MEETING);

    const handleFilterChange = (value: number) => {
        let filtered = MEETING;

        if (value !== 0) {
            filtered = MEETING.filter(meeting => meeting.status === value);
        }

        setFilteredMeetings(filtered);
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cuộc họp" />
                <Box>
                    <Box p={4} flex>
                        <div className="text-[#731611] flex items-center gap-1 border-r-[1px] pr-2 mr-2">
                            <Icon fontSize={20} icon='mdi:filter-outline' />
                            <span className="text-[16px] font-semibold">Lọc</span>
                        </div>
                        <Box className="filter">
                            <Select
                                placeholder="Placeholder"
                                defaultValue={1}
                                onChange={(value) => handleFilterChange(value as number)}
                                closeOnSelect={true}
                            >
                                <Option value={0} title="Tất cả" />
                                <Option value={1} title="Đã diễn ra" />
                                <Option value={2} title="Sắp/Đang diễn ra" />
                                <Option value={3} title="Đã hủy" />
                            </Select>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={4}>
                        <div className="grid grid-cols-1 gap-4">
                            {
                                filteredMeetings.map((item: MeetingType, index: React.Key) => (
                                    <MeetingItem key={index} data={item} />
                                ))
                            }
                        </div>
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