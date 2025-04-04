import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteMeeting, useGetMeetingListNormal, useGetMeetingStatus } from "apiRequest/meeting"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { MeetingStatus } from "components/meeting/MeetingItem"
import { ConfirmModal } from "components/modal"
import { NewsSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { MEETINGDATA } from "constants/utinities"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { copyToClipboard } from "utils/copyToClipboard"
import { formatDate, getHourFromDate } from "utils/date"
import { Box, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const MeetingManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar()
    const { account } = useStoreApp()

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

    const { data, isLoading } = useGetMeetingListNormal(param);
    const { data: meetingStatus } = useGetMeetingStatus();
    const { mutate: deleteMeeting } = useDeleteMeeting();

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
                    <div>{formatDate(row.original.thoiGianBatDau)}</div>
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
                                <div>sao chép</div>
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
                    <MeetingStatus meetingDate={formatDate(row.original.thoiGianBatDau)} startTime={getHourFromDate(row.original.thoiGianBatDau)} endTime={getHourFromDate(row.original.thoiGianKetThuc)} />
                </div>
            ),
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
                    <button
                        onClick={() => navigate(`/meeting-update?id=${row.original.cuocHopId}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeMeeting(row.original.cuocHopId)}
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
                        showAddButton
                        onAddButtonClick={() => navigate("/meeting-add")}
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