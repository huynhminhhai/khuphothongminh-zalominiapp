import { Icon } from "@iconify/react"
import images from "assets/images"
import { taskPriority, taskStatus } from "constants/mock"
import React from "react"
import { getLabelOptions } from "utils/options"
import { Box, useNavigate } from "zmp-ui"
import { TaskType } from "./type"
import { formatDate } from "utils/date"
import { getTinhTrangTaskColor } from "utils/renderColor"

type TaskItemProps = {
    data: TaskType
}

const TaskItem: React.FC<TaskItemProps> = ({data}) => {

    const navigate = useNavigate()

    const { color, bg } = getTinhTrangTaskColor(data.tinhTrang.tenTinhTrang);

    return (
        <Box
            onClick={() => navigate(`/task-detail?id=${data.nhiemVuId}`)}
            className="task-item border-b-[1px]"
        >
            <Box py={4} flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-4 w-[100%]">
                    <Box>
                        <img className="w-[60px]" src={images.todo} alt={data.tieuDe} />
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <h3 className="text-[16px] leading-[22px] font-semibold line-clamp-2 mb-2">{data.tieuDe}</h3>

                            <div className="flex items-center justify-between w-[100%] mb-2">
                                <h4 className="flex items-center gap-2 text-[14px] font-medium text-gray-color"><Icon fontSize={16} icon='uiw:date' /> {formatDate(data.thoiHanXuLy)}</h4>
                            </div>

                            <div className="flex items-center justify-between w-[100%]">
                                <div className="flex items-center gap-2">
                                    {/* <div className="text-[12px] text-white font-medium leading-[1] bg-red-600 px-2 py-[6px] rounded-xl"
                                        style={{
                                            backgroundColor: data.priority === 1 ? '#16a34a' : data.priority === 2 ? '#eab308' : '#dc2626'
                                        }}
                                    >
                                        {
                                            getLabelOptions(data.priority, taskPriority)
                                        }
                                    </div> */}
                                    <div className={`${color} ${bg} text-[12px] font-semibold leading-[1] px-3 py-[6px] rounded-xl`}>
                                        {
                                            data.tinhTrang.tenTinhTrang
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TaskItem