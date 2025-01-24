import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TablePagination, TableTanStack } from "components/table"
import { RESIDENT, ResidentType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Checkbox, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    isHouseholder: false
}

const ResidentManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
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
                    <Checkbox
                        size="small"
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
            accessorKey: 'address',
            header: 'SĐT',
            size: 300
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/profile-resident?id=${row.original.id}`)}
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

    const filteredData = RESIDENT.filter(item => {
        const matchesSearch = item.fullname.toLowerCase().includes(param.keyword.toLowerCase())
        const matchesRelationship = param.isHouseholder ? item.relationship === 0 : true
        return matchesSearch && matchesRelationship
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý thông tin hộ dân" />
                <Box p={4}>
                    <Box mb={2} flex justifyContent="flex-end">
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => navigate('/resident-craft-management')}
                        >
                            <div className="flex items-center gap-1">
                                Danh sách hồ sơ chưa duyệt
                                <Icon fontSize={18} icon='iconamoon:enter' />
                            </div>
                        </Button>
                    </Box>
                    <Box flex justifyContent="space-between" className="gap-3">
                        <Box className="flex-1">
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
                        </Box>
                        <Box>
                            <Button
                                size="medium"
                                variant="secondary"
                                onClick={() => navigate('/resident-profile-add')}
                            >
                                <div className="flex items-center gap-1">
                                    <Icon fontSize={18} icon='material-symbols:add-rounded' />
                                    Thêm
                                </div>
                            </Button>
                        </Box>
                    </Box>
                    <Box mt={4}>
                        <TableTanStack data={filteredData} columns={columns} />
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

export default ResidentManagementPage