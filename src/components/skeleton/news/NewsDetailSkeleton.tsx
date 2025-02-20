import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface NewsDetailSkeletonProps {
    count: number;
}

const NewsDetailSkeleton: React.FC<NewsDetailSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box px={4} pb={4} key={index}>
                    <Skeleton count={1} width={80} />
                    <Skeleton count={2} height={38} />
                    <Skeleton count={1} width={100} />
                    <Skeleton count={1} height={200} />
                    <Skeleton count={12} />
                </Box>
            ))}
        </Box>
    )
}

export default NewsDetailSkeleton
