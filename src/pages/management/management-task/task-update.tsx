import { HeaderSub } from "components/header-sub"
import { TaskUpdateForm } from "components/task"
import React from "react"
import { Box, Page } from "zmp-ui"

const TaskUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật nhiệm vụ" />
                <TaskUpdateForm />
            </Box>
        </Page>
    )
}

export default TaskUpdatePage