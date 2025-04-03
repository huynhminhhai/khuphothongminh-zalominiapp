import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { TaskList } from "components/task"
import React from "react"
import { Box, Page, Select } from "zmp-ui"

const TaskPage: React.FC = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Nhiệm vụ" />
                <Box>
                    <TaskList />
                </Box>
            </Box>
        </Page>
    )
}

export default TaskPage