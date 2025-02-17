import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface NewsSkeletonProps {
  count: number;
}

const NewsSkeleton: React.FC<NewsSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box key={index}>
                    <div
                        className="flex items-center gap-3 news-item py-4 border-b-[1px]"
                    >
                        <div className="w-[150px] h-[110px]">
                            <Skeleton height={110} width={150} />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                            <Skeleton count={5} />
                        </div>
                    </div>
                </Box>
            ))}
        </Box>
    )
}

export default NewsSkeleton
