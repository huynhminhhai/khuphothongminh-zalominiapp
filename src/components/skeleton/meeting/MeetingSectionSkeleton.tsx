import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface MeetingSectionSkeletonProps {
    count: number;
}

const MeetingSectionSkeleton: React.FC<MeetingSectionSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box p={4} key={index}>
                    <div className='flex items-center justify-between mb-4'>
                        <Skeleton count={1} width={150} />
                        <Skeleton count={1} width={100} />
                    </div>
                    <Box flex alignItems='center' className='gap-3'>
                        <div className='w-[108px] h-[152px] rounded-tl-2xl rounded-br-2xl relative overflow-hidden'>
                            <Skeleton count={1} width={108} height={152} />
                        </div>
                        <div className='flex-1'>
                            <Skeleton count={5} />
                        </div>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default MeetingSectionSkeleton
