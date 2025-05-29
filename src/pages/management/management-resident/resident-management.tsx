import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteResident, useGetResidentListNormal } from "apiRequest/resident"
import { EmptyData } from "components/data"
import { CanToggle } from "components/form/FormSwitchField"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { PermissionActions, permissionsList } from "utils/permission"
import { formatAddress } from "utils/useAddress"
import { Box, Button, Input, Page, useNavigate } from "zmp-ui"

const ResidentManagementPage: React.FC = () => {

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
        LaChuHo: false
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
            header: 'Họ tên',
            size: 200
        },
        {
            id: 'isParent',
            header: 'Chủ hộ',
            cell: ({ row }) => (
                <div>
                    {
                        !row.original.laChuHo ?
                            <>{row.original.hoTenChuHo}</>
                            :
                            <>Là chủ hộ</>
                    }
                </div>
            ),
            size: 100
        },
        {
            accessorKey: 'soGiayTo',
            header: 'CCCD',
        },
        {
            accessorKey: 'dienThoai',
            header: 'SĐT',
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
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/profile-resident?id=${row.original.danCuId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {
                        hasPermission(permissionsList.khuPhoToChucDanCuDanCu, PermissionActions.SUA) &&
                        <button
                            onClick={() => navigate(`/resident-profile-update?id=${row.original.danCuId}`)}
                            className="px-3 py-1 bg-blue-700 text-white rounded"
                        >
                            <Icon icon='ri:edit-line' fontSize={18} />
                        </button>
                    }
                    {
                        hasPermission(permissionsList.khuPhoToChucDanCuDanCu, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeResident(row.original.danCuId)}
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

        if (!data?.data?.length) {
            return (
                <Box px={4}>
                    <EmptyData
                        title="Hiện chưa có thành viên hộ gia đình nào!"
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
                <HeaderSub title="Quản lý thông tin thành viên HGD" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={hasPermission(permissionsList.khuPhoToChucDanCuDanCu, PermissionActions.THEM)}
                        onAddButtonClick={() => navigate("/resident-profile-add")}
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
                                placeholder="Họ tên"
                                value={filters.hoTen}
                                onChange={(e) => updateFilter('hoTen', e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                placeholder="Họ tên chủ hộ"
                                value={filters.hoTenChuHo}
                                onChange={(e) => updateFilter('hoTenChuHo', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12">
                            <Input
                                placeholder="Số định danh cá nhân"
                                value={filters.soGiayTo}
                                onChange={(e) => updateFilter('soGiayTo', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12">
                            <CanToggle
                                checked={param.LaChuHo}
                                onChange={(value: boolean) => setParam((prev) => ({ ...prev, LaChuHo: value }))}
                                labelOff={'Tất cả'}
                                labelOn={'Chủ hộ'}
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
                message="Bạn có chắc chắn muốn xóa thông tin thành viên hộ gia đình này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default ResidentManagementPage