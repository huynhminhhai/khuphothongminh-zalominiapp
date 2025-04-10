import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteTask, useGetTaskListNormal, useGetTaskStatus, useUpdateTaskStatus } from "apiRequest/task"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { Box, Button, Input, Page, Select, useNavigate } from "zmp-ui"

const TaskManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

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

    const { data, isLoading } = useGetTaskListNormal(param);
    const { data: taskStatus } = useGetTaskStatus();
    const { mutate: deleteTask } = useDeleteTask();

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

    const removeFeedback = (id: number) => {
        openConfirmModal(() => {
            deleteTask(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa nhiệm vụ này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'tieuDe',
            header: 'Tiêu đề',
            size: 300
        },
        {
            accessorKey: 'noiDung',
            header: 'Nội dung',
            size: 300
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => {
                const { mutate, isPending } = useUpdateTaskStatus();

                return (
                    <Box width={180}>
                        <Select
                            closeOnSelect
                            defaultValue={row.original.tinhTrangId}
                            onChange={(value) => {
                                openConfirmModal(() => {
                                    mutate({
                                        nhiemVuId: row.original.nhiemVuId,
                                        tinhTrangId: Number(value),
                                    });
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái phản ánh này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={isPending || !hasPermission('Cập nhật tình trạng của 1 nhiệm vụ', 'SUA')}
                        >
                            {taskStatus && taskStatus.map((item) => (
                                <Option
                                    value={item.tinhTrangId}
                                    key={item.tinhTrangId}
                                    title={item.tenTinhTrang}
                                />
                            ))}
                        </Select>
                    </Box>
                );
            },
        },
        // {
        //     id: 'priority',
        //     header: 'Ưu tiên',
        //     cell: ({ row }) => (
        //         <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
        //             <div className="text-[14px] text-white font-medium leading-[1] bg-red-600 px-2 py-[6px] rounded-xl"
        //                 style={{
        //                     backgroundColor: row.original.priority === 1 ? '#16a34a' : row.original.priority === 2 ? '#eab308' : '#dc2626'
        //                 }}
        //             >
        //                 {
        //                     getLabelOptions(row.original.priority, taskPriority)
        //                 }
        //             </div>
        //         </div>
        //     ),
        // },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    {
                        hasPermission('Lấy thông tin chi tiết 1 nhiệm vụ', 'XEM') &&
                        <button
                            onClick={() => navigate(`/task-detail?id=${row.original.nhiemVuId}`)}
                            className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                            <Icon icon='mdi:eye' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission('Sửa thông tin 1 nhiệm vụ', 'SUA') &&
                        <button
                            onClick={() => navigate(`/task-update?id=${row.original.nhiemVuId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission('Xóa 1 tập tin nhiệm vụ', 'XOA') &&
                        <button
                            onClick={() => removeFeedback(row.original.nhiemVuId)}
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
                        title="Hiện chưa có nhiệm vụ nào!"
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
                <HeaderSub title="Quản lý nhiệm vụ" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={hasPermission('Thêm mới 1 nhiệm vụ', 'SUA')}
                        onAddButtonClick={() => navigate("/task-add")}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                            />
                        </div>
                    </FilterBar>
                    <Box pb={1} flex justifyContent="flex-end" className="bg-[#f9f9f9]">
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => navigate('/task')}
                        >
                            <div className="flex items-center gap-1">
                                Nhiệm vụ của tôi
                                <Icon fontSize={18} icon='iconamoon:enter' />
                            </div>
                        </Button>
                    </Box>
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

export default TaskManagementPage