import { useGetFeedback1022List } from "apiRequest/feedback1022"
import { EmptyData } from "components/data"
import { FeedbackItem1022, FeedbackMenu } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FeedbackSkeleton, TaskItemSkeleton } from "components/skeleton"
import React, { useState } from "react"
import { useStoreApp } from "store/store"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { Box, Page, useNavigate } from "zmp-ui"

const Feedback1022Page: React.FC = () => {

    const { account } = useStoreApp()

    const navigate = useNavigate()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetFeedback1022List(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Phản ánh (từ 1022)" onBackClick={() => navigate('/')} />
                <Box px={4} pb={4}>
                    <Box>
                        {
                            isLoading ? <TaskItemSkeleton count={5} /> :
                                <div className="grid grid-cols-1">
                                    {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                                        <Box px={4}>
                                            <EmptyData title="Hiện chưa có phản ánh nào!" />
                                        </Box>
                                    ) : (
                                        <>
                                            {listData
                                                .map((item, index) => (
                                                    <FeedbackItem1022 key={index} data={item} />
                                                ))}
                                        </>
                                    )}
                                </div>
                        }
                    </Box>
                    <div ref={loaderRef} className="pt-4">
                        {isFetchingNextPage && <TaskItemSkeleton count={1} />}
                        {listData.length > 0 && !hasNextPage && <p className="text-center">Đã hiển thị tất cả phản ánh (từ 1022)</p>}
                    </div>
                </Box>
            </Box>
        </Page>
    )
}

export default Feedback1022Page