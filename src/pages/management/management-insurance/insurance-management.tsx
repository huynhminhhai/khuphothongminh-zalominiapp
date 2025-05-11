import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteNews, useGetNewsListNormal, useGetNewsStatus, useUpdateNewsStatus } from "apiRequest/news"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { NewsType } from "components/news/type"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import React, { useEffect, useMemo, useState } from "react"
import { useStoreApp } from "store/store"
import { getFullImageUrl } from "utils/file"
import { Box, DatePicker, Input, Page, Select, useNavigate } from "zmp-ui"
import { debounce } from "lodash";
import { useDeleteInsurance, useGetInsuranceListNormal } from "apiRequest/insurance"
import { formatDate } from "utils/date"
import { useGetResidentListNormal } from "apiRequest/resident"

const InsuranceManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()
    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [filters, setFilters] = useState({
        search: "",
        maSo: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        keyword: '',
        DanCuId: null,
        LoaiBaoHiemId: 1,
        MaSo: '',
    })

    const { data, isLoading } = useGetInsuranceListNormal(param);
    const { mutate: deleteInsurance } = useDeleteInsurance();


    const { data: residentList } = useGetResidentListNormal(
        {
            page: 1,
            pageSize: 9999999,
            ApId: account ? account.thongTinDanCu?.apId : 0,
            keyword: '',
            HoTen: '',
            HoTenChuHo: '',
            SoGiayTo: '',
            LaChuHo: false
        }
    );

    const residentOptions = useMemo(() => {
        return residentList?.data?.map((item) => ({
            value: item.danCuId,
            label: `${item.hoTen} - ${item.soGiayTo}`,
        })) || [];
    }, [residentList]);


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
    useDebouncedParam(filters.maSo, 'MaSo');

    const handlePageChange = (params: { pageIndex: number; pageSize: number }) => {
        setParam((prevParam) => ({
            ...prevParam,
            page: params.pageIndex,
        }));
    };

    const handleRowChange = (newPageSize: number) => {
        setParam((prevParam) => ({
            ...prevParam,
            pageSize: newPageSize,
            page: 1,
        }));
    };

    const openConfirmModal = (action: () => void, title: string, message: string) => {
        setConfirmAction(() => action);
        setModalContent({ title, message });
        setConfirmVisible(true);
    };

    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
            setConfirmVisible(false);
            setConfirmAction(null);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
        setConfirmAction(null);
    };

    const removeInsurance = (id: number) => {
        openConfirmModal(() => {
            deleteInsurance(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa thẻ BHYT này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            id: 'tieuDe',
            header: 'Mã số',
            cell: ({ row }) => (
                <div>
                    {row.original.maSo}
                </div>
            ),
            size: 250
        },
        {
            id: 'noiDangKy',
            header: 'Nơi đăng ký',
            cell: ({ row }) => (
                <div>
                    {row.original.noiDangKy}
                </div>
            ),
            size: 250
        },
        {
            id: 'tuNgay', // Custom column for actions
            header: 'Từ ngày',
            cell: ({ row }) => (
                <div>
                    {formatDate(row.original.tuNgay)}
                </div>
            )
        },
        {
            id: 'denNgay', // Custom column for actions
            header: 'Đến ngày',
            cell: ({ row }) => (
                <div>
                    {formatDate(row.original.denNgay)}
                </div>
            )
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    {/* {
                        // hasPermission('Lấy thông tin chi tiết 1 bài viết', 'XEM') &&
                        <button
                            onClick={() => navigate(`/news-detail?id=${row.original.thongTinBaoHiemId }`)}
                            className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                            <Icon icon='mdi:eye' fontSize={18} />
                        </button>
                    } */}
                    {
                        // hasPermission('Sửa thông tin 1 bài viết', 'SUA') &&
                        <button
                            onClick={() => navigate(`/insurance-update?id=${row.original.thongTinBaoHiemId }`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        // hasPermission('Xóa 1 bài viết', 'XOA') &&
                        <button
                            onClick={() => removeInsurance(row.original.thongTinBaoHiemId )}
                            className="px-3 py-1 bg-red-700 text-white rounded"
                        >
                            <Icon icon='material-symbols:delete' fontSize={18} />
                        </button>
                    }
                </div>
            ),
        },
    ];

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box px={4}>
                    <ManagementItemSkeleton count={2} />
                </Box>
            );
        }

        if (!data?.data.length) {
            return (
                <Box px={4}>
                    <EmptyData
                        title="Hiện chưa có thẻ BHYT nào!"
                        desc="Nhấn vào nút Thêm để bắt đầu!"
                    />
                </Box>
            );
        }

        return <Box>
            {
                viewCard ? (
                    <CardTanStack data={data.data} columns={columns} />
                ) : (
                    <Box px={4}>
                        <TableTanStack data={data.data} columns={columns} />
                    </Box>
                )
            }
            <Box px={4}>
                <TablePagination
                    totalItems={data.page.total}
                    pageSize={param.pageSize}
                    pageIndex={param.page}
                    onPageChange={handlePageChange}
                    onRowChange={handleRowChange}
                />
            </Box>
        </Box>
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý thẻ BHYT" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        // showAddButton={hasPermission('Thêm mới 1 bài viết', 'SUA')}
                        onAddButtonClick={() => navigate("/insurance-management-add")}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm nhanh"
                                value={filters.search}
                                onChange={(e) => updateFilter('search', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                placeholder="Mã số"
                                value={filters.maSo}
                                onChange={(e) => updateFilter('maSo', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Select
                                placeholder="Dân cư"
                                value={param.DanCuId ?? undefined}
                                closeOnSelect
                                onChange={(e) => setParam(prev => ({ ...prev, DanCuId: Number(e) as any || null }))}
                            >
                                <Option title="Tất cả" value={0} />
                                {
                                    residentOptions?.map((item, index) => (
                                        <Option key={index} value={item.value} title={item.label} />
                                    ))
                                }

                            </Select>
                        </div>
                    </FilterBar>

                    <Box>
                        {renderContent()}
                    </Box>
                </Box>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn xóa tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default InsuranceManagementPage