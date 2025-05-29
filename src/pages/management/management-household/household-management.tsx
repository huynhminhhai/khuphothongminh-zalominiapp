import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteResident, useGetResidentListNormal } from "apiRequest/resident"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { formatAddress } from "utils/useAddress"
import { Box, Button, Input, Page, useNavigate } from "zmp-ui"

const HouseholdManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [filters, setFilters] = useState({
        search: "",
        hoTen: "",
        hoTenChuHo: "",
        soGiayTo: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        HoTen: '',
        HoTenChuHo: '',
        SoGiayTo: '',
        LaChuHo: true
    })

    const { data, isLoading } = useGetResidentListNormal(param);
    const { mutate: deleteResident } = useDeleteResident();

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
    useDebouncedParam(filters.hoTen, 'HoTen');
    useDebouncedParam(filters.hoTenChuHo, 'HoTenChuHo');
    useDebouncedParam(filters.soGiayTo, 'SoGiayTo');

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

    const removeResident = (id: number) => {
        openConfirmModal(() => deleteResident(id));
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'hoTen',
            header: 'Chủ hộ',
            size: 180,
            cell: ({ row }) => (
                <div className="text-blue-700 font-semibold" onClick={() => navigate(`/profile-resident?id=${row.original.danCuId}`)}>
                    {row.original.hoTen}
                </div>
            )
        },
        {
            id: 'thuongTru',
            header: 'Thường trú',
            size: 250,
            cell: ({ row }) => (
                <div>
                    {formatAddress(row.original.noiThuongTru)}
                </div>
            ),
        },
        {
            id: 'hoNgheo',
            header: 'Hộ nghèo',
            size: 140,
            cell: ({ row }) => (
                <button
                    onClick={() => navigate(`/household-hongheo-update?danCuId=${row.original.danCuId}&loai=1`)}
                    className="focus:outline-none"
                    aria-label={row.original.thongTinHoGiaDinh?.chiTietHoNgheo ? 'Cập nhật hộ nghèo' : 'Thêm hộ nghèo'}
                >
                    <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold transition-colors duration-200 ${row.original.thongTinHoGiaDinh?.chiTietHoNgheo
                                ? 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {row.original.thongTinHoGiaDinh?.chiTietHoNgheo ? (
                            <>
                                <Icon icon="mdi:check-circle" fontSize={14} />
                                Là hộ nghèo
                            </>
                        ) : (
                            <>
                                <Icon icon="mdi:close-circle" fontSize={14} />
                                Không có
                            </>
                        )}
                    </div>
                </button>
            ),
        },
        {
            id: 'hoCanNgheo',
            header: 'Hộ cận nghèo',
            size: 140,
            cell: ({ row }) => (
                <button
                    onClick={() => navigate(`/household-hongheo-update?danCuId=${row.original.danCuId}&loai=2`)}
                    className="focus:outline-none"
                    aria-label={row.original.thongTinHoGiaDinh?.chiTietHoCanNgheo ? 'Cập nhật hộ cận nghèo' : 'Thêm hộ cận nghèo'}
                >
                    <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold transition-colors duration-200 ${row.original.thongTinHoGiaDinh?.chiTietHoCanNgheo
                                ? 'bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {row.original.thongTinHoGiaDinh?.chiTietHoCanNgheo ? (
                            <>
                                <Icon icon="mdi:check-circle" fontSize={14} />
                                Là hộ cận nghèo
                            </>
                        ) : (
                            <>
                                <Icon icon="mdi:close-circle" fontSize={14} />
                                Không có
                            </>
                        )}
                    </div>
                </button>
            ),
        },
        {
            id: 'giaDinhVanHoa',
            header: 'Gia đình văn hóa',
            size: 140,
            cell: ({ row }) => (
                <button
                    onClick={() => navigate(`/household-hongheo-update?danCuId=${row.original.danCuId}&loai=3`)}
                    className="focus:outline-none"
                    aria-label={row.original.thongTinHoGiaDinh?.chiTietGiaDinhVanHoa ? 'Cập nhật gia đình văn hóa' : 'Thêm gia đình văn hóa'}
                >
                    <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold transition-colors duration-200 ${row.original.thongTinHoGiaDinh?.chiTietGiaDinhVanHoa
                                ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {row.original.thongTinHoGiaDinh?.chiTietGiaDinhVanHoa ? (
                            <>
                                <Icon icon="mdi:check-circle" fontSize={14} />
                                Đạt chuẩn
                            </>
                        ) : (
                            <>
                                <Icon icon="mdi:close-circle" fontSize={14} />
                                Chưa đạt chuẩn
                            </>
                        )}
                    </div>
                </button>
            ),
        },
        {
            id: 'actions',
            header: 'Lịch sử',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/household-detail-list?danCuId=${row.original.danCuId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
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

        if (!data?.data?.length) {
            return (
                <Box px={4}>
                    <EmptyData
                        title="Hiện chưa có hộ gia đình nào!"
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
                <HeaderSub title="Quản lý thông tin hộ gia đình" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
                        onAddButtonClick={() => navigate("/resident-profile-add")}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Họ và tên chủ hộ"
                                value={filters.search}
                                onChange={(e) => updateFilter('search', e.target.value)}
                            />
                        </div>
                    </FilterBar>
                    <Box pb={1} flex justifyContent="flex-end" className="bg-[#f9f9f9]">
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => navigate('/maps')}
                        >
                            <div className="flex items-center gap-1">
                                Bản đồ hộ gia đình
                                <Icon fontSize={18} icon='tabler:map-2' />
                            </div>
                        </Button>
                    </Box>
                    <Box>
                        {renderContent()}
                    </Box>
                </Box>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn xóa thông tin hộ gia đình này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default HouseholdManagementPage