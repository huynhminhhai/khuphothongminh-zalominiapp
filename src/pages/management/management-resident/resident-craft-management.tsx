import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { districtOptions, provinceOptions, wardOptions } from "constants/mock"
// import { RESIDENTCRAFT, ResidentType } from "constants/utinities"
import React, { useState } from "react"
import { getLabelOptions } from "utils/options"
import { Box, Checkbox, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    isHouseholder: false
}

const ResidentCraftManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [param, setParam] = useState(initParam)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

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
            confirmAction(); // Gọi hành động đã lưu
            setConfirmVisible(false);
            setConfirmAction(null);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
        setConfirmAction(null);
    };

    const removeResident = (id: number) => {
        openConfirmModal(() => {
            console.log('Call API delete resident with id:', id);

            // Hiển thị thông báo
            openSnackbar({
                text: 'Xóa thông tin hộ dân thành công',
                type: 'success',
                duration: 5000,
            });
        })
    }

    const columns: ColumnDef<ResidentType>[] = [
        {
            accessorKey: 'fullname',
            header: 'Tên',
            size: 200
        },
        {
            id: 'isParent',
            header: () => (
                <div className="flex items-center justify-center gap-1">
                    Chủ hộ
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    {
                        row.original.parentId ?
                            <Icon className="text-red-700" fontSize={25} icon='material-symbols-light:close-rounded' />
                            :
                            <Icon className="text-green-700" fontSize={30} icon='hugeicons:tick-01' />
                    }
                </div>
            ),
            size: 100
        },
        {
            accessorKey: 'phoneNumber',
            header: 'SĐT',
        },
        {
            id: 'address',
            header: 'Địa chỉ',
            cell: ({ row }) => (
                <div className="flex items-center justify-center line-clamp-1">
                    {`${row.original.addressPermanent}, ${wardOptions.find(item => item.id === row.original.wardsPermanent)?.name}, ${districtOptions.find(item => item.id === row.original.districtPermanent)?.name}, ${getLabelOptions(row.original.provincePermanent, provinceOptions)}`}
                </div>
            ),
            size: 300
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/resident-craft?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    {/* <button
                        onClick={() => navigate(`/news-update?id=${row.original.id}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button> */}
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

    const filteredData = RESIDENTCRAFT.filter(item => {
        const matchesSearch = item.fullname.toLowerCase().includes(param.keyword.toLowerCase())
        const matchesRelationship = param.isHouseholder ? Boolean(item.isHouseHold) : true
        return matchesSearch && matchesRelationship
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý thông tin chưa duyệt" />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm..."
                                value={param.keyword}
                                onChange={(e) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        keyword: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        <div className="col-span-12">
                            <div className="flex items-center justify-start gap-2">
                                <Checkbox
                                    size="medium"
                                    label=""
                                    value=''
                                    checked={param.isHouseholder}
                                    onChange={() => {
                                        setParam((prevParam) => ({
                                            ...prevParam,
                                            isHouseholder: !param.isHouseholder
                                        }));
                                    }}
                                />
                                <span className="text-[16px]">Chủ hộ</span>
                            </div>
                        </div>
                    </FilterBar>
                    <Box>
                        {viewCard ?
                            <CardTanStack data={filteredData} columns={columns} />
                            :
                            <Box px={4}>
                                <TableTanStack data={filteredData} columns={columns} />
                            </Box>
                        }
                        <TablePagination
                            totalItems={50}
                            pageSize={param.pageSize}
                            pageIndex={param.pageIndex}
                            onPageChange={handlePageChange}
                            onRowChange={handleRowChange}
                        />
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

export default ResidentCraftManagementPage