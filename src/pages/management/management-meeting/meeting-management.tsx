import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteMeeting, useGetMeetingListNormal, useGetMeetingStatus } from "apiRequest/meeting"
import { EmptyData } from "components/data"
import { formatDate, parseDate } from "components/form/DatePicker"
import { HeaderSub } from "components/header-sub"
import { MeetingStatus } from "components/meeting/MeetingItem"
import { ConfirmModal } from "components/modal"
import { NewsSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { copyToClipboard } from "utils/copyToClipboard"
import { getHourFromDate, formatDate as formatDateMeeting } from "utils/date"
import { Box, DatePicker, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const MeetingManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar()
    const { account, hasPermission } = useStoreApp()

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
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: '',
        TieuDe: '',
        ThoiGianBatDau: '',
        ThoiGianKetThuc: '',
        DiaDiem: '',
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
            () => openSnackbar({
                icon: true,
                text: "Sao chép thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            }),
            () => openSnackbar({
                icon: true,
                text: "Sao chép không thành công",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            })
        );
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'tieuDe',
            header: 'Tiêu đề',
            size: 250
        },
        {
            id: 'time',
            header: 'Thời gian họp',
            cell: ({ row }) => (
                <div className="flex flex-col justify-center">
                    <div>{formatDateMeeting(row.original.thoiGianBatDau)}</div>
                    <div>{getHourFromDate(row.original.thoiGianBatDau)} - {getHourFromDate(row.original.thoiGianKetThuc)}</div>
                </div>
            ),
            size: 160
        },
        {
            accessorKey: 'diaDiem',
            header: 'Địa điểm',
            size: 150
        },
        {
            id: 'linkOnl',
            header: 'Link online',
            cell: ({ row }) => {
                return (
                    <>
                        {
                            row.original.linkHopOnLine &&
                            <div className="flex justify-start items-center gap-1">
                                <div className="truncate max-w-[220px]">{row.original.linkHopOnLine}</div>
                                <div className="flex items-center justify-center text-[10px] text-[#fff] leading-[1] rounded-lg w-fit" onClick={() => handleCopy(row.original.linkHopOnLine as string)}>
                                    <Icon fontSize={20} className="text-[#808080]" icon='solar:copy-bold' />
                                </div>
                            </div>
                        }
                    </>
                )
            },
            size: 160
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => (
                <div className="flex justify-start items-center">
                    <MeetingStatus meetingDate={formatDateMeeting(row.original.thoiGianBatDau)} startTime={getHourFromDate(row.original.thoiGianBatDau)} endTime={getHourFromDate(row.original.thoiGianKetThuc)} />
                </div>
            ),
            size: 160
        },
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    {
                        hasPermission('Lấy thông tin chi tiết 1 cuộc họp', 'XEM') &&
                        <button
                            onClick={() => navigate(`/meeting-detail?id=${row.original.cuocHopId}`)}
                            className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                            <Icon icon='mdi:eye' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission('Sửa thông tin 1 cuộc họp', 'SUA') &&
                        <button
                            onClick={() => navigate(`/meeting-update?id=${row.original.cuocHopId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission('Xóa 1 cuộc họp', 'XOA') &&
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
                    <NewsSkeleton count={5} />
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
                        showAddButton={hasPermission('Thêm mới 1 cuộc họp', 'SUA')}
                        onAddButtonClick={() => navigate("/meeting-add")}
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
                                placeholder="Tiêu đề..."
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