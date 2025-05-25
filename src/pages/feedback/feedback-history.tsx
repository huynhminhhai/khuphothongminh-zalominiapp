import { Icon } from "@iconify/react";
import { useGetMyFeedbackList } from "apiRequest/feeback";
import { EmptyData } from "components/data";
import { FeedbackItem } from "components/feedback"
import FeedbackItemHistory from "components/feedback/FeedbackItemHistory";
import { HeaderSub } from "components/header-sub"
import { FeedbackSkeleton } from "components/skeleton";
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store";
import { useCheckRequireApId } from "utils/permission";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { Box, Button, Page, useNavigate } from "zmp-ui"

const FeedbackHistoryPage: React.FC = () => {

    const { account } = useStoreApp()
    const checkRequireApId = useCheckRequireApId();

    const navigate = useNavigate()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        NguoiTao: account?.nguoiDungId
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
                <HeaderSub title="Phản ánh đã gửi" onBackClick={() => navigate('/feedback')} />
                <Box>
                    {
                        isLoading ? <FeedbackSkeleton count={5} /> :
                            <div className="grid grid-cols-1">
                                {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                                    <Box px={4}>
                                        <Box mb={3}>
                                            <EmptyData title="Bạn chưa có phản ánh nào!" />
                                        </Box>
                                        <Button variant="primary" size="medium" fullWidth
                                            onClick={() => checkRequireApId(() => {
                                                navigate('/feedback-add');
                                            })}
                                        >
                                            <div className="flex items-center justify-center gap-1">
                                                <Icon fontSize={16} icon='line-md:edit' />
                                                <span>Gửi phản ánh</span>
                                            </div>
                                        </Button>
                                    </Box>
                                ) : (
                                    <>
                                        {listData.map((item, index) => (
                                            <FeedbackItemHistory key={index} data={item} />
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