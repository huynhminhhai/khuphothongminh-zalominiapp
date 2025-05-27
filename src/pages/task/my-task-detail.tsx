import { Icon } from "@iconify/react"
import { ColumnDef } from "@tanstack/react-table"
import { useDeleteTienDoNhiemVu, useGetTaskDetail, useGetTienDoThucHienNhiemVuCuaToi } from "apiRequest/task"
import { PrimaryButton } from "components/button"
import { EmptyData } from "components/data"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton, NewsDetailSkeleton } from "components/skeleton"
import { CardTanStack } from "components/table"
import TaskUpdateFormModal from "components/task/TaskModalUpdateForm"
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { openUrlInWebview } from "services/zalo"
import { formatDate } from "utils/date"
import { getFullImageUrl, isImage } from "utils/file"
import { getTinhTrangTaskColor } from "utils/renderColor"
import { Box, Page } from "zmp-ui"

const MyTaskDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });


    const taskId = searchParams.get("id");

    const [param, setParam] = useState({
        page: 1,
        pageSize: 999,
        nhiemVuId: Number(taskId)
    })

    const { data: detailData, isLoading } = useGetTaskDetail(Number(taskId));
    const { data: tienDoThucHienNhiemVuCuaToi, isLoading: isLoadingTienDo } = useGetTienDoThucHienNhiemVuCuaToi(param);
    const { mutate: deleteTienDoNhiemVu } = useDeleteTienDoNhiemVu();

    const { color, bg } = getTinhTrangTaskColor(detailData?.tinhTrang?.tenTinhTrang);

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

    const removeFeedback = (id: number) => {
        openConfirmModal(() => {
            deleteTienDoNhiemVu(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa tiến độ nhiệm vụ này?');
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'hoTen',
            header: 'Người thực hiện'
        },
        {
            id: 'ghiChu',
            header: 'Nội dung báo cáo',
            cell: ({ row }) => {
                return (
                    <div>
                        {
                            row.original.ghiChu
                        }
                    </div>
                )
            }
        },
        {
            id: 'thoiHan',
            header: 'Tập tin đính kèm',
            cell: ({ row }) => {
                return (
                    <div>
                        {
                            row.original.tapTinTienDoThucHienNhiemVus?.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 justify-between mb-2">
                                    <div
                                        className="px-3 py-2 bg-gray-100 rounded-lg flex-1"

                                        onClick={() => openUrlInWebview(getFullImageUrl(item.tapTin))}
                                    >
                                        <div className="flex items-center gap-1">
                                            {isImage(item.tapTin) ? (
                                                <Icon icon="mdi:file-image-outline" fontSize={22} />
                                            ) : (
                                                <Icon icon="codex:file" fontSize={22} />
                                            )}
                                            <div className="text-[14px] font-semibold">{item.tenTapTin}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        },
        {
            id: 'tenTinhTrang',
            header: 'Tình trạng',
            cell: ({ row }) => {
                return (
                    <div>
                        {
                            row.original.tenTinhTrang
                        }
                    </div>
                )
            }
        },
        {
            id: 'actions',
            header: 'Thao tác',
            cell: ({ row }) => (
                <div className="flex items-center justify-start space-x-2 whitespace-nowrap">
                    
                    {
                        // hasPermission(permissionsList.khuPhoNhiemVuNhiemVuCuaToi, PermissionActions.XOA) &&
                        <button
                            onClick={() => removeFeedback(row.original.tienDoThucHienNhiemVuId)}
                            className="px-3 py-1 bg-red-700 text-white rounded"
                        >
                            <Icon icon='material-symbols:delete' fontSize={18} />
                        </button>
                    }
                </div>
            ),
        },
    ];

    const renderContent = () => {
        if (isLoadingTienDo) {
            return (
                <Box px={4}>
                    <ManagementItemSkeleton count={2} />
                </Box>
            );
        }

        if (!tienDoThucHienNhiemVuCuaToi.length) {
            return (
                <Box px={4} className="text-center">
                    Chưa có tiến độ nhiệm vụ!
                </Box>
            );
        }

        return <Box>
            {
                <CardTanStack data={tienDoThucHienNhiemVuCuaToi} columns={columns} />
            }
        </Box>
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết nhiệm vụ của tôi" />
                <Box>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box>
                                    <Box px={4}>
                                        <h3 className="title-page">{detailData.tieuDe}</h3>
                                    </Box>
                                    <Box p={4}>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="border-[1px] rounded-xl p-3">
                                                <div className="text-[16px] font-medium mb-2">Ngày giao</div>
                                                <div className="flex items-center gap-2">
                                                    <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-secondary-color" />
                                                    <div className="text-[14px] font-medium">{formatDate(detailData.ngayGiao)}</div>
                                                </div>
                                            </div>
                                            <div className="border-[1px] rounded-xl p-3">
                                                <div className="text-[16px] font-medium mb-2">Thời hạn</div>
                                                <div className="flex items-center gap-2">
                                                    <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-secondary-color" />
                                                    <div className="text-[14px] font-medium">{formatDate(detailData.thoiHanXuLy)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                    <hr />
                                    <Box px={4} pb={4} pt={2} className="text-[16px] font-medium">
                                        <div className="flex items-center justify-between w-full py-3">
                                            <div>Trạng thái</div>
                                            <div className={`${color} ${bg} text-[14px] font-semibold leading-[1] px-3 py-[6px] rounded-xl`}>
                                                {
                                                    detailData.tinhTrang.tenTinhTrang
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full py-3">
                                            <div>Giao cho</div>
                                            <div className="text-[14px]">
                                                {
                                                    detailData.nguoiThucHienNhiemVus?.find((item) => item.chuTri === true)?.hoTenNguoiThucHien
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-start justify-between w-full py-3">
                                            <div>Hỗ trợ</div>
                                            <div className="flex flex-col text-[14px] text-end">
                                                {
                                                    detailData.nguoiThucHienNhiemVus
                                                        ?.filter((item) => item.chuTri === false)
                                                        ?.map((item, index) => (<div key={index}>{item.hoTenNguoiThucHien}</div>))
                                                    || "Chưa có"
                                                }
                                            </div>
                                        </div>
                                    </Box>
                                    <div className="bg-[#f8f8f8] text-[#808080] text-[16px] font-semibold px-4 py-3">Nội dung nhiệm vụ</div>
                                    <Box p={4}>
                                        <div className="detail-content font-medium" dangerouslySetInnerHTML={{ __html: detailData.noiDung }}>
                                        </div>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <div className="px-4 pt-4 text-[18px] font-semibold mb-4">Tiến độ thực hiện nhiệm vụ</div>
                                        <Box>
                                            {renderContent()}
                                        </Box>
                                    </Box>
                                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                            <PrimaryButton fullWidth label={"Cập nhật tiến độ"} handleClick={() => setModalUpdateVisible(true)} />
                                        </Box>
                                    </div>
                                </Box>
                                :
                                <EmptyData title="Không có dữ liệu" />
                    }
                </Box>
            </Box>
            {
                detailData &&
                <TaskUpdateFormModal
                    visible={modalUpdateVisible}
                    onClose={() => setModalUpdateVisible(false)}
                    taskData={detailData}
                />
            }
            <ConfirmModal
                visible={isConfirmVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Page>
    )
}

export default MyTaskDetailPage