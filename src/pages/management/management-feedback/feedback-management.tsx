import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TableTanStack } from "components/table"
import { Feedback, FEEDBACKDATA, FEEDBACKRESPONSES } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Input, Page, Select, Switch, useNavigate, useSnackbar } from "zmp-ui"

const FeedbackManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const { Option } = Select

    const [searchValue, setSearchValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>("3");
    const [feedbackData, setFeedbackData] = useState(FEEDBACKDATA);

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

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
                        <span className="text-[12px] leading-[1] font-medium">
                            {currentStatus === 2 ? "Đã đăng tải" : "Chưa đăng tải"}
                        </span>
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
        const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesStatus = selectedStatus === "3" || item.status.toString() === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Quản lý phản ánh" />
                <Box p={4}>
                    <Box flex justifyContent="space-between" className="gap-3">
                        <Box>
                            <Input
                                placeholder="Tìm kiếm..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Select
                                defaultValue="3"
                                closeOnSelect
                                onChange={(value) => setSelectedStatus(value as string)}
                            >
                                <Option value="3" title="Tất cả" />
                                <Option value="1" title="Chưa đăng tải" />
                                <Option value="2" title="Đã đăng tải" />
                            </Select>
                        </Box>
                    </Box>
                    <Box mt={4}>

                        <TableTanStack data={filteredData} columns={columns} />
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