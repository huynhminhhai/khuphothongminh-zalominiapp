import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { Feedback, FEEDBACKDATA, FEEDBACKRESPONSES } from "constants/utinities"
import React, { useState } from "react"
import { Box, Input, Page, Select, Switch, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    status: 3
}

const FeedbackManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const { Option } = Select
    const [feedbackData, setFeedbackData] = useState(FEEDBACKDATA);

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    const [param, setParam] = useState(initParam)

    const handlePageChange = (params: { pageIndex: number; pageSize: number }) => {
        setParam((prevParam) => ({
            ...prevParam,
            pageIndex: params.pageIndex, // Cập nhật pageIndex từ params
        }));
        console.log(`Navigated to page: ${params.pageIndex}, pageSize: ${params.pageSize}`);
    };

    // Hàm thay đổi số mục trên mỗi trang
    const handleRowChange = (newPageSize: number) => {
        setParam((prevParam) => ({
            ...prevParam,
            pageSize: newPageSize,
            pageIndex: 1, // Reset về trang đầu tiên khi thay đổi pageSize
        }));
        console.log(`Changed pageSize: ${newPageSize}, reset to page: 1`);
    };

    const openConfirmModal = (action: () => void, title: string, message: string) => {
        setConfirmAction(() => action);  // Lưu hành động xác nhận
        setModalContent({ title, message });
        setConfirmVisible(true);  // Mở modal
    };

    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction(); // Gọi hành động đã lưu
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
            console.log('Call API delete feedback with id:', id);

            // Hiển thị thông báo
            openSnackbar({
                text: 'Xóa phản ánh thành công',
                type: 'success',
                duration: 5000,
            });
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa phản ánh này?');
    };

    const updateStatus = async (id, newStatus) => {
        openConfirmModal(() => {
            try {
                console.log('call api update status with: id', id)
                console.log(newStatus)

                // Cập nhật lại dữ liệu sau khi API thành công
                setFeedbackData(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, status: newStatus } : item
                    )
                );

                openSnackbar({
                    text: 'Thay đổi phản ánh thành công',
                    type: 'success',
                    duration: 5000,
                });
            } catch (error) {
                console.error("Error updating status:", error);
            }
        }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái phản ánh này?')
    };

    const columns: ColumnDef<Feedback>[] = [
        {
            accessorKey: 'title',
            header: 'Tiêu đề',
            size: 300
        },
        {
            id: 'isAnswer',
            header: 'Phản hồi',
            cell: ({ row }) => {

                const hasReplied = FEEDBACKRESPONSES.some(reply => reply.feedbackId === row.original.id);

                return (
                    <div className="flex items-center justify-center">
                        {
                            hasReplied
                                ?
                                <Icon className="text-green-700" fontSize={30} icon='lets-icons:check-fill' />
                                :
                                <Icon className="text-red-700" fontSize={25} icon='ic:round-do-not-disturb-on' />
                        }
                    </div>
                )
            }
        },
        {
            id: 'status',
            header: 'Đăng tải',
            cell: ({ row }) => {
                const currentStatus = row.original.status; // Trạng thái hiện tại
                const handleToggle = () => {
                    const newStatus = currentStatus === 1 ? 2 : 1; // Đảo trạng thái
                    updateStatus(row.original.id, newStatus); // Gọi API cập nhật trạng thái
                };

                return (
                    <Box flex flexDirection="column" alignItems="center" className="gap-2 feedback-switch">
                        <Switch
                            size="medium"
                            checked={currentStatus === 2}
                            onChange={handleToggle}
                        />
                    </Box>
                );
            }
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/feedback-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/feedback-answer?id=${row.original.id}`)}
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

    const filteredData = feedbackData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(param.keyword.toLowerCase());
        const matchesStatus = param.status === 3 || item.status === param.status;
        return matchesSearch && matchesStatus;
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý phản ánh" />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
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
                        <div className="col-span-12">
                            <Select
                                defaultValue={3}
                                closeOnSelect
                                onChange={(value) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        status: value as number
                                    }));
                                }}
                            >
                                <Option value={3} title="Tất cả" />
                                <Option value={1} title="Chưa đăng tải" />
                                <Option value={2} title="Đã đăng tải" />
                            </Select>
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
                            totalItems={80}
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
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default FeedbackManagementPage