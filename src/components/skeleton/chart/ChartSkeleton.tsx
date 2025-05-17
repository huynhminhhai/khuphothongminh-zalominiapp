import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface ChartSkeletonProps {
    count: number;
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ count }) => {
    return (
        <div className='p-4 flex flex-col gap-6'>
            <div className='p-4 box-shadow-4 flex flex-col gap-0 text-center'>
                <Skeleton count={2} />
                <Skeleton height={12} width={120} />
                <Skeleton height={12} width={80} />
                <Skeleton height={12} width={180} />
            </div>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className='p-4 box-shadow-4 flex flex-col gap-6'>
                    <Skeleton count={2} />
                    <div className="flex items-end gap-2 h-fit">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="w-10 bg-gray-200 animate-pulse h-full"
                                style={{ height: `${40 + i * 15}px`, borderRadius: '4px' }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChartSkeleton
