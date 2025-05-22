import React, { useCallback, useEffect, useState } from "react"
import { Box, Input } from "zmp-ui"
import SurveyItem from "./SurveyItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { NewsSkeleton, TaskItemSkeleton } from "components/skeleton"
import { useStoreApp } from "store/store"
import { debounce } from "lodash"
import { useGetSurveyList } from "apiRequest/survey"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"

const SurveyList: React.FC = () => {

    const { account } = useStoreApp()
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
    });

    const debouncedSearch = useCallback(
        debounce((value) => {
            setParam((prev) => ({ ...prev, keyword: value }));
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetSurveyList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    const renderContent = () => {
        if (isLoading) {
            return <Box px={4}><TaskItemSkeleton count={5} /></Box>
        }

        return <Box>
            <Box>
                {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                    <Box px={4}>
                        <EmptyData title="Hiện chưa có khảo sát nào!" desc=" Khi có khảo sát từ ban quản lý, bạn có thể tham gia và đóng góp ý kiến ngay tại đây. Vui lòng quay lại sau!" />
                    </Box>
                ) : (
                    <>
                        <Box px={4}>
                            {listData.map((item: any, index) => (
                                <SurveyItem key={index} data={item} />
                            ))}
                        </Box>
                    </>
                )}
            </Box>
            <div ref={loaderRef} className="px-4 pb-4">
                {isFetchingNextPage && <TaskItemSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả khảo</p>}
            </div>
        </Box>
    };

    return (
        <Box>
            <FilterBar2
                searchComponent={
                    <Input.Search
                        placeholder='Tìm kiếm...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            >
            </FilterBar2>
            <Divider />
            {renderContent()}
        </Box>
    )
}

export default SurveyList