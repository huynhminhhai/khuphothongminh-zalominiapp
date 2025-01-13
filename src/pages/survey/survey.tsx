import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { SurveyList } from "components/survey"
import { SURVEYDATA, SurveyType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Page, Select } from "zmp-ui"

const SurveyPage: React.FC = () => {

    const {Option} = Select

    const [filteredMeetings, setFilteredMeetings] = useState<SurveyType[]>(SURVEYDATA);
    
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
                <Box p={4} flex>
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
                                <Option value={1} title="Đã diễn ra" />
                                <Option value={2} title="Đang diễn ra" />
                            </Select>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={4}>
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
        </Page>
    )
}

export default SurveyPage