import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteFeedback, useGetFeedbackListNormal, useGetFeedbackStatus, useUpdateFeedbackStatus } from "apiRequest/feeback"
import images from "assets/images"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { openUrlInWebview } from "services/zalo"
import { useStoreApp } from "store/store"
import { getFullImageUrl, isImage } from "utils/file"
import { PermissionActions, permissionsList } from "utils/permission"
import { Box, Input, Page, Select, Swiper, useNavigate } from "zmp-ui"

const FeedbackManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const { Option } = Select;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
    })

    const { data, isLoading } = useGetFeedbackListNormal(param);
    const { data: feedbackStatus } = useGetFeedbackStatus();
    const { mutate: deleteFeedback } = useDeleteFeedback();

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

    const removeFeedback = (id: number) => {
        openConfirmModal(() => {
            deleteFeedback(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa phản ánh này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            id: 'tapTinPhanAnhs',
            header: 'Ảnh',
            size: 300,
            cell: ({ row }) => {

                const imageFiles = row.original?.tapTinPhanAnhs?.filter(item =>
                    isImage(item.tapTin)
                ) || [];

                return (
                    <Box>
                        <Swiper className="w-full h-[150px]" style={{ borderRadius: 0 }}>
                            {imageFiles && imageFiles.length > 0 ? (
                                imageFiles.map((item, index) => (
                                    <Swiper.Slide key={index}>
                                        <img
                                            onClick={() => openUrlInWebview(getFullImageUrl(item.tapTin))}
                                            className="slide-img object-cover w-full h-full"
                                            src={getFullImageUrl(item.tapTin)}
                                            alt={row.original?.noiDung}
                                        />
                                    </Swiper.Slide>
                                ))
                            ) : (
                                <Swiper.Slide>
                                    <img
                                        className="slide-img object-cover w-full h-full"
                                        src={images.feedback}
                                        alt={row.original?.noiDung}
                                    />
                                </Swiper.Slide>
                            )}
                        </Swiper>
                    </Box>
                )
            }
        },
        {
            id: 'tieuDe',
            header: 'Tiêu đề',
            size: 300,
            cell: ({ row }) => {

                return (
                    <div >Kiến nghị: {row.original.tenLinhVucPhanAnh}</div>
                )
            }
        },
        {
            id: 'tinhTrangId',
            header: 'Trạng thái',
            cell: ({ row }) => {
                const { mutate, isPending } = useUpdateFeedbackStatus();

                return (
                    <Box width={150}>
                        <Select
                            closeOnSelect
                            defaultValue={row.original.tinhTrangId}
                            onChange={(value) => {
                                openConfirmModal(() => {
                                    mutate({
                                        phanAnhId: row.original.phanAnhId,
                                        tinhTrangId: Number(value),
                                    });
                                }, 'Xác nhận thay đổi', 'Bạn có chắc chắn muốn thay đổi trạng thái phản ánh này?')
                            }}
                            className="h-[30px] !bg-gray-100 !border-[0px] !rounded"
                            disabled={
                                isPending
                                || !hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, PermissionActions.SUA)
                            }
                        >
                            {feedbackStatus?.tinhTrangs?.map((item) => (
                                <Option
                                    value={item.tinhTrangId}
                                    key={item.tinhTrangId}
                                    title={item.tenTinhTrang}
                                />
                            ))}
                        </Select>
                    </Box>
                );
            }
        },
        {
            id: 'published',
            header: 'Công khai',
            cell: ({ row }) => {

                return (
                    <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-1">
                            {row.original.congKhaiThongTinCaNhan ? (
                                <Icon className="text-green-700" fontSize={16} icon='mdi:tick' />
                            ) : (
                                <Icon className="text-red-700" fontSize={16} icon='material-symbols:close' />
                            )}
                            <span className="text-[13px] flex-1">Thông tin cá nhân</span>
                        </div>

                        <div className="flex items-center gap-1">
                            {row.original.congKhaiPhanAnh ? (
                                <Icon className="text-green-700" fontSize={16} icon='mdi:tick' />
                            ) : (
                                <Icon className="text-red-700" fontSize={16} icon='material-symbols:close' />
                            )}
                            <span className="text-[13px] flex-1">Phản ánh</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/feedback-detail?id=${row.original.phanAnhId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {
                        hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/feedback-answer?id=${row.original.phanAnhId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='mynaui:send-solid' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeFeedback(row.original.phanAnhId)}
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
                        title="Hiện chưa có phản ánh nào!"
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
                <HeaderSub title="Quản lý phản ánh" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
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
        </Page>
    )
}

export default FeedbackManagementPage