import React, { useEffect, useState } from "react"
import { Box, DatePicker, Input, Select } from "zmp-ui"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { TaskItemSkeleton } from "components/skeleton"
import { useStoreApp } from "store/store"
import { useGetTransactionList, useGetTransactionType } from "apiRequest/transaction"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"
import { debounce } from "lodash"
import DocumentItem from "./DocumentItem"
import { useGetDocumentList } from "apiRequest/document"
import { formatDate, parseDate } from "components/form/DatePicker"
import { formatDateYYYYMMDD } from "utils/date"

const TransactionsList: React.FC = () => {

    const { account } = useStoreApp()
    const { Option } = Select;

    const [filters, setFilters] = useState({
        search: "",
        soHieu: "",
        trichYeu: "",
        tenCoQuanBanHanh: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        SoHieu: '',
        TrichYeu: '',
        TenCoQuanBanHanh: '',
        NgayBanHanhTuNgay: '',
        NgayBanHanhDenNgay: ''
    });

    const { data: transactionType } = useGetTransactionType();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetDocumentList(param);

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
    useDebouncedParam(filters.soHieu, 'SoHieu');
    useDebouncedParam(filters.trichYeu, 'TrichYeu');
    useDebouncedParam(filters.tenCoQuanBanHanh, 'TenCoQuanBanHanh');

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
                            <EmptyData title="Hiện chưa có văn bản nào!" desc="Khi có văn bản, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                        </Box>
                    ) : (
                        <Box px={4}>
                            {listData.map((item, index) => (
                                <DocumentItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <TaskItemSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả văn bản</p>}
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
                        placeholder='Số hiệu'
                        value={filters.soHieu}
                        onChange={(e) => updateFilter('soHieu', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <Input
                        placeholder='Trích yếu'
                        value={filters.trichYeu}
                        onChange={(e) => updateFilter('trichYeu', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <DatePicker
                        placeholder="Từ ngày"
                        mask
                        maskClosable
                        value={parseDate(param.NgayBanHanhTuNgay)}
                        onChange={(e) => setParam((prev) => ({ ...prev, NgayBanHanhTuNgay: formatDateYYYYMMDD(e) }))}
                    />
                </div>
                <div className="col-span-6">
                    <DatePicker
                        placeholder="Đến ngày"
                        mask
                        maskClosable
                        value={parseDate(param.NgayBanHanhDenNgay)}
                        onChange={(e) => setParam((prev) => ({ ...prev, NgayBanHanhDenNgay: formatDateYYYYMMDD(e) }))}
                    />
                </div>
            </FilterBar2>
            <Divider />
            {renderContent()}
        </Box>
    )
}

export default TransactionsList