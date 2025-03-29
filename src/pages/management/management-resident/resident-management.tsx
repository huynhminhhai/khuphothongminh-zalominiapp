import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useGetResidentListNormal } from "apiRequest/resident"
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

const ResidentManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account.apId : 0,
        keyword: ''
    })

    const { data, isLoading } = useGetResidentListNormal(param);

    console.log(data)

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
            pageIndex: params.pageIndex, // Cập nhật pageIndex từ params
        }));
        console.log(`Navigated to page: ${params.pageIndex}, pageSize: ${params.pageSize}`);
    };

    const handleRowChange = (newPageSize: number) => {
        setParam((prevParam) => ({
            ...prevParam,
            pageSize: newPageSize,
            pageIndex: 1, // Reset về trang đầu tiên khi thay đổi pageSize
        }));
        console.log(`Changed pageSize: ${newPageSize}, reset to page: 1`);
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
        // openConfirmModal(() => deleteNews(id));
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
                        row.original.laChuHo ?
                            <Icon className="text-red-700" fontSize={25} icon='line-md:close' />
                            :
                            <Icon className="text-green-700" fontSize={30} icon='line-md:confirm' />
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
            accessorKey: 'tenGioiTinh',
            header: 'Giới tính',
        },
        {
            id: 'ngaySinh',
            header: 'Ngày sinh',
            cell: ({ row }) => (
                <div>
                    {
                        formatDate(row.original.ngaySinh)
                    }
                </div>
            ),
            size: 100
        },
        {
            accessorKey: 'dienThoai',
            header: 'SĐT',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        
        {
            id: 'thuongTru',
            header: 'Thường trú',
            cell: ({ row }) => (
                <div className="line-clamp-2 text-[14px]">
                    {
                        row.original.noiThuongTru &&
                        `
                        ${row.original.noiThuongTru.diachi ? row.original.noiThuongTru.diachi : ''}
                        ${row.original.noiThuongTru.tenXa ? row.original.noiThuongTru.tenXa : ''}
                        ${row.original.noiThuongTru.tenHuyen ? row.original.noiThuongTru.tenHuyen : ''}
                        ${row.original.noiThuongTru.tenTinh ? row.original.noiThuongTru.tenTinh : ''}
                        `
                    }
                </div>
            ),
            size: 300
        },
        {
            id: 'tamTru',
            header: 'Tạm trú',
            cell: ({ row }) => (
                <div className="line-clamp-2 text-[14px]">
                    {
                        row.original.noiTamTru &&
                        `
                        ${row.original.noiTamTru.diachi ? row.original.noiTamTru.diachi : ''}
                        ${row.original.noiTamTru.tenXa ? row.original.noiTamTru.tenXa : ''}
                        ${row.original.noiTamTru.tenHuyen ? row.original.noiTamTru.tenHuyen : ''}
                        ${row.original.noiTamTru.tenTinh ? row.original.noiTamTru.tenTinh : ''}
                        `
                    }
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
                        onClick={() => navigate(`/profile-resident?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/resident-profile-update?id=${row.original.id}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeResident(row.original.id)}
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
                <HeaderSub title="Quản lý thông tin hộ dân" />
                <Box pb={4}>
                    <FilterBar
                        showAddButton
                        onAddButtonClick={() => navigate("/resident-profile-add")}
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
                message="Bạn có chắc chắn muốn xóa thông tin hộ dân này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default ResidentManagementPage