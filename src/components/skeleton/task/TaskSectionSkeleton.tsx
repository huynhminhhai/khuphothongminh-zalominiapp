import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface TaskSectionSkeletonProps {
    count: number;
}

const TaskSectionSkeleton: React.FC<TaskSectionSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box p={4} key={index}>
                    <div className='flex items-center justify-between mb-4'>
                        <Skeleton count={1} width={150} />
                        <Skeleton count={1} width={100} />
                    </div>
                    <Box flex alignItems='center' className='gap-3'>
                        <Skeleton count={1} width={50} height={50} />
                        <div className='flex-1'>
                            <Skeleton count={4} />
                        </div>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default TaskSectionSkeleton
