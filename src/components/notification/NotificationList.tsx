import { NOTIFICATIONDATA } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { Box, Input } from "zmp-ui"
import NotificationItem from "./NotificationItem"
import { EmptyData } from "components/data"
import { useStoreApp } from "store/store"
import { debounce } from "lodash"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { useGetNotificationList, useReadAllNotification } from "apiRequest/notification"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"
import { TaskItemSkeleton } from "components/skeleton"
import { Icon } from "@iconify/react"

const NotificationList: React.FC = () => {

    const { account } = useStoreApp()

    const [filters, setFilters] = useState({
        search: ""
    });

    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetNotificationList(param);
    const { mutate: readAllNotification, isPending: isReadAllPending } = useReadAllNotification();

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
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

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box px={4}>
                    <TaskItemSkeleton count={5} />
                </Box>
            );
        }

        return <Box>
            <Box>
                <div className="grid grid-cols-1">
                    {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                        <Box px={4}>
                            <EmptyData title="Hiện chưa có thông báo!" />
                        </Box>
                    ) : (
                        <Box>
                            <div className="border-b-[1px] border-gray-100 pt-1">
                                <button
                                    disabled={isReadAllPending}
                                    onClick={() => {
                                        readAllNotification();
                                    }}
                                    className="px-4 py-2 font-medium text-end text-[#4c66af] flex items-center gap-1 justify-end ml-auto w-fit text-[15px]">Đánh dấu đã xem tất cả
                                    <Icon icon="hugeicons:tick-01" fontSize={18} />
                                </button>
                            </div>
                            {listData.map((item, index) => (
                                <NotificationItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <TaskItemSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả thông báo</p>}
            </div>

        </Box>
    };

    return (
        <Box>
            {/* <FilterBar2
                searchComponent={
                    <Input.Search
                        placeholder='Tìm kiếm nhanh'
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                    />
                }
            >

            </FilterBar2> */}
            {/* <Divider /> */}
            {renderContent()}
        </Box>
    )
}

export default NotificationList