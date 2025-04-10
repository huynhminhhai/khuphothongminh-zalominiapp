import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface ManagementItemSkeletonProps {
    count: number;
}

const ManagementItemSkeleton: React.FC<ManagementItemSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box flexDirection='column' flex className='gap-4' p={4} key={index}>
                    <Box flex alignItems='center' className='gap-4'>
                        <Skeleton count={1} width={90} height={12} />
                        <div className='flex-1'>
                            <Skeleton count={1} height={150} />
                        </div>
                    </Box>
                    <Box flex alignItems='center' className='gap-4'>
                        <Skeleton count={1} width={90} height={12} />
                        <div className='flex-1'>
                            <Skeleton count={2} />
                        </div>
                    </Box>
                    <Box flex alignItems='center' className='gap-4'>
                        <Skeleton count={1} width={90} height={12} />
                        <div className='flex-1'>
                            <Skeleton count={1} height={30} width={120} />
                        </div>
                    </Box>
                    <Box flex alignItems='center' className='gap-4'>
                        <Skeleton count={1} width={90} height={12} />
                        <div className='flex-1 flex items-center gap-3'>
                            <Skeleton count={1} height={26} width={42} />
                            <Skeleton count={1} height={26} width={42} />
                            <Skeleton count={1} height={26} width={42} />
                        </div>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default ManagementItemSkeleton
