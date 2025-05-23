import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteMeeting, useGetMeetingListNormal, useGetMeetingStatus, useUpdateMeetingStatus } from "apiRequest/meeting"
import { EmptyData } from "components/data"
import { formatDate, parseDate } from "components/form/DatePicker"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { copyToClipboard } from "utils/copyToClipboard"
import { getHourFromDate, formatDate as formatDateMeeting } from "utils/date"
import { PermissionActions, permissionsList } from "utils/permission"
import { useCustomSnackbar } from "utils/useCustomSnackbar"
import { Box, Button, DatePicker, Input, Page, Select, useNavigate } from "zmp-ui"

const MeetingManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { showSuccess, showError } = useCustomSnackbar();
    const { account, hasPermission } = useStoreApp()

    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [filters, setFilters] = useState({
        search: "",
        tieuDe: "",
        diaDiem: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        TieuDe: '',
        ThoiGianBatDau: '',
        ThoiGianKetThuc: '',
        DiaDiem: '',
        NguoiTao: account?.nguoiDungId
    })

    const { data, isLoading } = useGetMeetingListNormal(param);
    const { data: meetingStatus } = useGetMeetingStatus();
    const { mutate: deleteMeeting } = useDeleteMeeting();

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
    useDebouncedParam(filters.diaDiem, 'DiaDiem');

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

    const removeMeeting = (id: number) => {
        openConfirmModal(() => {
            deleteMeeting(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa phản ánh này?');
    }

    const handleCopy = async (linkOnl: string) => {
        copyToClipboard(
            linkOnl,
            () => showSuccess('Sao chép thành công'),
            () => showError('Sao chép thất bại')
        );
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'tieuDe',
            header: 'Tiêu đề',
            size: 250
        },
        {
            accessorKey: 'diaDiem',
            header: 'Địa điểm',
            size: 150
        },
        {
            id: 'time',
            header: 'Thời gian',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div>{formatDateMeeting(row.original.thoiGianBatDau)} | {getHourFromDate(row.original.thoiGianBatDau)} - {getHourFromDate(row.original.thoiGianKetThuc)}</div>
                </div>
            ),
            size: 160
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => {
                const { mutate, isPending } = useUpdateMeetingStatus();

                return (
                    <Box width={180}>
                        <Select
                            closeOnSelect
                            defaultValue={row.original.tinhTrangId}
                            onChange={(value) => {
                                openConfirmModal(() => {
                                    mutate({
                                        cuocHopId: row.original.cuocHopId,
                                        tinhTrangId: Number(value),
                                    });
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái cuộc họp này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={
                                isPending
                                || !hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.SUA)
                            }
                        >
                            {meetingStatus?.tinhTrangs && meetingStatus?.tinhTrangs.map((item) => (
                                <Option
                                    value={item.tinhTrangId}
                                    key={item.tinhTrangId}
                                    title={item.tenTinhTrang}
                                />
                            ))}
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
                        onClick={() => navigate(`/meeting-detail?id=${row.original.cuocHopId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {
                       hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/meeting-update?id=${row.original.cuocHopId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeMeeting(row.original.cuocHopId)}
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
                        title="Hiện chưa có cuộc họp nào!"
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
                <HeaderSub title="Quản lý cuộc họp" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate("/meeting-add")}
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
                            <Input
                                placeholder="Địa điểm..."
                                value={filters.diaDiem}
                                onChange={(e) => updateFilter('diaDiem', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <DatePicker
                                placeholder="Từ ngày"
                                mask
                                maskClosable
                                value={parseDate(param.ThoiGianBatDau)}
                                onChange={(e) => setParam((prev) => ({ ...prev, ThoiGianBatDau: formatDate(e) }))}
                            />
                        </div>
                        <div className="col-span-6">
                            <DatePicker
                                placeholder="Đến ngày"
                                mask
                                maskClosable
                                value={parseDate(param.ThoiGianKetThuc)}
                                onChange={(e) => setParam((prev) => ({ ...prev, ThoiGianKetThuc: formatDate(e) }))}
                            />
                        </div>
                    </FilterBar>
                    <Box pb={1} flex justifyContent="flex-end" className="bg-[#f9f9f9]">
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => navigate('/meeting')}
                        >
                            <div className="flex items-center gap-1">
                                Cuộc họp của tôi
                                <Icon fontSize={18} icon='iconamoon:enter' />
                            </div>
                        </Button>
                    </Box>
                    <Box>
                        {
                            renderContent()
                        }
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

export default MeetingManagementPage