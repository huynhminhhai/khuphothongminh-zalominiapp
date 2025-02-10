import TitleSection from "components/titleSection"
import React from "react"
import { Box, Swiper, useNavigate } from "zmp-ui"
import TaskItem from "./TaskItem"
import { TASKS } from "constants/utinities"

const TaskSection: React.FC<any> = () => {

    const navigate = useNavigate()

    const firstTwoTasks = TASKS.slice(0, 2);

    return (
        <Box>
            <Box px={4} pt={4} pb={0}>
                <TitleSection title="Nhiệm vụ hôm nay" handleClick={() => navigate('/task')} />
                <Box>
                    <Swiper
                        loop
                        duration={12000}
                        autoplay
                        className="pb-6"
                    >
                        {
                            firstTwoTasks.map((item, index) => (
                                <Swiper.Slide key={index}>
                                    <TaskItem key={index} data={item} />
                                </Swiper.Slide>
                            ))
                        }
                    </Swiper>
                </Box>
            </Box>
        </Box>
    )
}

export default TaskSection