import { useGetMyFeedbackList } from "apiRequest/feeback";
import { EmptyData } from "components/data";
import { FeedbackItem } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FeedbackSkeleton } from "components/skeleton";
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { Box, Page, useNavigate } from "zmp-ui"

const FeedbackHistoryPage: React.FC = () => {

    const { account } = useStoreApp()

    const navigate = useNavigate()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: '',
        NguoiThucHienId: account ? account?.nguoiDungId : 0
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyFeedbackList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box px={4} pb={4}>
                <HeaderSub title="Phản ánh đã gửi" />
                <Box>
                    {
                        isLoading ? <FeedbackSkeleton count={5} /> :
                            <div className="grid grid-cols-1">
                                {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                                    <Box px={4}>
                                        <EmptyData title="Bạn chưa có phản ánh nào!" />
                                    </Box>
                                ) : (
                                    <>
                                        {listData.map((item, index) => (
                                                <FeedbackItem key={index} data={item} />
                                            ))}
                                    </>
                                )}
                            </div>
                    }
                </Box>
                <div ref={loaderRef} className="px-4">
                    {isFetchingNextPage && <FeedbackSkeleton count={1} />}
                    {listData.length > 0 && !hasNextPage && <p className="text-center">Đã hiển thị tất cả phản ánh của bạn</p>}
                </div>
            </Box>
        </Page>
    )
}

export default FeedbackHistoryPage