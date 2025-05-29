import { Icon } from "@iconify/react"
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
    hoNgheo: 'bg-red-100 text-red-700 border-red-300',
    hoCanNgheo: 'bg-orange-100 text-orange-700 border-orange-300',
    giaDinhVanHoa: 'bg-green-100 text-green-700 border-green-300',
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
            header: () => <div className="text-[13px] font-semibold text-gray-700">Công nhận</div>,
            size: 180,
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-2">
                    {Object.entries(statusLabels).map(([key, label]) => {
                        if (!row.original[key]) return null; // Only show if true
                        return (
                            <div
                                key={key}
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold border transition-colors duration-200 ${statusColors[key]}`}
                                role="status"
                                aria-label={label}
                            >
                                <Icon
                                    icon="mdi:check-circle"
                                    fontSize={14}
                                    aria-hidden="true"
                                />
                                {label}
                            </div>
                        );
                    })}
                </div>
            ),
        },
        {
            id: 'soHieu',
            header: () => <div className="text-[13px] font-semibold text-gray-700">Số, ký hiệu văn bản</div>,
            size: 150,
            cell: ({ row }) => (
                <div className="text-[13px] text-gray-600 truncate">
                    {row.original.soHieu || <span className="text-gray-400">-</span>}
                </div>
            ),
        },
        {
            id: 'trichYeu',
            header: () => <div className="text-[13px] font-semibold text-gray-700">Trích yếu</div>,
            size: 250,
            cell: ({ row }) => (
                <div
                    className="text-[13px] text-gray-600 line-clamp-2 leading-tight"
                    title={row.original.trichYeu || ''}
                >
                    {row.original.trichYeu || <span className="text-gray-400">-</span>}
                </div>
            ),
        },
        {
            id: 'coQuanBanHanh',
            header: () => <div className="text-[13px] font-semibold text-gray-700">Cơ quan ban hành</div>,
            size: 200,
            cell: ({ row }) => (
                <div className="text-[13px] text-gray-600 truncate">
                    {row.original.coQuanBanHanh || <span className="text-gray-400">-</span>}
                </div>
            ),
        },
        {
            id: 'tuNgay',
            header: () => <div className="text-[13px] font-semibold text-gray-700">Ngày công nhận</div>,
            size: 120,
            cell: ({ row }) => (
                <div className="text-[13px] text-gray-600">
                    {formatDate(row.original.tuNgay) || <span className="text-gray-400">-</span>}
                </div>
            ),
        },
        {
            id: 'denNgay',
            header: () => <div className="text-[13px] font-semibold text-gray-700">Ngày hết hạn</div>,
            size: 120,
            cell: ({ row }) => (
                <div className="text-[13px] text-gray-600">
                    {row.original.denNgay ? formatDate(row.original.denNgay) : <span className="text-gray-400">-</span>}
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
                message="Bạn có chắc chắn muốn xóa thông tin hộ gia đình này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default HouseholdDetailListPage