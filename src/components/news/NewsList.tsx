import { NEWSDATA } from "constants/utinities";
import React, { useEffect, useState } from "react";
import { Box } from "zmp-ui";
import NewsItem from "./NewsItem";
import NewsMain from "./NewsMain";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { NewsSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";

const initParam = {
    pageSize: 5,
};

const NewsList: React.FC = () => {
    const [param, setParam] = useState(initParam);
    const [listData, setListData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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

    const fetchNews = async () => {

        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = NEWSDATA.slice(listData.length, listData.length + param.pageSize);
            
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
            fetchNews();
        }
    }, [param]);

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-1">
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Hiện chưa có tin tức nào!" desc="Khi có tin tức, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    ) : (
                        <>
                            {listData.length > 0 && <NewsMain data={listData[0]} />}
                            <Box px={4}>
                                {listData.slice(1).map((item, index) => (
                                    <NewsItem key={index} data={item} />
                                ))}
                            </Box>
                        </>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {loading && <NewsSkeleton count={listData.length === 0 ? 5 : 1} />}
                {listData.length > 0 && !hasMore && <p className="text-center pt-4">Đã hiển thị tất cả tin tức</p>}
            </div>
        </Box>
    );
};

export default NewsList;
