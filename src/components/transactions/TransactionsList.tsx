import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import { TRANSACTIONSDATA, transactionsType } from "constants/utinities"
import images from "assets/images"
import TransactionsItem from "./TransactionsItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { NewsSkeleton } from "components/skeleton"

// type TransactionsListProps = {
//     data: transactionsType[]
// }

const initParam = {
    pageSize: 8,
};


const TransactionsList: React.FC = () => {

    const [param, setParam] = useState(initParam);
    const [listData, setListData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        setParam((prev) => ({
            ...prev,
            pageSize: prev.pageSize + 8,
        }));
    };

    const loaderRef = useInfiniteScroll({
        hasMore: hasMore && listData.length > 0,
        loading,
        onLoadMore: loadMore,
    });

    const fetchTransactions = async () => {

        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = TRANSACTIONSDATA.slice(listData.length, listData.length + param.pageSize);

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
        if (hasMore) {
            fetchTransactions();
        }
    }, [param]);

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-1">
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Hiện chưa có báo cáo thu/chi nào!" desc="Khi có báo cáo thu/chi, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    ) : (
                        <Box px={4}>
                            {listData.map((item, index) => (
                                <TransactionsItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {loading && <NewsSkeleton count={listData.length === 0 ? 4 : 1} />}
                {listData.length > 0 && !hasMore && <p className="text-center pt-4 pb-4">Đã hiển thị tất cả báo cáo thu/chi</p>}
            </div>
        </Box>
    )
}

export default TransactionsList