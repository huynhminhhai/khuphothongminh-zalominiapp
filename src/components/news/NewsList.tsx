import React, { useState } from "react";
import { Box } from "zmp-ui";
import NewsItem from "./NewsItem";
import NewsMain from "./NewsMain";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { NewsSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";
import { useGetNewsList } from "apiRequest/news";
import { useStoreApp } from "store/store";

const NewsList: React.FC = () => {

    const { account } = useStoreApp()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: '',
        NgayXuatBanTuNgay: '',
        NgayXuatBanDenNgay: '',
        TacGia: '',
        TieuDe: '',
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetNewsList(param);

    const listData = data?.pages?.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    if (isLoading) {
        return <Box px={4}><NewsSkeleton count={5} /></Box>
    }

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-1">
                    {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                        <Box px={4}>
                            <EmptyData title="Hiện chưa có tin tức nào!" desc="Khi có tin tức, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                        </Box>
                    ) : (
                        <>
                            {listData.length > 0 && <NewsMain data={listData[0]} />}
                            <Box px={4}>
                                {listData.slice(1).map((item: any, index) => (
                                    <NewsItem key={index} data={item} />
                                ))}
                            </Box>
                        </>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <NewsSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả tin tức</p>}
            </div>
        </Box>
    );
};

export default NewsList;