import React, { useEffect, useState } from "react"
import { Box, DatePicker, Input } from "zmp-ui"
import MeetingItem from "./MeetingItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { MeetingItemSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";
import { useStoreApp } from "store/store";
import { useGetMeetingList } from "apiRequest/meeting";
import { debounce } from "lodash";
import { Divider } from "components/divider";
import { FilterBar2 } from "components/table";
import { formatDate, parseDate } from "components/form/DatePicker";

const MeetingList: React.FC = () => {

    const { account } = useStoreApp()
    const [filters, setFilters] = useState({
        search: "",
        tieuDe: "",
        diaDiem: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account?.apId : 0,
        keyword: '',
        TieuDe: '',
        ThoiGianBatDau: '',
        ThoiGianKetThuc: '',
        DiaDiem: '',
        NguoiDungId: account ? account?.nguoiDungId : 0
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
    useDebouncedParam(filters.diaDiem, 'DiaDiem');

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMeetingList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    const renderContent = () => {
        if (isLoading) {
            return <Box><MeetingItemSkeleton count={5} /></Box>
        }

        return <Box>
            <Box>
                {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                    <Box px={4}>
                        <EmptyData title="Hiện chưa có cuộc họp nào!" desc="Khi có cuộc họp, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    </Box>
                ) : (
                    <>
                        <Box px={4}>
                            {listData.map((item: any, index) => (
                                <MeetingItem key={index} data={item} />
                            ))}
                        </Box>
                    </>
                )}

            </Box>
            <div ref={loaderRef} className="px-4 pb-4">
                {isFetchingNextPage && <MeetingItemSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả cuộc họp</p>}
            </div>

        </Box>
    };

    return (
        <Box>
            <FilterBar2
                searchComponent={
                    <Input.Search
                        placeholder='Tìm kiếm...'
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                    />
                }
            >
                <div className="col-span-6">
                    <Input
                        placeholder="Tiêu đề..."
                        value={filters.tieuDe}
                        onChange={(e) => updateFilter('tieuDe', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <Input
                        placeholder="Địa điểm..."
                        value={filters.diaDiem}
                        onChange={(e) => updateFilter('diaDiem', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <DatePicker
                        placeholder="Từ ngày"
                        mask
                        maskClosable
                        value={parseDate(param.ThoiGianBatDau)}
                        onChange={(e) => setParam((prev) => ({ ...prev, ThoiGianBatDau: formatDate(e) }))}
                    />
                </div>
                <div className="col-span-6">
                    <DatePicker
                        placeholder="Đến ngày"
                        mask
                        maskClosable
                        value={parseDate(param.ThoiGianKetThuc)}
                        onChange={(e) => setParam((prev) => ({ ...prev, ThoiGianKetThuc: formatDate(e) }))}
                    />
                </div>
            </FilterBar2>
            <Divider />
            {renderContent()}
        </Box>
    )
}

export default MeetingList