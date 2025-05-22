import React, { useEffect, useState } from "react"
import { Box, Input, Select } from "zmp-ui"
import TransactionsItem from "./TransactionsItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { TaskItemSkeleton } from "components/skeleton"
import { useStoreApp } from "store/store"
import { useGetTransactionList, useGetTransactionType } from "apiRequest/transaction"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"
import { debounce } from "lodash"

const TransactionsList: React.FC = () => {

    const { account } = useStoreApp()
    const { Option } = Select;

    const [filters, setFilters] = useState({
        search: "",
        noiDung: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        LoaiGiaoDichTaiChinhId: 0,
        NoiDung: ''
    });

    const { data: transactionType } = useGetTransactionType();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetTransactionList(param);

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
    useDebouncedParam(filters.noiDung, 'NoiDung');

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
                            <EmptyData title="Hiện chưa có báo cáo thu/chi nào!" desc="Khi có báo cáo thu/chi, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                        </Box>
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
                {isFetchingNextPage && <TaskItemSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả thu/chi</p>}
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
                <div className="col-span-6">
                    <Input
                        placeholder="Nội dung..."
                        value={filters.noiDung}
                        onChange={(e) => updateFilter('noiDung', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <Select
                        placeholder="Loại giao dich"
                        value={param.LoaiGiaoDichTaiChinhId}
                        closeOnSelect
                        onChange={(e) => setParam(prev => ({ ...prev, LoaiGiaoDichTaiChinhId: Number(e) }))}
                    >
                        <Option title="Tất cả" value={0}/>
                        {
                            transactionType?.map((item) => (
                                <Option key={item.loaiGiaoDichTaiChinhId} value={item.loaiGiaoDichTaiChinhId} title={item.tenLoaiGiaoDichTaiChinh} />
                            ))
                        }

                    </Select>
                </div>
            </FilterBar2>
            <Divider />
            {renderContent()}
        </Box>
    )
}

export default TransactionsList