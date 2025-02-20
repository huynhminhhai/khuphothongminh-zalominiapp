import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface NewsSectionSkeletonProps {
    count: number;
}

const NewsSectionSkeleton: React.FC<NewsSectionSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box p={4} key={index}>
                    <div className='flex items-center justify-between mb-4'>
                        <Skeleton count={1} width={150} />
                        <Skeleton count={1} width={100} />
                    </div>
                    <Skeleton count={1} height={200} />
                    <Box mt={2}>
                        <Skeleton count={2} />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default NewsSectionSkeleton
