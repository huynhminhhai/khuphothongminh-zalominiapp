import { ColumnDef } from "@tanstack/react-table"
import { useGetHouseholdListNormal } from "apiRequest/household"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton } from "components/skeleton"
import { CardTanStack, TablePagination, TableTanStack } from "components/table"
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { formatDate } from "utils/date"
import { Box, Page } from "zmp-ui"

const statusLabels = {
    hoNgheo: "Hộ nghèo",
    hoCanNgheo: "Hộ cận nghèo",
    giaDinhVanHoa: "Gia đình văn hóa",
};

const statusColors = {
    hoNgheo: "text-red-500 border-red-500",
    hoCanNgheo: "text-orange-500 border-orange-500",
    giaDinhVanHoa: "text-green-600 border-green-600",
};


const HouseholdDetailListPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const danCuId = searchParams.get("danCuId");

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [viewCard, setViewCard] = useState<boolean>(true)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [filters, setFilters] = useState({

    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        DanCuId: Number(danCuId)
    })

    const { data, isLoading } = useGetHouseholdListNormal(param);
    // const { data: residentDetail, isLoading: isLoadingDetail } = useGetResidentDetail(Number(danCuId));

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

    const columns: ColumnDef<any>[] = [
        {
            id: 'congNhan',
            header: 'Công nhận',
            cell: ({ row }) => (
                <div>
                    {Object.entries(statusLabels).map(([key, label]) => {
                        if (!row.original[key]) return null; // chỉ hiển thị nếu true

                        return (
                            <div
                                key={key}
                                className={`border-[2px] w-fit px-3 py-1 rounded-full text-[12px] font-semibold leading-[1] ${statusColors[key]}`}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>
            ),
        },
        {
            id: 'soHieu',
            header: 'Số, ký hiệu văn bản',
            cell: ({ row }) => (
                <div>
                    {
                        row.original.soHieu || '-'
                    }
                </div>
            ),
        },
        {
            id: 'trichYeu',
            header: 'Trích yếu',
            cell: ({ row }) => (
                <div>
                    {
                        row.original.trichYeu || '-'
                    }
                </div>
            ),
        },
        {
            id: 'coQuanBanHanh',
            header: 'Cơ quan ban hành',
            cell: ({ row }) => (
                <div>
                    {
                        row.original.coQuanBanHanh || '-'
                    }
                </div>
            ),
        },
        {
            id: 'tuNgay',
            header: 'Ngày công nhận',
            cell: ({ row }) => (
                <div>
                    {formatDate(row.original.tuNgay)}
                </div>
            ),
        },
        {
            id: 'denNgay',
            header: 'Ngày hết hạn',
            cell: ({ row }) => (
                <div>
                    {row.original.denNgay ? formatDate(row.original.denNgay) : '-'}
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
                        title="Hiện chưa có lịch sử công nhận nào!"
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
                <HeaderSub title="Lịch sử công nhận" />
                <Box pb={4}>
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

export default HouseholdDetailListPage