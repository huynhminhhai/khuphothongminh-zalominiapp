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
            size: 200
        },
        {
            id: 'thuongTru',
            header: 'Thường trú',
            cell: ({ row }) => (
                <div className="line-clamp-2 text-[14px]">
                    {formatAddress(row.original.noiThuongTru)}
                </div>
            ),
            size: 300
        },
        {
            id: 'hoNgheo',
            header: 'Hộ nghèo',
            cell: ({ row }) => (
                <div
                    onClick={() => navigate(`/household-hongheo-update?danCuId=${row.original.danCuId}&loai=1`)}
                >
                    {
                        row.original.thongTinHoGiaDinh?.chiTietHoNgheo ?
                            <div className="text-[12px] font-semibold leading-[1] text-red-700 px-4 py-1 border-[2px] border-red-700 w-fit rounded-3xl">Là hộ nghèo</div>
                            : <div className="text-[12px] font-semibold leading-[1] text-gray-500 px-4 py-1 border-[2px] border-gray-500 w-fit rounded-3xl">Không có</div>

                    }
                </div>
            ),
        },
        {
            id: 'hoCanNgheo',
            header: 'Hộ cận nghèo',
            cell: ({ row }) => (
                <div
                    onClick={() => navigate(`/household-hongheo-update?danCuId=${row.original.danCuId}&loai=2`)}
                >
                    {
                        row.original.thongTinHoGiaDinh?.chiTietHoCanNgheo ?
                            <div className="text-[12px] font-semibold leading-[1] text-orange-700 px-4 py-1 border-[2px] border-orange-700 w-fit rounded-3xl">Là hộ cận nghèo</div>
                            : <div className="text-[12px] font-semibold leading-[1] text-gray-500 px-4 py-1 border-[2px] border-gray-500 w-fit rounded-3xl">Không có</div>

                    }
                </div>
            ),
        },
        {
            id: 'giaDinhVanHoa',
            header: 'Gia đình văn hóa',
            cell: ({ row }) => (
                <div
                    onClick={() => navigate(`/household-hongheo-update?danCuId=${row.original.danCuId}&loai=3`)}
                >
                    {
                        row.original.thongTinHoGiaDinh?.chiTietGiaDinhVanHoa ?
                            <div className="text-[12px] font-semibold leading-[1] text-green-700 px-4 py-1 border-[2px] border-green-700 w-fit rounded-3xl">Đạt chuẩn</div>
                            : <div className="text-[12px] font-semibold leading-[1] text-gray-500 px-4 py-1 border-[2px] border-gray-500 w-fit rounded-3xl">Chưa đạt chuẩn</div>

                    }
                </div>
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

        if (!data.data.length) {
            return (
                <Box px={4}>
                    <EmptyData
                        title="Hiện chưa có dân cư nào!"
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
                <HeaderSub title="Quản lý thông tin hộ dân" onBackClick={() => navigate('/management')} />
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
                                Bản đồ dân cư
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
                message="Bạn có chắc chắn muốn xóa thông tin hộ dân này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default HouseholdManagementPage