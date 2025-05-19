import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteNews, useGetNewsListNormal, useGetNewsStatus, useUpdateNewsStatus } from "apiRequest/news"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { NewsType } from "components/news/type"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { getFullImageUrl } from "utils/file"
import { Box, DatePicker, Input, Page, Select, useNavigate } from "zmp-ui"
import { debounce } from "lodash";
import { formatDate, parseDate } from "components/form/DatePicker"
import { PermissionActions, permissionsList } from "utils/permission"

const NewsManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()
    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [filters, setFilters] = useState({
        search: "",
        tacGia: "",
        tieuDe: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: '',
        NgayXuatBanTuNgay: '',
        NgayXuatBanDenNgay: '',
        TacGia: '',
        TieuDe: '',
    })

    const { data, isLoading } = useGetNewsListNormal(param);
    const { data: newsStatus } = useGetNewsStatus();
    const { mutate: deleteNews } = useDeleteNews();

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
    useDebouncedParam(filters.tieuDe, 'TieuDe');
    useDebouncedParam(filters.tacGia, 'TacGia');

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

    const removeNews = (id: number) => {
        openConfirmModal(() => {
            deleteNews(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa phản ánh này?');
    }

    const columns: ColumnDef<NewsType>[] = [
        {
            id: 'anhDaiDien',
            header: 'Ảnh',
            cell: ({ row }) => (
                <div className="flex w-full h-[150px]">
                    <img className="w-full h-full object-cover" src={getFullImageUrl(row.original.anhDaiDien)} alt={row.original.tieuDe} />
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
                                openConfirmModal(() => {
                                    mutate({
                                        tinTucId: row.original.tinTucId,
                                        tinhTrangId: Number(value),
                                    });
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái tin tức này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled=
                            {
                                isPending
                                || !hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, PermissionActions.XUATBAN)
                            }
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
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/news-detail?id=${row.original.tinTucId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {
                        hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/news-update?id=${row.original.tinTucId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeNews(row.original.tinTucId)}
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
                        showAddButton={hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate("/news-add")}
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
                        <div className="col-span-6">
                            <Input
                                placeholder="Tiêu đề"
                                value={filters.tieuDe}
                                onChange={(e) => updateFilter('tieuDe', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                placeholder="Tác giả"
                                value={filters.tacGia}
                                onChange={(e) => updateFilter('tacGia', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <DatePicker
                                placeholder="Từ ngày"
                                mask
                                maskClosable
                                value={parseDate(param.NgayXuatBanTuNgay)}
                                onChange={(e) => setParam((prev) => ({ ...prev, NgayXuatBanTuNgay: formatDate(e) }))}
                            />
                        </div>
                        <div className="col-span-6">
                            <DatePicker
                                placeholder="Đến ngày"
                                mask
                                maskClosable
                                value={parseDate(param.NgayXuatBanDenNgay)}
                                onChange={(e) => setParam((prev) => ({ ...prev, NgayXuatBanDenNgay: formatDate(e) }))}
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