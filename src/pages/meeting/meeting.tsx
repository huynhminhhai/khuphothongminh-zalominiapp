import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { MeetingList } from "components/meeting"
import { FilterBar2 } from "components/table"
import React from "react"
import { Box, Input, Page, Select } from "zmp-ui"

const MeetingPage: React.FC = () => {

    const { Option } = Select;

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cuộc họp" />
                <Box>
                    <Box>
                        <FilterBar2
                            searchComponent={
                                <Input.Search
                                    placeholder='Tìm kiếm...'
                                    value={''}
                                    onChange={(e) => console.log(e.target.value)}
                                />
                            }
                        >
                            <div className="col-span-12">
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
                            </div>
                        </FilterBar2>
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