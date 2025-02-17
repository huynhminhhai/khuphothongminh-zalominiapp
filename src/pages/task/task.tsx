import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { TaskList } from "components/task"
import { TASKS, TaskType } from "constants/utinities"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Page, Select } from "zmp-ui"

const TaskPage: React.FC = () => {

    const { Option } = Select

    const [filteredMeetings, setFilteredMeetings] = useState<TaskType[]>(TASKS);
    const navigate = useNavigate()

    const handleFilterChange = (value: number) => {
        let filtered = TASKS;

        if (value !== 5) {
            filtered = TASKS.filter(task => task.status === value);
        }

        setFilteredMeetings(filtered);
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Nhiệm vụ" />
                <Box>
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
                                            defaultValue={5}
                                            onChange={(value) => handleFilterChange(value as number)}
                                            closeOnSelect={true}
                                        >
                                            <Option value={5} title="Tất cả" />
                                            <Option value={1} title="Chưa bắt đầu" />
                                            <Option value={2} title="Đang thực hiện" />
                                            <Option value={3} title="Hoàn thành" />
                                            <Option value={4} title="Quá hạn" />
                                        </Select>
                                    </Box>
                                </Box>
                            </div>
                        </Box>
                        <Divider />
                        <Box>
                            <TaskList />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default TaskPage