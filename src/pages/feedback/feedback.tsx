import { useGetFeedbackList } from "apiRequest/feeback"
import { EmptyData } from "components/data"
import { FeedbackItem, FeedbackMenu } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FeedbackSkeleton } from "components/skeleton"
import React, { useState } from "react"
import { useStoreApp } from "store/store"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { Box, Page } from "zmp-ui"

const FeedbackPage: React.FC = () => {

    const { account } = useStoreApp()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: ''
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetFeedbackList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Góp ý - Phản ánh" />
                <Box px={4} pb={4}>
                    <FeedbackMenu />
                    <Box>
                        {
                            isLoading ? <FeedbackSkeleton count={5} /> :
                                <div className="grid grid-cols-1">
                                    {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                                        <Box px={4}>
                                            <EmptyData title="Hiện chưa có phản ánh nào!" />
                                        </Box>
                                    ) : (
                                        <>
                                            {listData
                                                .filter((item) => item.congKhaiPhanAnh === true)
                                                .map((item, index) => (
                                                    <FeedbackItem key={index} data={item} />
                                                ))}
                                        </>
                                    )}
                                </div>
                        }
                    </Box>
                    <div ref={loaderRef} className="px-4">
                        {isFetchingNextPage && <FeedbackSkeleton count={1} />}
                        {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả phản ánh</p>}
                    </div>
                </Box>
            </Box>
        </Page>
    )
}

export default FeedbackPage