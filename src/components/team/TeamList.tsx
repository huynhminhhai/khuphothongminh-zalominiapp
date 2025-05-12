import React, { useEffect, useState } from "react"
import { Box, Button, Input, Select } from "zmp-ui"
import TeamItem from "./TeamItem"
import { TEAMDATA, TeamType } from "constants/utinities"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { TeamSkeleton } from "components/skeleton"
import { useStoreApp } from "store/store"
import { useGetTeamList, useGetTeamType } from "apiRequest/team"
import { debounce } from "lodash"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"

const initParam = {
    pageIndex: 1,
    pageSize: 6,
    keyword: '',
}

const ServiceList: React.FC<any> = () => {

    const { account } = useStoreApp()
    const { Option } = Select;

    const [filters, setFilters] = useState({
        search: "",
        tenChucVu: "",
        hoTen: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account?.apId : 0,
        keyword: '',
        TinhTrang: '',
        TenChucVu: '',
        HoTen: ''
    });

    const { data: teamType } = useGetTeamType();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetTeamList(param);

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
    useDebouncedParam(filters.tenChucVu, 'TenChucVu');
    useDebouncedParam(filters.hoTen, 'HoTen');

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box px={4}>
                    <TeamSkeleton count={5} />
                </Box>
            );
        }

        return <Box>
            <Box>
                <div className="grid grid-cols-2">
                    {(listData?.length === 0 && !isFetchingNextPage && !isLoading) ? (
                        <Box px={4}>
                            <EmptyData title="Hiện chưa có thông tin thành viên nào!" desc="Khi có thông tin thành viên, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                        </Box>
                    ) : (
                        <Box px={4} pt={4}>
                            {listData.map((item, index) => (
                                <TeamItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <TeamSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả thành viên</p>}
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
                        placeholder="Tên chức vụ"
                        value={filters.tenChucVu}
                        onChange={(e) => updateFilter('tenChucVu', e.target.value)}
                    />
                </div>
                <div className="col-span-6">
                    <Input
                        placeholder="Họ tên"
                        value={filters.hoTen}
                        onChange={(e) => updateFilter('hoTen', e.target.value)}
                    />
                </div>
                {/* <div className="col-span-6">
                    <Select
                        placeholder="Loại giao dich"
                        value={param.LoaiGiaoDichTaiChinhId}
                        closeOnSelect
                        onChange={(e) => setParam(prev => ({ ...prev, LoaiGiaoDichTaiChinhId: Number(e) }))}
                    >
                        <Option title="Tất cả" value={0} />
                        {
                            transactionType?.map((item) => (
                                <Option key={item.loaiGiaoDichTaiChinhId} value={item.loaiGiaoDichTaiChinhId} title={item.tenLoaiGiaoDichTaiChinh} />
                            ))
                        }

                    </Select>
                </div> */}
            </FilterBar2>
            <Divider />
            {renderContent()}
        </Box>
    )
}

export default ServiceList