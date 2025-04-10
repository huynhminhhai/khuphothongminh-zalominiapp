import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useGetHuyenList, useGetXaList } from "apiRequest/app"
import { useDeleteFeedback, useGetFeedbackListNormal, useGetFeedbackStatus, useUpdateFeedbackStatus } from "apiRequest/feeback"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { openUrlInWebview } from "services/zalo"
import { useStoreApp } from "store/store"
import { getFullImageUrl } from "utils/file"
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
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: ''
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

                return (
                    <Box>
                        <Swiper className="w-full h-[150px]" autoplay duration={8000} style={{ borderRadius: 0 }}>
                            {
                                row.original.tapTinPhanAnhs ?
                                    row.original.tapTinPhanAnhs.map((item, index) => (
                                        <Swiper.Slide key={index}>
                                            <img
                                                onClick={() => openUrlInWebview(getFullImageUrl(item.tapTin))}
                                                className="slide-img object-cover w-full h-full"
                                                src={getFullImageUrl(item.tapTin)}
                                                alt={row.original?.noiDung}
                                            />
                                        </Swiper.Slide>
                                    ))
                                    :
                                    <Swiper.Slide>
                                        <img
                                            className="slide-img"
                                            src="https://actiosoftware.com/wp-content/uploads/2024/02/resposta-do-smiley-do-cliente-do-feedback-da-avaliacao-1.jpg"
                                            alt={row.original?.noiDung}
                                        />
                                    </Swiper.Slide>
                            }
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
                    <div >Kiến nghị: </div>
                )
            }
        },
        {
            accessorKey: 'noiDung',
            header: 'Nội dung',
            size: 300
        },
        // {
        //     id: 'isAnswer',
        //     header: 'Phản hồi',
        //     cell: ({ row }) => {

        //         return (
        //             <div className="flex items-center justify-center">

        //             </div>
        //         )
        //     }
        // },
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
                            disabled={isPending || !hasPermission('Cập nhật tình trạng của 1 phản ánh', 'SUA')}
                        >
                            {feedbackStatus && feedbackStatus.map((item) => (
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
                                <Icon className="text-green-700" fontSize={16} icon='line-md:confirm' />
                            ) : (
                                <Icon className="text-red-700" fontSize={16} icon='line-md:confirm' />
                            )}
                            <span className="text-[12px] flex-1">Thông tin cá nhân</span>
                        </div>

                        <div className="flex items-center gap-1">
                            {row.original.congKhaiPhanAnh ? (
                                <Icon className="text-green-700" fontSize={16} icon='line-md:confirm' />
                            ) : (
                                <Icon className="text-red-700" fontSize={16} icon='line-md:confirm' />
                            )}
                            <span className="text-[12px] flex-1">Phản ánh</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: 'address',
            header: 'Địa chỉ',
            cell: ({ row }) => {

                const { tinhs } = useStoreApp()
                const [maTinh, setMaTinh] = useState<string | null>(null);
                const [maHuyen, setMaHuyen] = useState<string | null>(null);

                useEffect(() => {
                    if (row.original) {
                        setMaTinh(row.original.maTinh || null);
                        setMaHuyen(row.original.maHuyen || null);
                    }
                }, [row.original]);

                const { data: huyens } = useGetHuyenList(maTinh ?? "");
                const { data: xas } = useGetXaList(maHuyen ?? "");

                return (
                    <div>
                        {`${row.original?.diaChi || ""} 
                                ${tinhs?.find(tinh => tinh.value === row.original?.maTinh)?.label || ""} 
                                ${huyens?.find(huyen => huyen.maHuyen === row.original?.maHuyen)?.tenHuyen || ""} 
                                ${xas?.find(xa => xa.maXa === row.original?.maXa)?.tenXa || ""}`
                            .replace(/ ,/g, "")
                            .trim()}
                    </div>
                )
            }
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    {
                        hasPermission('Lấy thông tin chi tiết 1 phản ánh', 'XEM') &&
                        <button
                            onClick={() => navigate(`/feedback-detail?id=${row.original.phanAnhId}`)}
                            className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                            <Icon icon='mdi:eye' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission('Sửa thông tin 1 phản ánh', 'SUA') &&
                        <button
                            onClick={() => navigate(`/feedback-update?id=${row.original.phanAnhId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission('Xóa 1 phản ánh', 'XOA') &&
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
                        {/* <div className="col-span-12">
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
                        </div> */}
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