import { Icon } from "@iconify/react"
import { PrimaryButton } from "components/button"
import { EmptyData } from "components/data"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import TaskUpdateFormModal from "components/task/TaskModalUpdateForm"
import { taskPriority, taskStatus } from "constants/mock"
import { RESIDENT, ResidentType, TASKS, TaskType } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { openUrlInWebview } from "services/zalo"
import { getLabelOptions } from "utils/options"
import { Box, Page, Swiper, useNavigate, useSnackbar } from "zmp-ui"

const TaskDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<TaskType>()
    const [residentData, setResidentData] = useState<ResidentType>()
    const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false);

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const taskId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchTaskData = async () => {
            setLoading(true);
            try {

                const data = TASKS.find(resident => resident.id === Number(taskId))

                setDetailData(data)

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTaskData();
    }, [taskId]);

    useEffect(() => {
        if (detailData && detailData.assignedTo) {
            fetchResidentData()
        }
    }, [detailData?.assignedTo])

    const fetchResidentData = async () => {
        setLoading(true);
        try {
            const data = RESIDENT.find(resident => resident.id === Number(taskId))

            setResidentData(data)

        } catch (error) {
            console.error("Failed to fetch resident data:", error);
            openSnackbar({
                text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết nhiệm vụ" />
                <Box>
                    {
                        detailData ?
                            <Box>
                                <Box px={4}>
                                    <h3 className="text-[22px] leading-[28px] font-semibold">{detailData.title}</h3>
                                </Box>
                                <Box p={4}>
                                    <div className="border-[1px] rounded-xl p-3">
                                        <div className="text-[16px] font-medium mb-2">Thời hạn</div>
                                        <div className="flex items-center gap-2">
                                            <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-[#c46574]" />
                                            <div className="text-[16px] font-medium">{detailData?.dueDate}</div>
                                        </div>
                                    </div>
                                </Box>
                                <hr />
                                <Box px={4} pb={4} pt={2} className="text-[16px] font-medium">
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Trạng thái</div>
                                        <div className="text-[14px] text-white font-medium leading-[1] bg-gray-500 px-2 py-[6px] rounded-xl">
                                            {
                                                getLabelOptions(detailData.status, taskStatus)
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Giao cho</div>
                                        <div>
                                            {
                                                residentData?.fullname
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Độ ưu tiên</div>
                                        <div className="text-[14px] text-white font-medium leading-[1] bg-red-600 px-2 py-[6px] rounded-xl"
                                            style={{
                                                backgroundColor: detailData.priority === 1 ? '#16a34a' : detailData.priority === 2 ? '#eab308' : '#dc2626'
                                            }}
                                        >
                                            {
                                                getLabelOptions(detailData.priority, taskPriority)
                                            }
                                        </div>
                                    </div>
                                </Box>
                                <hr />
                                <Box p={4}>
                                    <div className="text-[16px] font-medium mb-1">Nội dung nhiệm vụ</div>
                                    <div className="text-[16px] leading-[22px]">
                                        {detailData.description}
                                    </div>
                                </Box>
                                <hr />
                                <Box p={4}>
                                    <div className="text-[16px] font-medium mb-3">Hình ảnh đính kèm</div>
                                    <div className="text-[16px] leading-[22px]">
                                        {
                                            detailData.imageUrl && detailData.imageUrl?.length > 0 ?
                                                <Swiper autoplay duration={8000} style={{ borderRadius: 0 }}>
                                                    {
                                                        detailData.imageUrl.map((item, index) => (
                                                            <Swiper.Slide key={index}>
                                                                <img
                                                                    onClick={() => openUrlInWebview(item)}
                                                                    className="slide-img"
                                                                    src={item}
                                                                    alt={detailData.title}
                                                                />
                                                            </Swiper.Slide>
                                                        ))
                                                    }
                                                </Swiper> :
                                                <div>
                                                    Không có
                                                </div>
                                        }
                                    </div>
                                </Box>
                                <Divider />
                                <Divider />
                                <Box p={4}>
                                    <div className="text-[16px] font-medium mb-1">Ghi chú người thực hiện</div>
                                    <div>
                                        {

                                            detailData.note ?
                                                <div className="detail-content" dangerouslySetInnerHTML={{
                                                    __html: `
                                            ${detailData.note}
                                            `}}>
                                                </div> : 'Chưa có'
                                        }
                                    </div>
                                </Box>
                                <hr />
                                <Box px={4} pt={4} pb={8}>
                                    <div className="text-[16px] font-medium mb-1">Hình ảnh đính kèm</div>
                                    <div>
                                        {
                                            detailData.imageReport && detailData.imageReport?.length > 0 ?
                                                <Swiper autoplay duration={8000} style={{ borderRadius: 0 }}>
                                                    {
                                                        detailData.imageReport.map((item, index) => (
                                                            <Swiper.Slide key={index}>
                                                                <img
                                                                    onClick={() => openUrlInWebview(item)}
                                                                    className="slide-img"
                                                                    src={item}
                                                                    alt={detailData.title}
                                                                />
                                                            </Swiper.Slide>
                                                        ))
                                                    }
                                                </Swiper> :
                                                <div>
                                                    Không có
                                                </div>
                                        }
                                    </div>
                                </Box>
                                <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                                    <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                        <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật tiến độ"} handleClick={() => setModalUpdateVisible(true)} />
                                    </Box>
                                </div>
                            </Box>
                            :
                            <EmptyData />
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
        </Page>
    )
}

export default TaskDetailPage