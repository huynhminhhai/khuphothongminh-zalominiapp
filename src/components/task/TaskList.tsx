import React, { useCallback, useEffect, useState } from "react"
import { Box, Input } from "zmp-ui"
import TaskItem from "./TaskItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { NewsSkeleton } from "components/skeleton"
import { EmptyData } from "components/data"
import { useStoreApp } from "store/store"
import { debounce } from "lodash"
import { useGetMyTaskList } from "apiRequest/task"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"


const TaskList: React.FC = () => {

    const { account } = useStoreApp()
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: '',
        nguoiThucHienId: account ? account?.nguoiDungId : 0
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

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyTaskList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    const renderContent = () => {
        if (isLoading) {
            return <Box px={4}><NewsSkeleton count={5} /></Box>
        }

        return <Box>
            <Box>
                {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                    <Box px={4}>
                        <EmptyData title="Hiện chưa có nhiệm vụ nào!" desc="Khi có nhiệm vụ, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    </Box>
                ) : (
                    <>
                        <Box px={4}>
                            {listData.map((item: any, index) => (
                                <TaskItem key={index} data={item} />
                            ))}
                        </Box>
                    </>
                )}
            </Box>
            <div ref={loaderRef} className="px-4 pb-4">
                {isFetchingNextPage && <NewsSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả nhiệm vụ</p>}
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

export default TaskList