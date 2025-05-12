import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useDeleteInsurance, useGetInsuranceListNormal } from "apiRequest/insurance";
import { useGetResidentListNormal } from "apiRequest/resident";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub";
import { ConfirmModal } from "components/modal";
import { ManagementItemSkeleton } from "components/skeleton";
import { CardTanStack, FilterBar, TablePagination, TableTanStack } from "components/table";
import React, { useEffect, useMemo, useState } from "react";
import { useStoreApp } from "store/store";
import { formatDate } from "utils/date";
import { Box, Input, Page, useNavigate } from "zmp-ui";
import { debounce } from "lodash";

const InsuranceManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { account, hasPermission } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [viewCard, setViewCard] = useState<boolean>(true);
    const [modalContent, setModalContent] = useState({ title: "", message: "" });
    const [filters, setFilters] = useState({
        search: "",
        soGiayTo: "",
        hoTen: "",
        hoTenChuHo: "",
    });
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        keyword: "",
        HoTen: "",
        HoTenChuHo: "",
        SoGiayTo: "",
        ApId: account ? account.thongTinDanCu?.apId : 0,
        LaChuHo: false,
    });

    const { data: residentList, isLoading: isResidentLoading } = useGetResidentListNormal(param);
    const { mutate: deleteInsurance } = useDeleteInsurance();
    const { data: insuranceList } = useGetInsuranceListNormal({
        page: 1,
        pageSize: 9999999,
        keyword: "",
        DanCuId: null,
        LoaiBaoHiemId: 1,
        MaSo: "",
    });

    const insuranceMap = useMemo(() => {
        const map = {};
        insuranceList?.data?.forEach((item) => {
            map[item.danCuId] = item;
        });
        return map;
    }, [insuranceList]);

    const updateFilter = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const useDebouncedParam = (value: string, key: keyof typeof param) => {
        useEffect(() => {
            const handler = debounce((v: string) => {
                setParam((prev) => ({ ...prev, [key]: v }));
            }, 300);

            handler(value);

            return () => handler.cancel();
        }, [value, key]);
    };

    useDebouncedParam(filters.search, "keyword");
    useDebouncedParam(filters.soGiayTo, "SoGiayTo");
    useDebouncedParam(filters.hoTen, "HoTen");
    useDebouncedParam(filters.hoTenChuHo, "HoTenChuHo");

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

    const removeInsurance = (id: number) => {
        openConfirmModal(
            () => {
                deleteInsurance(id);
            },
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa thẻ BHYT này?"
        );
    };

    const columns: ColumnDef<any>[] = [
        {
            id: "hoTen",
            header: "Họ tên",
            cell: ({ row }) => (
                <div>
                    {row.original.hoTen}
                </div>
            ),
            size: 250,
        },
        {
            id: "maSo",
            header: "Mã số BHYT",
            cell: ({ row }) => (
                <div>
                    {insuranceMap[row.original.danCuId]?.maSo || "Không có"}
                </div>
            ),
            size: 250,
        },
        {
            id: "noiDangKy",
            header: "Nơi đăng ký",
            cell: ({ row }) => (
                <div>
                    {insuranceMap[row.original.danCuId]?.noiDangKy || "Không có"}
                </div>
            ),
            size: 250,
        },
        {
            id: "thoiHan",
            header: "Thời hạn",
            cell: ({ row }) => (
                <div>
                    {insuranceMap[row.original.danCuId]
                        ? `${formatDate(insuranceMap[row.original.danCuId].tuNgay)} - ${formatDate(
                            insuranceMap[row.original.danCuId].denNgay
                        )}`
                        : "Không có"}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Thao tác",
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/insurance?danCuId=${row.original.danCuId}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/insurance-management-add?danCuId=${row.original.danCuId}`)}
                        className="px-3 py-1 bg-green-700 text-white rounded"
                    >
                        <Icon icon="material-symbols:add" fontSize={18} />
                    </button>
                    {insuranceMap[row.original.danCuId] && (
                        <>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/insurance-update?id=${insuranceMap[row.original.danCuId].thongTinBaoHiemId}`
                                    )
                                }
                                className="px-3 py-1 bg-blue-700 text-white rounded"
                            >
                                <Icon icon="ri:edit-line" fontSize={18} />
                            </button>
                            <button
                                onClick={() =>
                                    removeInsurance(insuranceMap[row.original.danCuId].thongTinBaoHiemId)
                                }
                                className="px-3 py-1 bg-red-700 text-white rounded"
                            >
                                <Icon icon="material-symbols:delete" fontSize={18} />
                            </button>
                        </>
                    )}

                </div>
            ),
        },
    ];

    const renderContent = () => {
        if (isResidentLoading) {
            return (
                <Box px={4}>
                    <ManagementItemSkeleton count={2} />
                </Box>
            );
        }

        if (!residentList?.data?.length) {
            return (
                <Box px={4}>
                    <EmptyData title="Hiện chưa có dân cư nào!" desc="Nhấn vào nút Thêm để bắt đầu!" />
                </Box>
            );
        }

        return (
            <Box>
                {viewCard ? (
                    <CardTanStack data={residentList.data} columns={columns} />
                ) : (
                    <Box px={4}>
                        <TableTanStack data={residentList.data} columns={columns} />
                    </Box>
                )}
                <Box px={4}>
                    <TablePagination
                        totalItems={residentList.page.total}
                        pageSize={param.pageSize}
                        pageIndex={param.page}
                        onPageChange={handlePageChange}
                        onRowChange={handleRowChange}
                    />
                </Box>
            </Box>
        );
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Quản lý thẻ BHYT" onBackClick={() => navigate("/management")} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
                        onAddButtonClick={() => navigate("/insurance-management-add")}
                        setViewCard={setViewCard}
                        viewCard={viewCard}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm nhanh"
                                value={filters.search}
                                onChange={(e) => updateFilter("search", e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                placeholder="Họ tên"
                                value={filters.hoTen}
                                onChange={(e) => updateFilter("hoTen", e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                placeholder="Số giấy tờ"
                                value={filters.soGiayTo}
                                onChange={(e) => updateFilter("soGiayTo", e.target.value)}
                            />
                        </div>
                        {/* <div className="col-span-6">
                            <Input
                                placeholder="Tên chủ hộ"
                                value={filters.hoTenChuHo}
                                onChange={(e) => updateFilter("hoTenChuHo", e.target.value)}
                            />
                        </div> */}
                    </FilterBar>

                    <Box>{renderContent()}</Box>
                </Box>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    );
};

export default InsuranceManagementPage;