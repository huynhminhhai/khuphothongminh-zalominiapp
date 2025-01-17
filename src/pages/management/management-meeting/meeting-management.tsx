import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TablePagination, TableTanStack } from "components/table"
import { MEETING, meetingColor, meetingStatus, MeetingType } from "constants/utinities"
import React, { useState } from "react"
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
    const [newsId, setNewsId] = useState<number | undefined>(undefined);
    const [param, setParam] = useState(initParam)

    console.log(param)

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
        setNewsId(id)
        setConfirmVisible(true);
    }

    const handleConfirm = () => {
        if (newsId !== null) {
            setConfirmVisible(false);
            console.log(console.log('Call api delete survey with id: ', newsId))

            openSnackbar({
                text: 'Xóa tin tức thành công',
                type: 'success',
                duration: 5000,
            });
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

    const columns: ColumnDef<MeetingType>[] = [
        {
            accessorKey: 'title',
            header: 'Tiêu đề',
            size: 300
        },
        {
            accessorKey: 'time',
            header: 'Thời gian họp'
        },
        {
            accessorKey: 'location',
            header: 'Địa điểm'
        },
        {
            id: 'status',
            header: 'Trạng thái',
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <div style={{ backgroundColor: meetingColor[row.original.status] }} className="mt-2 py-1 px-2 text-white w-fit rounded-xl text-[12px] leading-[1] font-medium">
                        {
                            meetingStatus[row.original.status]
                        }
                    </div>
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
                        onClick={() => navigate(`/news-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/news-update?id=${row.original.id}`)}
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

    const filteredData = MEETING.filter(item =>
        item.title.toLowerCase().includes(param.keyword.toLowerCase())
    );

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý cuộc họp" />
                <Box p={4}>
                    <Box flex justifyContent="space-between">
                        <Box>
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
                            onClick={() => navigate('/news-add')}
                        >
                            <div className="flex items-center gap-1">
                                <Icon fontSize={18} icon='material-symbols:add-rounded' />
                                Thêm
                            </div>
                        </Button>
                    </Box>
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
                message="Bạn có chắc chắn muốn xóa tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default MeetingManagementPage