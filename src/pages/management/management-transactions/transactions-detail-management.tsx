import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteTransactionDetail, useGetTransactionDetail, useGetTransactionDetailList } from "apiRequest/transaction"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useStoreApp } from "store/store"
import { formatDate } from "utils/date"
import { convertNumberVND } from "utils/number"
import { PermissionActions, permissionsList } from "utils/permission"
import { Box, Input, Page, useNavigate } from "zmp-ui"

const TransactionsDetailManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const [searchParams] = useSearchParams();
    const transactionsId = searchParams.get("id");

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [filters, setFilters] = useState({
        search: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account?.apId : 0,
        keyword: '',
        ThuChiId: Number(transactionsId),
    })

    const { data, isLoading } = useGetTransactionDetailList(param);
    const { mutate: deleteTransactionDetail } = useDeleteTransactionDetail();
    const { data: detailData } = useGetTransactionDetail(Number(transactionsId));

    console.log(data)

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

    const removeTransactionDetail = (id: number) => {
        openConfirmModal(() => {
            deleteTransactionDetail(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa chi tiết thu/chi này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            id: 'nguoiGiaoDich',
            header: detailData?.tenLoaiGiaoDichTaiChinh === 'Thu' ? 'Người nộp' : 'Người chi',
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.tenNguoiGiaoDich}
                    </div>
                )
            }
        },
        {
            id: 'noiDung',
            header: 'Nội dung',
            cell: () => {
                return (
                    <div>
                        {detailData.noiDung}
                    </div>
                )
            }
        },
        {
            id: 'amount',
            header: 'Số tiền',
            cell: ({ row }) => {
                return (
                    <div>
                        {convertNumberVND(row.original.soTien)}
                    </div>
                )
            }
        },
        {
            id: 'transaction_date',
            header: 'Ngày thu/chi',
            cell: ({ row }) => {
                return (
                    <div>
                        {formatDate(row.original.ngayGiaoDich)}
                    </div>
                )
            }
        },
        {
            id: 'ghiChu',
            header: 'Ghi chú',
            cell: ({ row }) => {
                return (
                    <div>
                        {row.original.ghiChu || '-'}
                    </div>
                )
            }
        },
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    {
                        hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/transactions-detail-update?thuChiId=${transactionsId}&chiTietThuChiId=${row.original.chiTietThuChiId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeTransactionDetail(row.original.chiTietThuChiId)}
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

        if (!data.data.length) {
            return (
                <Box px={4}>
                    <EmptyData
                        title="Hiện chưa có chi tiết thu/chi nào!"
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
                <HeaderSub title="Danh sách chi tiết khoản thu chi" onBackClick={() => navigate('/transactions-management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate(`/transactions-detail-add?thuChiId=${transactionsId}`)}
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
                    </FilterBar>
                    <Box>
                        {renderContent()}
                    </Box>
                </Box>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn xóa khoản thu/chi này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default TransactionsDetailManagementPage