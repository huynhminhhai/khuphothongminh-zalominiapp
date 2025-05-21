import React, { useCallback, useEffect, useState } from "react"
import { Box, Input } from "zmp-ui"
import TaskItem from "./TaskItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { TaskItemSkeleton } from "components/skeleton"
import { EmptyData } from "components/data"
import { useStoreApp } from "store/store"
import { debounce } from "lodash"
import { useGetMyTaskList } from "apiRequest/task"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"


const TaskList: React.FC = () => {

    const { account } = useStoreApp()
    const [filters, setFilters] = useState({
        search: "",
        tieuDe: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account?.apId : 0,
        keyword: '',
        nguoiThucHienId: account ? account?.nguoiDungId : 0,
        TieuDe: '',
    });

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const useDebouncedParam = (value: string, key: keyof typeof param) => {
        useEffect(() => {
            const handler = debounce((v: string) => {
                setParam(prev => ({ ...prev, [key]: v }))
            }, 300)

            handler(value)

            return () => handler.cancel()
        }, [value, key])
    }

    useDebouncedParam(filters.search, 'keyword');
    useDebouncedParam(filters.tieuDe, 'TieuDe');

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyTaskList(param);

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
                {isFetchingNextPage && <TaskItemSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả nhiệm vụ</p>}
            </div>
        </Box>
    };

    return (
        <Box>
            <FilterBar2
                searchComponent={
                    <Input.Search
                        placeholder='Tìm kiếm nhanh'
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                    />
                }
            >
                <div className="col-span-12">
                    <Input
                        placeholder="Tiêu đề"
                        value={filters.tieuDe}
                        onChange={(e) => updateFilter('tieuDe', e.target.value)}
                    />
                </div>
            </FilterBar2>
            <Divider />
            {renderContent()}
        </Box>
    )
}

export default TaskList