import { Icon } from "@iconify/react"
import images from "assets/images"
import { taskPriority, taskStatus } from "constants/mock"
import { TaskType } from "constants/utinities"
import React from "react"
import { getLabelOptions } from "utils/options"
import { Box, useNavigate } from "zmp-ui"

type TaskItemProps = {
    data: TaskType
}

const TaskItem: React.FC<TaskItemProps> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(`/task-detail?id=${data.id}`)}
        >
            <Box py={4} className="border-b-[1px]" flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-3 w-[100%]">
                    <Box>
                        <img className="w-[60px]" src={images.todo} alt={data.title} />
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2 mb-2">{data.title}</h3>

                            <div className="flex items-center justify-between w-[100%]  mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-[12px] text-white font-medium leading-[1] bg-red-600 px-2 py-[6px] rounded-xl"
                                        style={{
                                            backgroundColor: data.priority === 1 ? '#16a34a' : data.priority === 2 ? '#eab308' : '#dc2626'
                                        }}
                                    >
                                        {
                                            getLabelOptions(data.priority, taskPriority)
                                        }
                                    </div>
                                    <div className="text-[12px] text-white font-medium leading-[1] bg-gray-500 px-2 py-[6px] rounded-xl">
                                        {
                                            getLabelOptions(data.status, taskStatus)
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-[100%]">
                                <h4 className="flex items-center gap-1 text-[14px] font-normal text-[#7c7c7c]"><Icon fontSize={18} icon='uiw:date' /> {data.dueDate}</h4>
                            </div>
                            
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TaskItem