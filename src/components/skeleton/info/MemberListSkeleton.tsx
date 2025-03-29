import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from 'zmp-ui'

const MemberListSkeleton = () => {
    return (
        <Box pt={2}>
            <Box px={4} flex alignItems="center" justifyContent="space-between" className="gap-3">
                <Skeleton width={150} height={20} />

                <div className="w-[150px]">
                    <Skeleton height={35} />
                </div>
            </Box>
            <Box p={4}>
                <Skeleton count={5} height={35} />    
            </Box>
        </Box>
    );
};

export default MemberListSkeleton;