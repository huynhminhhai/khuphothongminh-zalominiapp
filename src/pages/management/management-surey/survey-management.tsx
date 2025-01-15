import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { TableTanStack } from "components/table"
import { SURVEYDATA, SurveyType } from "constants/utinities"
import React, { useState } from "react"
import { Box, Button, Input, Page, useNavigate, useSnackbar } from "zmp-ui"

const SurveyManagementPage: React.FC = () => {

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [surveyId, setSurveyId] = useState<number | undefined>(undefined);
    const [searchValue, setSearchValue] = useState('');

    const removeSurvey = (id: number | undefined) => {
        setSurveyId(id)
        setConfirmVisible(true);
    }

    const handleConfirm = () => {
        if (surveyId !== null) {
            setConfirmVisible(false);
            console.log(console.log('Call api delete survey with id: ', 1))

            openSnackbar({
                text: 'Xóa khảo sát thành công',
                type: 'success',
                duration: 5000,
            });
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

    const columns: ColumnDef<SurveyType>[] = [
        {
            accessorKey: 'title',
            header: 'Tiêu đề',
            size: 300
        },
        {
            accessorKey: 'expiryDate',
            header: 'Thời hạn',
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/survey-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/survey-update?id=${row.original.id}`)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18} />
                    </button>
                    <button
                        onClick={() => removeSurvey(row.original.id)}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        <Icon icon='material-symbols:delete' fontSize={18} />
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = SURVEYDATA.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý khảo sát" />
                <Box>
                    <Box p={4}>
                        <Box flex justifyContent="space-between">
                            <Box>
                                <Input
                                    placeholder="Tìm kiếm..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </Box>
                            <Button
                                size="medium"
                                variant="secondary"
                                onClick={() => navigate('/survey-add')}
                            >
                                <div className="flex items-center gap-1">
                                    <Icon fontSize={18} icon='material-symbols:add-rounded' />
                                    Thêm
                                </div>
                            </Button>
                        </Box>
                        <Box mt={4}>
                            <TableTanStack data={filteredData} columns={columns} />
                        </Box>
                    </Box>
                </Box>
                <ConfirmModal
                    visible={isConfirmVisible}
                    title="Xác nhận"
                    message="Bạn có chắc chắn muốn xóa khảo sát này không?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </Box>
        </Page>
    )
}

export default SurveyManagementPage