import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface FeedbackSkeletonProps {
    count: number;
}

const FeedbackSkeleton: React.FC<FeedbackSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box
                    pb={4} mb={4} className="border-b-[1px]" key={index}
                >
                    <Box>
                        <Skeleton height={200} />
                    </Box>
                    <Box mt={2}>
                        <Skeleton count={3} />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default FeedbackSkeleton
