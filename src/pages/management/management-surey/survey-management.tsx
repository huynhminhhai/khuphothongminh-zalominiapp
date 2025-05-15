import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteSurvey, useGetSurveyListNormal, useGetSurveyStatus } from "apiRequest/survey"
import images from "assets/images"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { formatDate } from "utils/date"
import { Box, Input, Page, useNavigate } from "zmp-ui"

const SurveyManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        search: "",
    });

    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account?.apId : 0,
        keyword: ''
    })

    const { data, isLoading } = useGetSurveyListNormal(param);
    const { data: surveyStatus } = useGetSurveyStatus();
    const { mutate: deleteSurvey } = useDeleteSurvey();

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
            id: 'Thời gian',
            header: 'Đến ngày',
            cell: ({ row }) => (
                <div>{formatDate(row.original.tuNgay)} - {formatDate(row.original.denNgay)}</div>
            )
        },
        {
            id: 'info',
            header: 'Thông tin',
            cell: ({ row }) => (
                <div>{row.original.soLuongCauHoiKhaoSat} câu hỏi - <span className="text-blue-700" onClick={() => navigate(`/survey-member?id=${row.original.khaoSatId}`)} >{row.original.soLuongThamGiaKhaoSat} người tham gia</span></div>
            )
        },
        {
            id: 'chart',
            header: 'Kết quả',
            cell: ({ row }) => (
                // hasPermission('Lấy thông tin chi tiết 1 khảo sát', 'XEM') &&
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
                    {
                        // hasPermission('Lấy thông tin chi tiết 1 khảo sát', 'XEM') &&
                        <button
                            onClick={() => navigate(`/survey-detail?id=${row.original.khaoSatId}`)}
                            className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                            <Icon icon='mdi:eye' fontSize={18} />
                        </button>
                    }
                    {
                        // hasPermission('Sửa thông tin 1 khảo sát', 'SUA') &&
                        <button
                            onClick={() => navigate(`/survey-update?id=${row.original.khaoSatId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        // hasPermission('Xóa 1 khảo sát', 'XOA') &&
                        <button
                            onClick={() => removeSurvey(Number(row.original.khaoSatId))}
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
                <HeaderSub title="Quản lý khảo sát" />
                <Box>
                    <Box pb={4}>
                        <FilterBar
                            // showAddButton={hasPermission('Thêm mới 1 khảo sát', 'SUA')}
                            onAddButtonClick={() => navigate("/survey-add")}
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