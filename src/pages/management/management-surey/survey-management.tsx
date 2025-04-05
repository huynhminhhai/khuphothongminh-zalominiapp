import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteSurvey, useGetSurveyListNormal, useGetSurveyStatus } from "apiRequest/survey"
import images from "assets/images"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { NewsSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { formatDate } from "utils/date"
import { Box, Input, Page, useNavigate } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
}

const SurveyManagementPage: React.FC = () => {

    const navigate = useNavigate()
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

    const { data, isLoading } = useGetSurveyListNormal(param);
    const { data: surveyStatus } = useGetSurveyStatus();
    const { mutate: deleteSurvey } = useDeleteSurvey();

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

    const removeSurvey = (id: number) => {
        openConfirmModal(() => {
            deleteSurvey(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa khảo sát này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'tieuDe',
            header: 'Tiêu đề',
            size: 300
        },
        {
            id: 'startDate',
            header: 'Từ ngày',
            cell: ({row}) => (
                <div>{formatDate(row.original.tuNgay)}</div>
            )
        },
        {
            id: 'expiryDate',
            header: 'Đến ngày',
            cell: ({row}) => (
                <div>{formatDate(row.original.denNgay)}</div>
            )
        },
        {
            accessorKey: 'soLuongThamGiaKhaoSat',
            header: 'Lượt khảo sát',
        },
        {
            id: 'chart',
            header: 'Kết quả',
            cell: ({ row }) => (
                <div className="flex items-center justify-start" onClick={() => navigate(`/survey-charts?id=${row.original.khaoSatId}`)}>
                    <img width={30} src={images.pieChart} alt={row.original.title} />
                </div>
            )
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/survey-detail?id=${row.original.khaoSatId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/survey-update?id=${row.original.khaoSatId}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeSurvey(Number(row.original.khaoSatId))}
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
                        title="Hiện chưa có khảo sát nào!"
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
                <HeaderSub title="Quản lý khảo sát" onBackClick={() => navigate('/management')} />
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
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                />
                            </div>
                        </FilterBar>
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
            </Box>
        </Page>
    )
}

export default SurveyManagementPage