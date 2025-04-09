import React, { useCallback, useEffect, useState } from "react"
import { Box, Input, Select, useNavigate } from "zmp-ui"
import TransactionsItem from "./InvoiceItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { NewsSkeleton } from "components/skeleton"
import { useStoreApp } from "store/store"
import { useGetTransactionList, useGetTransactionType } from "apiRequest/transaction"
import { FilterBar2 } from "components/table"
import { Divider } from "components/divider"
import { debounce } from "lodash"
import InvoiceItem from "./InvoiceItem"

const InvoiceList: React.FC = () => {

    const { account } = useStoreApp()
    const { Option } = Select;
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        search: "",
        noiDung: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account.thongTinDanCu?.apId : 0,
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
                    <NewsSkeleton count={5} />
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
                            {/* {listData.map((item, index) => (
                                <InvoiceItem key={index} data={item} />
                            ))} */}
                            <Box
                                onClick={() => navigate(`/invoice-detail?id=${1}`)}
                                className="border-b-[1px] bg-white rounded-lg"
                                p={4}
                                mb={3}
                            >
                                <Box pb={4} flex alignItems="flex-start" justifyContent="space-between" className="dashed-border-bottom relative">
                                    <div className="w-[16px] h-[16px] bg-[#f4f5f6] rounded-full absolute bottom-[-6px] left-[-25px]"></div>
                                    <div className="w-[16px] h-[16px] bg-[#f4f5f6] rounded-full absolute bottom-[-6px] right-[-25px]"></div>
                                    <Box flex flexDirection="column" className="gap-[2px]">
                                        <span className="text-[18px] font-semibold">Rác sinh hoạt</span>
                                        <span className="text-[12px] text-gray-color font-medium">SDS345688999</span>
                                    </Box>
                                    <div className={`bg-[#f5f1ee] text-[#c7373e] text-[12px] font-semibold leading-[1] px-3 py-[6px] rounded-xl`}>
                                        Chưa thanh toán
                                    </div>
                                </Box>
                                <div className="grid grid-cols-2 pt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-medium text-gray-color">Chi phí</span>
                                        <span className="text-[16px] font-semibold text-primary-color">340.000 đ</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-medium text-gray-color">Thời hạn</span>
                                        <span className="text-[16px] font-semibold text-primary-color">28/04/2025</span>
                                    </div>
                                </div>
                            </Box>
                            <Box
                                onClick={() => navigate(`/invoice-detail?id=${1}`)}
                                className="border-b-[1px] bg-white rounded-lg"
                                p={4}
                                mb={3}
                            >
                                <Box pb={4} flex alignItems="flex-start" justifyContent="space-between" className="dashed-border-bottom relative">
                                    <div className="w-[16px] h-[16px] bg-[#f4f5f6] rounded-full absolute bottom-[-6px] left-[-25px]"></div>
                                    <div className="w-[16px] h-[16px] bg-[#f4f5f6] rounded-full absolute bottom-[-6px] right-[-25px]"></div>
                                    <Box flex flexDirection="column" className="gap-[2px]">
                                        <span className="text-[18px] font-semibold">Nước sinh hoạt</span>
                                        <span className="text-[12px] text-gray-color font-medium">SDS345688999</span>
                                    </Box>
                                    <div className={`bg-[#f5f1ee] text-[#c7373e] text-[12px] font-semibold leading-[1] px-3 py-[6px] rounded-xl`}>
                                        Chưa thanh toán
                                    </div>
                                </Box>
                                <div className="grid grid-cols-2 pt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-medium text-gray-color">Chi phí</span>
                                        <span className="text-[16px] font-semibold text-primary-color">1.280.000 đ</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-medium text-gray-color">Thời hạn</span>
                                        <span className="text-[16px] font-semibold text-primary-color">28/04/2025</span>
                                    </div>
                                </div>
                            </Box>
                            <Box
                                onClick={() => navigate(`/invoice-detail?id=${1}`)}
                                className="border-b-[1px] bg-white rounded-lg"
                                p={4}
                                mb={3}
                            >
                                <Box pb={4} flex alignItems="flex-start" justifyContent="space-between" className="dashed-border-bottom relative">
                                    <div className="w-[16px] h-[16px] bg-[#f4f5f6] rounded-full absolute bottom-[-6px] left-[-25px]"></div>
                                    <div className="w-[16px] h-[16px] bg-[#f4f5f6] rounded-full absolute bottom-[-6px] right-[-25px]"></div>
                                    <Box flex flexDirection="column" className="gap-[2px]">
                                        <span className="text-[18px] font-semibold">Rác sinh hoạt</span>
                                        <span className="text-[12px] text-gray-color font-medium">SDS345688999</span>
                                    </Box>
                                    <div className={`bg-[#eaf0ea] text-[#157c0c] text-[12px] font-semibold leading-[1] px-3 py-[6px] rounded-xl`}>
                                        Đã thanh toán
                                    </div>
                                </Box>
                                <div className="grid grid-cols-2 pt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-medium text-gray-color">Chi phí</span>
                                        <span className="text-[16px] font-semibold text-primary-color">340.000 đ</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-medium text-gray-color">Thời hạn</span>
                                        <span className="text-[16px] font-semibold text-primary-color">28/03/2025</span>
                                    </div>
                                </div>
                            </Box>
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <NewsSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả hóa đơn</p>}
            </div>

        </Box>
    };

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
                {/* <div className="col-span-6">
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

export default InvoiceList