import { Icon } from "@iconify/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TableTanStack } from "components/table"
import { News, NEWSDATA } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Page, useNavigate, useSnackbar } from "zmp-ui"

const NewsManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [newsId, setNewsId] = useState<number | undefined>(undefined);

    const removeNews = (id: number | undefined) => {
        setNewsId(id)
        setConfirmVisible(true);
    }

    const handleConfirm = () => {
        if (newsId !== null) {
            setConfirmVisible(false);
            console.log(console.log('Call api delete survey with id: ', 1))

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

    const columns: ColumnDef<News>[] = [
        {
            accessorKey: 'title',
            header: 'Tiêu đề',
            size: 300
        },
        {
            accessorKey: 'publishedDate',
            header: 'Ngày tạo',
        },
        {
            accessorKey: 'views',
            header: 'Lượt xem',
            size: 100
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

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Quản lý tin tức" />
                <Box p={4}>
                    <Box flex justifyContent="flex-end">
                        <Button
                            size="small"
                            variant="secondary"
                            onClick={() => navigate('/news-add')}
                        >
                            <div className="flex items-center gap-1">
                                <Icon fontSize={18} icon='material-symbols:add-rounded' />
                                Thêm tin tức
                            </div>
                        </Button>
                    </Box>
                    <Box mt={4}>

                        <TableTanStack data={NEWSDATA} columns={columns} />
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

export default NewsManagementPage