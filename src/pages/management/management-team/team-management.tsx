import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteTeam, useGetTeamListNormal } from "apiRequest/team"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { BanDieuHanh } from "components/team/type"
import { debounce } from "lodash"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { Box, Input, Page, Select, useNavigate } from "zmp-ui"

const TeamManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account, hasPermission } = useStoreApp()

    const { Option } = Select

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    const [filters, setFilters] = useState({
        search: "",
        tenChucVu: "",
        hoTen: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account ? account?.apId : 0,
        keyword: '',
        TinhTrang: '',
        TenChucVu: '',
        HoTen: ''
    });

    const { data, isLoading } = useGetTeamListNormal(param);
    const { mutate: deleteTeam } = useDeleteTeam();

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
    useDebouncedParam(filters.tenChucVu, 'TenChucVu');

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

    const removeTeam = (id: number) => {
        openConfirmModal(() => deleteTeam(id));
    }

    const columns: ColumnDef<BanDieuHanh>[] = [
        {
            accessorKey: 'hoTen',
            header: 'Họ tên',
        },
        {
            accessorKey: 'tenChucVu',
            header: 'Chức vụ',
        },
        // {
        //     id: 'address',
        //     header: 'Đơn vị',
        //     size: 250,
        //     cell: ({ row }) => (
        //         <div className="flex items-center gap-3">
        //             {[row.original.tenAp, row.original.tenXa].filter(Boolean).join(', ')}
        //         </div>
        //     )
        // },
        {
            id: 'termDate',
            header: 'Nhiệm kỳ',
            size: 250,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div>
                        {row.original.tuNgay} - {row.original.denNgay}
                    </div>
                </div>
            )
        },
        // {
        //     id: 'actions', // Custom column for actions
        //     header: 'Thao tác',
        //     cell: ({ row }) => (
        //         <div className="flex items-center space-x-2 whitespace-nowrap">
        //             <button
        //                 onClick={() => navigate(`/team-detail?id=${row.original.banDieuHanhId}`)}
        //                 className="px-3 py-1 bg-gray-700 text-white rounded"
        //             >
        //                 <Icon icon='mdi:eye' fontSize={18} />
        //             </button>
        //             <button
        //                 onClick={() => navigate(`/team-update?id=${row.original.banDieuHanhId}`)}
        //                 className="px-3 py-1 bg-blue-700 text-white rounded"
        //             >
        //                 <Icon icon='ri:edit-line' fontSize={18} />
        //             </button>
        //             <button
        //                 onClick={() => removeTeam(row.original.banDieuHanhId)}
        //                 className="px-3 py-1 bg-red-700 text-white rounded"
        //             >
        //                 <Icon icon='material-symbols:delete' fontSize={18} />
        //             </button>
        //         </div>
        //     ),
        // },
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
                <HeaderSub title="Tổ chức" onBackClick={() => navigate('/management')} />
                <Box pb={4}>
                    <FilterBar
                        // showAddButton={hasPermission('Thêm mới 1 dân cư', 'SUA')}
                        showAddButton={false}
                        onAddButtonClick={() => navigate("/team-add")}
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
                                placeholder="Tên chức vụ"
                                value={filters.tenChucVu}
                                onChange={(e) => updateFilter('tenChucVu', e.target.value)}
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
                message="Bạn có chắc chắn muốn xóa thành viên này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default TeamManagementPage