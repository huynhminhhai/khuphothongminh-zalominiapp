import { Icon } from "@iconify/react"
import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { useAddFileTask, useDeleteFileTask, useGetTaskDetail, useGetTienDoThucHienNhiemVu } from "apiRequest/task"
import { EmptyData } from "components/data"
import { Divider } from "components/divider"
import { FilePreviewCard, PdfViewer } from "components/file"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { ManagementItemSkeleton, NewsDetailSkeleton } from "components/skeleton"
import { CardTanStack } from "components/table"
import TaskUpdateFormModal from "components/task/TaskModalUpdateForm"
import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { openUrlInWebview } from "services/zalo"
import { useStoreApp } from "store/store"
import { formatDate } from "utils/date"
import { convertToFormData, getFullImageUrl, isImage, isPDF } from "utils/file"
import { handleClickAnchorToWebview } from "utils/handleClickAnchorToWebview"
import { getTinhTrangTaskColor } from "utils/renderColor"
import { Box, Page } from "zmp-ui"

const TaskDetailPage: React.FC = () => {

    const { setIsLoadingFullScreen } = useStoreApp();

    const queryClient = useQueryClient();

    const contentRef = useRef<HTMLDivElement>(null);

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

    const { data: detailData, isLoading, refetch } = useGetTaskDetail(Number(taskId));
    const { data: tienDoThucHienNhiemVu, isLoading: isLoadingTienDo } = useGetTienDoThucHienNhiemVu(param);
    const { mutateAsync: addFileTask, isPending } = useAddFileTask();
    const { mutateAsync: deleteFileTask } = useDeleteFileTask();

    const { color, bg } = getTinhTrangTaskColor(detailData?.tinhTrang?.tenTinhTrang);
    const [nhiemVuFiles, setNhiemVuFiles] = useState(detailData?.tapTinNhiemVus || []);

    useEffect(() => {
        setNhiemVuFiles(detailData?.tapTinNhiemVus || []);
    }, [detailData]);

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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setIsLoadingFullScreen(true);

        const files = event.target.files;
        if (!files || files.length === 0) return;

        const fileTasks: File[] = [];

        Array.from(files).forEach((file: File) => {
            fileTasks.push(file);
        });

        try {
            const dataSubmit = convertToFormData({ TapTinFormFiles: fileTasks, NhiemVuId: taskId })

            await addFileTask(dataSubmit);

            await refetch();

        } catch (error) {
            console.error("Lỗi khi thêm file:", error);
        } finally {
            setIsLoadingFullScreen(false);
        }
    };

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
                                <div key={index}>
                                    {
                                        isPDF((item?.tapTin)) ?
                                            <PdfViewer fileUrl={getFullImageUrl(item?.tapTin)} fileName={item?.tenTapTin} /> :
                                            <FilePreviewCard
                                                fileName={item?.tenTapTin}
                                                fileUrl={getFullImageUrl(item?.tapTin)}
                                            />
                                    }
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
    ];

    const renderContent = () => {
        if (isLoadingTienDo) {
            return (
                <Box px={4}>
                    <ManagementItemSkeleton count={2} />
                </Box>
            );
        }

        if (!tienDoThucHienNhiemVu.length) {
            return (
                <Box px={4} className="text-center">
                    Chưa có tiến độ nhiệm vụ!
                </Box>
            );
        }

        return <Box>
            {
                <CardTanStack data={tienDoThucHienNhiemVu} columns={columns} />
            }
        </Box>
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết nhiệm vụ" />
                <Box pt={4}>
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
                                        <div
                                            ref={contentRef}
                                            onClick={(e) => handleClickAnchorToWebview(e as any, contentRef.current)}
                                            className="detail-content font-medium" dangerouslySetInnerHTML={{ __html: detailData.noiDung }}>
                                        </div>
                                    </Box>

                                    <Divider />
                                    <Box px={4} pt={4} pb={4}>
                                        <div className="text-[16px] font-medium mb-4 flex items-center justify-between">
                                            Tập tin đính kèm
                                            <Box p={2} className="bg-secondary-color rounded-full" onClick={() => document.getElementById("hiddenFileInput")?.click()}>
                                                <Icon color="#ffffff" icon='hugeicons:file-add' />
                                                <input disabled={isPending} multiple type="file" id="hiddenFileInput" style={{ display: "none" }} onChange={handleFileChange} />
                                            </Box>
                                        </div>
                                        <Box className="text-secondary-color">
                                            {
                                                nhiemVuFiles?.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-2 justify-between">
                                                        <div className="flex-1 w-full">
                                                            {
                                                                isPDF((item?.tapTin)) ?
                                                                    <PdfViewer fileUrl={getFullImageUrl(item?.tapTin)} fileName={item?.tenTapTin} /> :
                                                                    <FilePreviewCard
                                                                        fileName={item?.tenTapTin}
                                                                        fileUrl={getFullImageUrl(item?.tapTin)}
                                                                    />
                                                            }
                                                        </div>

                                                        <Box
                                                            mb={2}
                                                            onClick={() => {
                                                                openConfirmModal(async () => {
                                                                    await deleteFileTask(item.tapTinNhiemVuId);
                                                                    const updatedFiles = nhiemVuFiles.filter(file => file.tapTinNhiemVuId !== item.tapTinNhiemVuId);
                                                                    setNhiemVuFiles(updatedFiles);
                                                                }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa tập tin này?');
                                                            }}>
                                                            <Icon icon='mingcute:close-square-fill' fontSize={26} className="text-[#c46574]" />
                                                        </Box>
                                                    </div>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <div className="px-4 pt-4 text-[18px] font-semibold mb-4">Tiến độ thực hiện nhiệm vụ</div>
                                        <Box>
                                            {renderContent()}
                                        </Box>
                                    </Box>
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

export default TaskDetailPage