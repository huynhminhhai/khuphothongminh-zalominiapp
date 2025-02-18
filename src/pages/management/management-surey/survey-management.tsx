import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import images from "assets/images"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { SURVEYDATA, SurveyType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
}

const SurveyManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [surveyId, setSurveyId] = useState<number | undefined>(undefined);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [param, setParam] = useState(initParam)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

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

    const openConfirmModal = (action: () => void) => {
        setConfirmAction(() => action);
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

    const removeSurvey = (id: number) => {
        openConfirmModal(() => {
            console.log('Call api delete survey with id: ', 1)

            openSnackbar({
                text: 'Xóa khảo sát thành công',
                type: 'success',
                duration: 5000,
            });
        })
    }

    const columns: ColumnDef<SurveyType>[] = [
        {
            accessorKey: 'title',
            header: 'Tiêu đề',
            size: 300
        },
        {
            accessorKey: 'expiryDate',
            header: 'Thời hạn',
        },
        {
            accessorKey: 'countAnswer',
            header: 'Lượt khảo sát',
        },
        {
            id: 'chart',
            header: 'Tổng quan',
            cell: ({ row }) => (
                <div className="flex items-center justify-center" onClick={() => navigate(`/survey-charts?id=${row.original.id}`)}>
                    <img width={30} src={images.pieChart} alt={row.original.title} />
                </div>
            )
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/survey-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/survey-update?id=${row.original.id}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeSurvey(Number(row.original.id))}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        <Icon icon='material-symbols:delete' fontSize={18} />
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = SURVEYDATA.filter(item =>
        item.title.toLowerCase().includes(param.keyword.toLowerCase())
    );

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý khảo sát" />
                <Box>
                    <Box pb={4}>
                        <FilterBar
                            showAddButton
                            onAddButtonClick={() => navigate("/survey-add")}
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
                    message="Bạn có chắc chắn muốn xóa khảo sát này không?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </Box>
        </Page>
    )
}

export default SurveyManagementPage