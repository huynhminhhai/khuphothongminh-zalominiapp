import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { MeetingList } from "components/meeting"
import React from "react"
import { Box, Page, Select } from "zmp-ui"

const MeetingPage: React.FC = () => {

    const { Option } = Select;

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
                    <Box>
                        <MeetingList />
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default MeetingPage