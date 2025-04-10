import React from "react";
import Skeleton from "react-loading-skeleton";
import { Box } from "zmp-ui";

interface InvoiceItemSkeletonProps {
    count: number;
}

const InvoiceItemSkeleton: React.FC<InvoiceItemSkeletonProps> = ({ count }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box p={4} key={index}>
                    <Box flex alignItems='flex-start' className='gap-3 w-full' justifyContent="space-between">
                        <div>
                            <Skeleton count={1} width={150} height={20} />
                            <Skeleton count={1} width={120} height={14} />
                        </div>
                        <Skeleton count={1} width={120} />
                    </Box>
                    <Skeleton count={1} height={1} />
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <Box flex flexDirection="column" className="gap-1">
                            <Skeleton count={1} height={10} width={60} />
                            <Skeleton count={1} height={14} width={100} />
                        </Box>
                        <Box flex flexDirection="column" className="gap-1">
                            <Skeleton count={1} height={10} width={60} />
                            <Skeleton count={1} height={14} width={100} />
                        </Box>
                    </div>
                </Box>
            ))}
        </Box>
    )
}

export default InvoiceItemSkeleton