import { HeaderSub } from "components/header-sub"
import { TaskCreateForm } from "components/task"
import React from "react"
import { Box, Page } from "zmp-ui"

const TaskAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm nhiệm vụ" />
                <TaskCreateForm />
            </Box>
        </Page>
    )
}

export default TaskAddPage