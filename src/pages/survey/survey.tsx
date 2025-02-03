import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { SurveyList } from "components/survey"
import { SURVEYDATA, SurveyType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Page, Select, useNavigate } from "zmp-ui"

const SurveyPage: React.FC = () => {

    const { Option } = Select

    const [filteredMeetings, setFilteredMeetings] = useState<SurveyType[]>(SURVEYDATA);
    const navigate = useNavigate()

    const handleFilterChange = (value: number) => {
        let filtered = SURVEYDATA;

        if (value !== 4) {
            filtered = SURVEYDATA.filter(meeting => meeting.status === value);
        }

        setFilteredMeetings(filtered);
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Khảo sát ý kiến" />
                <Box>
                    <Box px={4} pb={4}>
                        <div className="flex flex-col gap-3">
                            <Box flex>
                                <div className="text-[#731611] flex items-center gap-1 border-r-[1px] pr-2 mr-2">
                                    <Icon fontSize={20} icon='mdi:filter-outline' />
                                    <span className="text-[16px] font-semibold">Lọc</span>
                                </div>
                                <Box className="filter">
                                    <Select
                                        placeholder="Placeholder"
                                        defaultValue={4}
                                        onChange={(value) => handleFilterChange(value as number)}
                                        closeOnSelect={true}
                                    >
                                        <Option value={4} title="Tất cả" />
                                        <Option value={2} title="Đã hoàn thành" />
                                        <Option value={1} title="Chưa hoàn thành" />
                                    </Select>
                                </Box>
                            </Box>
                        </div>
                    </Box>
                    <Divider />
                    <Box px={4} pb={4}>
                        <Box>
                            <SurveyList data={filteredMeetings} />
                            {
                                filteredMeetings.length > 0 &&
                                <div className="flex items-center justify-center gap-3 pt-6 pb-2">
                                    <Button onClick={() => console.log('call api')} size="medium">Xem thêm</Button>
                                </div>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default SurveyPage