import React, { useEffect, useState } from "react";
import { Box, DatePicker, Input } from "zmp-ui";
import NewsItem from "./NewsItem";
import NewsMain from "./NewsMain";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { NewsSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";
import { useGetNewsList } from "apiRequest/news";
import { useStoreApp } from "store/store";
import { FilterBar2 } from "components/table";
import { Divider } from "components/divider";
import { debounce } from "lodash";
import { formatDate, parseDate } from "components/form/DatePicker";

const NewsList: React.FC = () => {

    const { account } = useStoreApp()
    const [filters, setFilters] = useState({
        search: "",
        tacGia: "",
        tieuDe: "",
    });
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
    useDebouncedParam(filters.tacGia, 'TacGia');

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetNewsList(param);

    const listData = data?.pages?.reduce((acc, page) => [...acc, ...page], []) || [];

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
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <NewsSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả tin tức</p>}
            </div>
        </Box>
    }

    return (
        <Box>
            <FilterBar2
                searchComponent={
                    <Input.Search
                        placeholder='Tìm kiếm nhanh...'
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
                        placeholder="Tác giả..."
                        value={filters.tacGia}
                        onChange={(e) => updateFilter('tacGia', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <DatePicker
                        placeholder="Từ ngày"
                        mask
                        maskClosable
                        value={parseDate(param.NgayXuatBanTuNgay)}
                        onChange={(e) => setParam((prev) => ({ ...prev, NgayXuatBanTuNgay: formatDate(e) }))}
                    />
                </div>
                <div className="col-span-6">
                    <DatePicker
                        placeholder="Đến ngày"
                        mask
                        maskClosable
                        value={parseDate(param.NgayXuatBanDenNgay)}
                        onChange={(e) => setParam((prev) => ({ ...prev, NgayXuatBanDenNgay: formatDate(e) }))}
                    />
                </div>
            </FilterBar2>
            {/* <Divider /> */}
            {renderContent()}
        </Box>
    );
};

export default NewsList;