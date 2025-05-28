import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteDocument, useGetDocumentListNormal, useUpdateDocumentStatus } from "apiRequest/document"
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

const DocumentManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [filters, setFilters] = useState({
        search: "",
        soHieu: "",
        trichYeu: "",
        tenCoQuanBanHanh: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        SoHieu: '',
        TrichYeu: '',
        TenCoQuanBanHanh: '',
        NgayBanHanhTuNgay: '',
        NgayBanHanhDenNgay: ''
    })

    const { data, isLoading } = useGetDocumentListNormal(param);
    const { mutate: deleteDocument } = useDeleteDocument();

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
            deleteDocument(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa văn bản này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'trichYeu',
            header: 'Trích yếu'
        },
        {
            accessorKey: 'soHieu',
            header: 'Số ký hiệu'
        },
        // {
        //     id: 'ngayBanHanh',
        //     header: 'Ngày ban hành',
        //     cell: ({ row }) => {

        //         return (
        //             <div>
        //                 {
        //                     row.original.ngayBanHanh ?
        //                     formatDate(row.original.ngayBanHanh) : ''
        //                 }
        //             </div>
        //         )
        //     }
        // },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => {
                const { mutate, isPending } = useUpdateDocumentStatus();

                return (
                    <Box width={200}>
                        <Select
                            closeOnSelect
                            defaultValue={row.original.tinhTrangId}
                            onChange={(value) => {
                                openConfirmModal(() => {
                                    mutate({
                                        vanBanId: row.original.vanBanId,
                                        tinhTrangId: Number(value),
                                    });
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái văn bản này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={
                                isPending
                                // || !hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.SUA)
                            }
                        >
                                <Option
                                    value={39}
                                    key={39}
                                    title={'Không công khai'}
                                />
                                <Option
                                    value={40}
                                    key={40}
                                    title={'Công khai'}
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
                    <button
                        onClick={() => navigate(`/document-detail?id=${row.original.vanBanId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {
                        hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/document-update?id=${row.original.vanBanId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeTransaction(row.original.vanBanId)}
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
                        title="Hiện chưa có thu/chi nào!"
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
                <HeaderSub title="Quản lý văn bản triển khai" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate('/document-add')}
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

export default DocumentManagementPage