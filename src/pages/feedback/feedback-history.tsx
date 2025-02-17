import { EmptyData } from "components/data";
import { FeedbackItem, FeedbackList } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FeedbackSkeleton } from "components/skeleton";
import { FEEDBACKDATA } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { Box, Page, useNavigate } from "zmp-ui"

const initParam = {
    pageSize: 5,
};

const FeedbackHistoryPage: React.FC = () => {
    const [param, setParam] = useState(initParam);
    const [listData, setListData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate()

    const feedbackWithStatus2 = [];

    const loadMore = () => {
        setParam((prev) => ({
            ...prev,
            pageSize: prev.pageSize + 5,
        }));
    };

    const loaderRef = useInfiniteScroll({
        hasMore: hasMore && listData.length > 0,
        loading,
        onLoadMore: loadMore,
    });

    const fetchFeedback = async () => {
        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = feedbackWithStatus2.slice(listData.length, listData.length + param.pageSize);
            
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setListData(prevList => [...prevList, ...data]);

            setHasMore(data.length > 0 && data.length === param.pageSize);

        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(hasMore){
            fetchFeedback();
        }
    }, [param]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box px={4}>
                <HeaderSub title="Phản ánh đã gửi" />
                <Box>
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Chưa có dữ liệu" handleClick={() => navigate('/feedback-add')} textBtn="Thêm phản ánh" />
                    ) : (
                        <div className="grid grid-cols-1">
                            {listData.map((item, index) => (
                                <FeedbackItem key={index} data={item} />
                            ))}
                        </div>
                    )}
                    <div ref={loaderRef} >
                        {loading && <FeedbackSkeleton count={listData.length === 0 ? 2 : 1} />}
                        {listData.length > 0 && !hasMore && <p className="text-center">Đã hiển thị tất cả phản ánh</p>}
                    </div>
                </Box>
            </Box>
        </Page>
    )
}

export default FeedbackHistoryPage