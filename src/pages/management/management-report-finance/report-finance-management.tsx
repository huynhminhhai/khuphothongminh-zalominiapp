import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TablePagination, TableTanStack } from "components/table"
import { monthOptions } from "constants/mock"
import { REPORTFINANCEDATA, reportFinanceType } from "constants/utinities"
import React, { useState } from "react"
import { convertNumberVND } from "utils/number"
import { Box, Button, Input, Page, Select, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    month: 0,
    year: 0
}

const ReportFinanceManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const { Option } = Select
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [param, setParam] = useState(initParam)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    const handlePageChange = (params: { pageIndex: number; pageSize: number }) => {
        setParam((prevParam) => ({
            ...prevParam,
            pageIndex: params.pageIndex, // Cập nhật pageIndex từ params
        }));
        console.log(`Navigated to page: ${params.pageIndex}, pageSize: ${params.pageSize}`);
    };

    const handleRowChange = (newPageSize: number) => {
        setParam((prevParam) => ({
            ...prevParam,
            pageSize: newPageSize,
            pageIndex: 1, // Reset về trang đầu tiên khi thay đổi pageSize
        }));
        console.log(`Changed pageSize: ${newPageSize}, reset to page: 1`);
    };

    const openConfirmModal = (action: () => void) => {
        setConfirmAction(() => action);
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

    const removeNews = (id: number) => {
        openConfirmModal(() => {
            console.log('Call api delete transactions with id: ', id)

            openSnackbar({
                text: 'Xóa khoản thu/chi thành công',
                type: 'success',
                duration: 5000,
            });
        })
    }

    const columns: ColumnDef<reportFinanceType>[] = [
        {
            accessorKey: 'title',
            header: 'Báo cáo'
        },
        {
            id: 'totalIncome',
            header: 'Tổng thu',
            cell: ({ row }) => (
                <div>
                    {
                        convertNumberVND(row.original.totalIncome)
                    }
                </div>
            )
        },
        {
            id: 'totalExpense',
            header: 'Tổng chi',
            cell: ({ row }) => (
                <div>
                    {
                        convertNumberVND(row.original.totalExpense)
                    }
                </div>
            )
        },
        {
            id: 'remainingBalance',
            header: 'Tổng quỹ còn lại',
            cell: ({ row }) => (
                <div>
                    {
                        convertNumberVND(row.original.remainingBalance)
                    }
                </div>
            )
        },
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/report-finance-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/report-finance-update?id=${row.original.id}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeNews(row.original.id)}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        <Icon icon='material-symbols:delete' fontSize={18} />
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = REPORTFINANCEDATA.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(param.keyword.toLowerCase())

        return matchesSearch;
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Báo cáo tài chính" />
                <Box p={4}>
                    <Box mb={2} flex justifyContent="flex-end">
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => navigate('/report-finance-chart')}
                        >
                            <div className="flex items-center gap-1">
                                Tổng quan tài chính
                                <Icon fontSize={18} icon='iconamoon:enter' />
                            </div>
                        </Button>
                    </Box>
                    <Box mb={2} flex justifyContent="space-between" className="gap-4">
                        <Box className="flex-1">
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
                        </Box>
                        <Button
                            size="medium"
                            variant="secondary"
                            onClick={() => navigate('/report-finance-add')}
                        >
                            <div className="flex items-center gap-1">
                                <Icon fontSize={18} icon='material-symbols:add-rounded' />
                                Thêm
                            </div>
                        </Button>
                    </Box>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Select
                                placeholder="Chọn tháng"
                                closeOnSelect
                                onChange={(value) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        month: value as number
                                    }));
                                }}
                            >
                                <Option title={'Tất cả'} value={0} />
                                {
                                    monthOptions.map((item) => (
                                        <Option key={item.value} title={item.label} value={item.value} />
                                    ))
                                }
                            </Select>
                        </div>
                        <div>
                            <Select
                                placeholder="Chọn năm"
                                closeOnSelect
                                onChange={(value) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        year: value as number
                                    }));
                                }}
                            >
                                <Option title={'Tất cả'} value={0} />
                                <Option title={'2024'} value={2024} />
                                <Option title={'2025'} value={2025} />

                            </Select>
                        </div>
                    </div>
                    <Box mt={4}>
                        <TableTanStack data={filteredData} columns={columns} />
                        <TablePagination
                            totalItems={50}
                            pageSize={param.pageSize}
                            pageIndex={param.pageIndex}
                            onPageChange={handlePageChange}
                            onRowChange={handleRowChange}
                        />
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

export default ReportFinanceManagementPage