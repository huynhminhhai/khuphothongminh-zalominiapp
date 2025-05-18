import { ColumnDef } from "@tanstack/react-table"
import { useGetSurveyMemberListNormal } from "apiRequest/survey"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, TablePagination, TableTanStack } from "components/table"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useStoreApp } from "store/store"
import { formatDate, getHourFromDate } from "utils/date"
import { Box, Page, useNavigate } from "zmp-ui"

const SurveyMemberPage: React.FC = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()

    const [searchParams] = useSearchParams();
    const surveyId = searchParams.get("id");

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        ApId: account ? account?.apId : 0,
        keyword: '',
        khaoSatId: Number(surveyId)
    })

    const { data, isLoading } = useGetSurveyMemberListNormal(param);

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

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'tenNguoiThucHien',
            header: 'Họ tên',
            size: 300
        },
        {
            id: 'ngayThucHien',
            header: 'Thời gian',
            cell: ({ row }) => (
                <div>{getHourFromDate(row.original.ngayTao)} - {formatDate(row.original.ngayTao)}</div>
            )
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
                        title="Hiện chưa có người thực hiện khảo sát nào!"
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
                <HeaderSub title="Danh sách người khảo sát" />
                <Box>
                    <Box pb={4}>
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
            </Box>
        </Page>
    )
}

export default SurveyMemberPage