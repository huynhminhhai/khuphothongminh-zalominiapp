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
import { formatDate } from "utils/date"
import { PermissionActions, permissionsList } from "utils/permission"
import { Box, Button, Input, Page, Select, useNavigate } from "zmp-ui"

const TaskManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [filters, setFilters] = useState({
        search: "",
        tieuDe: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        TieuDe: '',
        NguoiTao: account?.nguoiDungId,
        TinhTrangId: 0
    })

    const { data, isLoading } = useGetTaskListNormal(param);
    const { data: taskStatus } = useGetTaskStatus();
    const { mutate: deleteTask } = useDeleteTask();

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
    useDebouncedParam(filters.tieuDe, 'TieuDe');

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
            id: 'giaoCho',
            header: 'Giao cho',
            cell: ({ row }) => {
                return (
                    <div>
                        {
                            row.original.nguoiThucHienNhiemVus?.find((item) => item.chuTri === true)?.hoTenNguoiThucHien
                        }
                    </div>
                )
            }
        },
        {
            id: 'thoiHan',
            header: 'Thời hạn',
            cell: ({ row }) => {
                return (
                    <div>
                        {formatDate(row.original.ngayGiao)} - {formatDate(row.original.thoiHanXuLy)}
                    </div>
                )
            }
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
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn cập nhật trạng thái nhiệm vụ này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={
                                isPending
                                || !hasPermission(permissionsList.khuPhoNhiemVuGiaoNhiemVu, PermissionActions.SUA)
                            }
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
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/task-detail?id=${row.original.nhiemVuId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {
                        hasPermission(permissionsList.khuPhoNhiemVuGiaoNhiemVu, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/task-update?id=${row.original.nhiemVuId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoNhiemVuGiaoNhiemVu, PermissionActions.XOA) &&
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

        if (!data?.data?.length) {
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
                        showAddButton={hasPermission(permissionsList.khuPhoNhiemVuGiaoNhiemVu, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate("/task-add")}
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
                                placeholder="Tiêu đề"
                                value={filters.tieuDe}
                                onChange={(e) => updateFilter('tieuDe', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Select
                                placeholder="Tình trạng"
                                value={param.TinhTrangId}
                                closeOnSelect
                                onChange={(e) => setParam(prev => ({ ...prev, TinhTrangId: Number(e) }))}
                            >
                                <Option title="Tất cả" value={0} />
                                {
                                    taskStatus?.map((item) => (
                                        <Option key={item.tinhTrangId} value={item.tinhTrangId} title={item.tenTinhTrang} />
                                    ))
                                }

                            </Select>
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