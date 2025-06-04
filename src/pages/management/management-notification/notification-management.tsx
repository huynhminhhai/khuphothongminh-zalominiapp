import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteDocument, useGetDocumentListNormal, useUpdateDocumentStatus } from "apiRequest/document"
import { useDeleteNotification, useGetNotificationListNormal, useUpdateNotificationStatus } from "apiRequest/notification"
import { useDeleteTransaction, useGetTransactionListNormal, useGetTransactionType } from "apiRequest/transaction"
import { EmptyData } from "components/data"
import { parseDate } from "components/form/DatePicker"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { TransactionColor, TransactionsType } from "constants/utinities"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { formatDate, formatDateYYYYMMDD } from "utils/date"
import { convertNumberVND } from "utils/number"
import { PermissionActions, permissionsList } from "utils/permission"
import { Box, DatePicker, Input, Page, Select, useNavigate } from "zmp-ui"

const NotificationManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const { Option } = Select;

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
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
    })

    const { data, isLoading } = useGetNotificationListNormal(param);
    const { mutate: deleteNotification } = useDeleteNotification();

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

    const removeTransaction = (id: number) => {
        openConfirmModal(() => {
            deleteNotification(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa thông báo này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'tieuDe',
            header: 'Tiêu đề'
        },
        {
            accessorKey: 'noiDung',
            header: 'Nội dung'
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => {
                const { mutate, isPending } = useUpdateNotificationStatus();

                return (
                    <Box width={200}>
                        <Select
                            closeOnSelect
                            defaultValue={row.original.tinhTrangId}
                            onChange={(value) => {
                                openConfirmModal(() => {
                                    mutate({
                                        thongBaoId: row.original.thongBaoId,
                                        tinhTrangId: Number(value),
                                    });
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái thông báo này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={
                                isPending
                                || !hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhThongBao, PermissionActions.SUA)
                            }
                        >
                                <Option
                                    value={4}
                                    key={4}
                                    title={'Thu hồi'}
                                />
                                <Option
                                    value={5}
                                    key={5}
                                    title={'Gửi'}
                                />
                        </Select>
                    </Box>
                )
            },
            size: 160
        },
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    {/* <button
                        onClick={() => navigate(`/document-detail-management?id=${row.original.thongBaoId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button> */}
                    {
                        hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhThongBao, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/notification-update?id=${row.original.thongBaoId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhThongBao, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeTransaction(row.original.thongBaoId)}
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

        if (!data?.data?.length) {
            return (
                <Box px={4}>
                    <EmptyData
                        title="Hiện chưa có thông báo nào!"
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
                <HeaderSub title="Quản lý thông báo nhanh" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhThongBao, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate('/notification-add')}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm nhanh..."
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
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default NotificationManagementPage