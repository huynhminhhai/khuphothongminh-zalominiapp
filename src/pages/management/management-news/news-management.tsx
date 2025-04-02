import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteNews, useGetNewsListNormal, useGetNewsStatus, useUpdateNewsStatus } from "apiRequest/news"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { NewsType } from "components/news/type"
import { NewsSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import React, { useCallback, useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { getFullImageUrl } from "utils/file"
import { Box, Input, Page, Select, useNavigate } from "zmp-ui"
import { debounce } from "lodash";

const NewsManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()

    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: ''
    })

    const { data, isLoading } = useGetNewsListNormal(param);
    const { data: newsStatus } = useGetNewsStatus();
    const { mutate: deleteNews } = useDeleteNews();

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

    const removeNews = (id: number) => {
        openConfirmModal(() => deleteNews(id));
    }

    const columns: ColumnDef<NewsType>[] = [
        {
            id: 'anhDaiDien',
            header: 'Ảnh',
            cell: ({ row }) => (
                <div className="flex w-full h-[150px]">
                    <img className="w-full h-full object-cover"  src={getFullImageUrl(row.original.anhDaiDien)} alt={row.original.tieuDe} />
                </div>
            ),
            size: 300
        },
        {
            id: 'tieuDe',
            header: 'Tiêu đề',
            cell: ({ row }) => (
                <div>
                    {row.original.tieuDe || row.original.moTa}
                </div>
            ),
            size: 250
        },
        {
            id: "tinhTrangId",
            header: "Trạng thái",
            cell: ({ row }) => {
                const { mutate, isPending } = useUpdateNewsStatus();
        
                return (
                    <Box width={150}>
                        <Select
                            closeOnSelect
                            defaultValue={row.original.tinhTrangId}
                            onChange={(value) => {
                                mutate({
                                    tinTucId: row.original.tinTucId,
                                    tinhTrangId: Number(value),
                                });
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={isPending}
                        >
                            {newsStatus && newsStatus.map((item) => (
                                <Option
                                    value={item.tinhTrangId}
                                    key={item.tinhTrangId}
                                    title={item.tenTinhTrang}
                                />
                            ))}
                        </Select>
                    </Box>
                );
            },
            size: 160,
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/news-detail?id=${row.original.tinTucId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/news-update?id=${row.original.tinTucId}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeNews(row.original.tinTucId)}
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
                        title="Hiện chưa có tin tức nào!"
                        desc="Nhấn vào nút Thêm để bắt đầu!"
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
                <HeaderSub title="Quản lý tin tức" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton
                        onAddButtonClick={() => navigate("/news-add")}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
                title="Xác nhận"
                message="Bạn có chắc chắn muốn xóa tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default NewsManagementPage