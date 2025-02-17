import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface TeamSkeletonProps {
  count: number;
}

const TeamSkeleton: React.FC<TeamSkeletonProps> = ({ count }) => {
    return (
        <Box>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {Array.from({ length: count }).map((_, index) => (
                    <Box key={index} px={3} py={6} className="box-shadow-3 rounded-lg">
                    <div className="flex flex-col items-center gap-3">
                        <Skeleton height={60} width={60} />
                        <Skeleton count={2} />
                    </div>
                </Box>
                ))}
            </div>
        </Box>
    )
}

export default TeamSkeleton
