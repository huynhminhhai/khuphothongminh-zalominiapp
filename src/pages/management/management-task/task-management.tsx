import { Icon } from "@iconify/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TablePagination, TableTanStack } from "components/table"
import { taskPriority, taskStatus } from "constants/mock"
import { TASKS, TaskType } from "constants/utinities"
import React, { useState } from "react"
import { getLabelOptions } from "utils/options"
import { Box, Button, Input, Page, Select, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    status: 0,
    priority: 0
}

const TaskManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const { Option } = Select;

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
            console.log('Call api delete task with id: ', id)

            openSnackbar({
                text: 'Xóa nhiệm vụ thành công',
                type: 'success',
                duration: 5000,
            });
        })
    }

    const columns: ColumnDef<TaskType>[] = [
        {
            accessorKey: 'title',
            header: 'Tên nhiệm vụ',
            size: 300
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <div className="text-[14px] text-white font-medium leading-[1] bg-gray-500 px-2 py-[6px] rounded-xl">
                        {
                            getLabelOptions(row.original.status, taskStatus)
                        }
                    </div>
                </div>
            ),
        },
        {
            id: 'priority',
            header: 'Ưu tiên',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <div className="text-[14px] text-white font-medium leading-[1] bg-red-600 px-2 py-[6px] rounded-xl"
                        style={{
                            backgroundColor: row.original.priority === 1 ? '#16a34a' : row.original.priority === 2 ? '#eab308' : '#dc2626'
                        }}
                    >
                        {
                            getLabelOptions(row.original.priority, taskPriority)
                        }
                    </div>
                </div>
            ),
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/task-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/task-update?id=${row.original.id}`)}
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

    const filteredData = TASKS.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(param.keyword.toLowerCase())
        const matchesStatus = param.status === 0 || item.status === param.status;
        const matchesPriority = param.priority === 0 || item.priority === param.priority;

        return matchesSearch && matchesStatus && matchesPriority ;
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý nhiệm vụ" />
                <Box p={4}>
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
                            onClick={() => navigate('/task-add')}
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
                                // defaultValue={3}
                                placeholder="Chọn trạng thái"
                                closeOnSelect
                                onChange={(value) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        status: value as number
                                    }));
                                }}
                            >
                                <Option title={'Tất cả'} value={0} />
                                {
                                    taskStatus.map((item) => (
                                        <Option key={item.value} title={item.label} value={item.value} />
                                    ))
                                }
                            </Select>
                        </div>
                        <div>
                            <Select
                                // defaultValue={3}
                                placeholder="Chọn độ ưu tiên"
                                closeOnSelect
                                onChange={(value) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        priority: value as number
                                    }));
                                }}
                            >
                                <Option title={'Tất cả'} value={0} />
                                {
                                    taskPriority.map((item) => (
                                        <Option key={item.value} title={item.label} value={item.value} />
                                    ))
                                }
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
                message="Bạn có chắc chắn muốn xóa nhiệm vụ này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default TaskManagementPage