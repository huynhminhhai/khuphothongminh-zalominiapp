import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

interface UserInfoSkeletonProps {
}

const UserInfoSkeleton: React.FC<UserInfoSkeletonProps> = () => {
    return (
        <Box>
            {/* <Box>
                <div className="relative flex flex-col items-center justify-center py-[30px] overflow-hidden">
                    <Skeleton circle width={120} height={120} className="relative border-[4px] border-white" />
                    <Skeleton width={150} height={20} className="mt-3" />
                </div>
            </Box> */}
            <Box p={4}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="mb-3">
                        <Skeleton width={200} height={16} />
                        <Skeleton width={"100%"} height={20} />
                    </div>
                ))}
            </Box>
        </Box>
    )
}

export default UserInfoSkeleton
