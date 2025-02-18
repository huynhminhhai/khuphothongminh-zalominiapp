import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table"
import { RESIDENTIALGROUPDATA, TEAMDATA, TeamType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Input, Page, Select, useNavigate, useSnackbar } from "zmp-ui"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    residential_group_id: 0
}

const TeamManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const { Option } = Select

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
            confirmAction();
            setConfirmVisible(false);
            setConfirmAction(null);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
        setConfirmAction(null);
    };

    const removeStaff = (id: number) => {
        openConfirmModal(() => {
            console.log('Call api delete news with id: ', id)

            openSnackbar({
                text: 'Xóa nhân sự thành công',
                type: 'success',
                duration: 5000,
            });
        })
    }

    const columns: ColumnDef<TeamType>[] = [
        {
            accessorKey: 'fullname',
            header: 'Họ tên',
        },
        {
            accessorKey: 'phoneNumber',
            header: 'SĐT',
        },
        {
            accessorKey: 'position',
            header: 'Chức vụ',
        },
        {
            id: 'termDate',
            header: 'Nhiệm kỳ',
            size: 250,
            cell: ({ row }) => (
                <div className="flex justify-center items-center gap-3">
                    <div>
                        {row.original.start_date} - {row.original.end_date}
                    </div>
                    <div onClick={() => navigate(`/team-term?id=${row.original.id}`)}>
                        <Icon icon='lucide:edit' fontSize={18} />
                    </div>
                </div>
            )
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/team-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/team-update?id=${row.original.id}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeStaff(row.original.id)}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        <Icon icon='material-symbols:delete' fontSize={18} />
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = TEAMDATA.filter(item => {
        const matchesSearch = item.fullname.toLowerCase().includes(param.keyword.toLowerCase())
        const matchesStatus = param.residential_group_id === 0 || item.status === param.residential_group_id;

        return matchesSearch && matchesStatus;
    });

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý nhân sự" />
                <Box pb={4}>
                    <FilterBar
                        showAddButton
                        onAddButtonClick={() => navigate("/team-add")}
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
                            <Select
                                // defaultValue={3}
                                placeholder="Chọn tổ dân cư"
                                closeOnSelect
                                onChange={(value) => {
                                    setParam((prevParam) => ({
                                        ...prevParam,
                                        residential_group_id: value as number
                                    }));
                                }}
                            >
                                <Option title={'Tất cả'} value={0} />
                                {
                                    RESIDENTIALGROUPDATA.map((item) => (
                                        <Option key={item.id} title={item.name} value={item.id} />
                                    ))
                                }
                            </Select>
                        </div>
                    </FilterBar>
                    <Box pb={1} flex justifyContent="flex-end" className="bg-[#f9f9f9]">
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => navigate('/residential-management')}
                        >
                            <div className="flex items-center gap-1">
                                Quản lý tổ dân cư
                                <Icon fontSize={18} icon='iconamoon:enter' />
                            </div>
                        </Button>
                    </Box>
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
                message="Bạn có chắc chắn muốn xóa nhân sự này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default TeamManagementPage