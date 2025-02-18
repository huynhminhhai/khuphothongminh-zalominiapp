import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { MeetingStatus } from "components/meeting/MeetingItem"
import { ConfirmModal } from "components/modal"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { MEETINGDATA } from "constants/utinities"
import React, { useState } from "react"
import { copyToClipboard } from "utils/copyToClipboard"
import { Box, Button, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
}

const MeetingManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [meetingId, setMeetingId] = useState<number | undefined>(undefined);
    const [param, setParam] = useState(initParam)

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

    const removeNews = (id: number | undefined) => {
        setMeetingId(id)
        setConfirmVisible(true);
    }

    const handleConfirm = () => {
        if (meetingId !== null) {
            setConfirmVisible(false);
            console.log(console.log('Call api delete survey with id: ', meetingId))

            openSnackbar({
                text: 'Xóa cuộc họp thành công',
                type: 'success',
                duration: 5000,
            });
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

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
            accessorKey: 'title',
            header: 'Tiêu đề',
            size: 250
        },
        {
            id: 'time',
            header: 'Thời gian họp',
            cell: ({ row }) => (
                <div className="flex flex-col justify-center">
                    <div>{row.original.meetingDate}</div>
                    <div>{row.original.startTime} - {row.original.endTime}</div>
                </div>
            ),
            size: 160
        },
        {
            accessorKey: 'address',
            header: 'Địa điểm',
            size: 250
        },
        {
            id: 'linkOnl',
            header: 'Link online',
            cell: ({ row }) => (
                <div className="flex justify-center items-center gap-1">
                    <div>Link họp</div>
                    <div className="flex items-center justify-center text-[10px] text-[#fff] leading-[1] rounded-lg w-fit" onClick={() => handleCopy(row.original.linkOnl as string)}>
                        <Icon fontSize={20} className="text-[#808080]" icon='solar:copy-bold' />
                    </div>
                </div>
            ),
            size: 160
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <MeetingStatus meetingDate={row.original.meetingDate} startTime={row.original.startTime} endTime={row.original.endTime} />
                </div>
            ),
            size: 160
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/meeting-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/meeting-update?id=${row.original.id}`)}
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

    const filteredData = MEETINGDATA.filter(item =>
        item.title.toLowerCase().includes(param.keyword.toLowerCase())
    );

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý cuộc họp" />
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
                        {viewCard ?
                            <CardTanStack data={filteredData} columns={columns} />
                            :
                            <Box px={4}>
                                <TableTanStack data={filteredData} columns={columns} />
                            </Box>
                        }
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
                message="Bạn có chắc chắn muốn xóa cuộc họp này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default MeetingManagementPage