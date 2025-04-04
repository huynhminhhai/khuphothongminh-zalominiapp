import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteTransaction, useGetTransactionListNormal, useGetTransactionType } from "apiRequest/transaction"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { NewsSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { transactionsOptions } from "constants/mock"
import { TransactionColor, TransactionsType } from "constants/utinities"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { formatDate } from "utils/date"
import { convertNumberVND } from "utils/number"
import { getLabelOptions } from "utils/options"
import { Box, Button, Input, Page, Select, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    transaction_type: 0
}

const TransactionsManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()

    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: ''
    })

    const { data, isLoading } = useGetTransactionListNormal(param);
    const { mutate: deleteTransaction } = useDeleteTransaction();

    const debouncedSearch = useCallback(
        debounce((value) => {
            setParam((prev) => ({ ...prev, keyword: value }));
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

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
            deleteTransaction(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa thu/chi này?');
    }

    const columns: ColumnDef<TransactionsType>[] = [
        {
            accessorKey: 'noiDung',
            header: 'Nội dung'
        },
        {
            id: 'amount',
            header: 'Số tiền',
            cell: ({ row }) => {

                const { data: transactionType } = useGetTransactionType();

                const type = transactionType?.find(item => item.loaiGiaoDichTaiChinhId === row.original.loaiGiaoDichTaiChinhId);
                const typeColor = TransactionColor[type?.tenLoaiGiaoDichTaiChinh] || "#7c7c7c";
                
                return (
                    <div style={{ color: typeColor }}>
                        {
                            `
                              ${type?.tenLoaiGiaoDichTaiChinh === "Thu" ? "+" : "-"}  ${convertNumberVND(row.original.soTien)}
                            `
                        }
                    </div>
                )
            }
        },
        {
            id: 'transaction_date',
            header: 'Ngày thu/chi',
            cell: ({row}) => {
                return (
                    <div>
                        {formatDate(row.original.ngayGiaoDich)}
                    </div>
                )
            }
        },
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/transactions-detail?id=${row.original.thuChiId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/transactions-update?id=${row.original.thuChiId}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeTransaction(row.original.thuChiId)}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        <Icon icon='material-symbols:delete' fontSize={18} />
                    </button>
                </div>
            ),
        },
    ];

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box px={4}>
                    <NewsSkeleton count={5} />
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
                <HeaderSub title="Quản lý thu chi" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton
                        onAddButtonClick={() => navigate('/transactions-add')}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm..."
                                value={param.keyword}
                                onChange={(e) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        keyword: e.target.value
                                    }));
                                }}
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

export default TransactionsManagementPage