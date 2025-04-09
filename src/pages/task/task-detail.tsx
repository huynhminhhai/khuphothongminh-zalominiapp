import { Icon } from "@iconify/react"
import { useAddFileTask, useDeleteFileTask, useGetTaskDetail } from "apiRequest/task"
import { PrimaryButton } from "components/button"
import { EmptyData } from "components/data"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal"
import { NewsDetailSkeleton } from "components/skeleton"
import TaskUpdateFormModal from "components/task/TaskModalUpdateForm"
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { openUrlInWebview } from "services/zalo"
import { formatDate } from "utils/date"
import { convertToFormData, getFullImageUrl } from "utils/file"
import { getTinhTrangTaskColor } from "utils/renderColor"
import { Box, Page, Swiper, useNavigate } from "zmp-ui"

const TaskDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const taskId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetTaskDetail(Number(taskId));
    const { mutateAsync: addFileTask, isPending } = useAddFileTask();
    const { mutate: deleteFileTask } = useDeleteFileTask();

    const { color, bg } = getTinhTrangTaskColor(detailData?.tinhTrang?.tenTinhTrang);

    const isImage = (fileName: string) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const fileTasks: File[] = [];

        Array.from(files).forEach((file: File) => {
            fileTasks.push(file);
        });

        try {
            const dataSubmit = convertToFormData({ TapTinFormFiles: fileTasks, NhiemVuId: taskId })

            console.log(dataSubmit)

            await addFileTask(dataSubmit);

        } catch (error) {
            console.error("Lỗi khi thêm file:", error);
        }
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết nhiệm vụ" />
                <Box>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box>
                                    <Box px={4}>
                                        <h3 className="text-[22px] leading-[28px] font-semibold">{detailData.tieuDe}</h3>
                                    </Box>
                                    <Box p={4}>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="border-[1px] rounded-xl p-3">
                                                <div className="text-[16px] font-medium mb-2">Ngày giao</div>
                                                <div className="flex items-center gap-2">
                                                    <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-[#c46574]" />
                                                    <div className="text-[14px] font-medium">{formatDate(detailData.ngayGiao)}</div>
                                                </div>
                                            </div>
                                            <div className="border-[1px] rounded-xl p-3">
                                                <div className="text-[16px] font-medium mb-2">Thời hạn</div>
                                                <div className="flex items-center gap-2">
                                                    <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-[#c46574]" />
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
                                            <div className="flex flex-col text-[14px]">
                                                {
                                                    detailData.nguoiThucHienNhiemVus
                                                        ?.filter((item) => item.chuTri === false)
                                                        ?.map((item, index) => (<div key={index}>{item.hoTenNguoiThucHien}</div>))
                                                    || "Chưa có"
                                                }
                                            </div>
                                        </div>
                                    </Box>
                                    <hr />
                                    <Box p={4}>
                                        <div className="text-[18px] font-medium mb-2">Nội dung nhiệm vụ</div>
                                        <div className="text-[16px] leading-[22px] font-medium text-gray-color">
                                            {detailData.noiDung}
                                        </div>
                                    </Box>

                                    <Divider />
                                    <Box px={4} pt={4} pb={8}>
                                        <div className="text-[18px] font-medium mb-4 flex items-center justify-between">
                                            Tập tin đính kèm
                                            <Box p={2} className="bg-blue-500 rounded-full" onClick={() => document.getElementById("hiddenFileInput")?.click()}>
                                                <Icon color="#ffffff" icon='hugeicons:file-add' />
                                                <input disabled={isPending} multiple type="file" id="hiddenFileInput" style={{ display: "none" }} onChange={handleFileChange} />
                                            </Box>
                                        </div>
                                        <Box>
                                            {detailData?.tapTinNhiemVus && detailData.tapTinNhiemVus.length > 0 ? (
                                                detailData.tapTinNhiemVus.map((item, index) => (
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
                                                                <div className="text-[14px] font-medium">{`Tập tin ${index + 1}`}</div>
                                                            </div>
                                                        </div>

                                                        <Box onClick={() => {
                                                            openConfirmModal(() => {
                                                                deleteFileTask(item.tapTinNhiemVuId);
                                                            }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa tập tin này?');
                                                        }}>
                                                            <Icon icon='mingcute:close-square-fill' fontSize={26} className="text-[#c46574]" />
                                                        </Box>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Không có tập tin</div>
                                            )}
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

export default TaskDetailPage