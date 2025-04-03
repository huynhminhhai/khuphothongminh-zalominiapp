import { Icon } from "@iconify/react"
import { useGetTaskDetail } from "apiRequest/task"
import { PrimaryButton } from "components/button"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton"
import TaskUpdateFormModal from "components/task/TaskModalUpdateForm"
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { formatDate } from "utils/date"
import { Box, Page, useNavigate } from "zmp-ui"

const TaskDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [modalUpdateVisible, setModalUpdateVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const taskId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetTaskDetail(Number(taskId));
    
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
                                                    <div className="text-[16px] font-medium">{formatDate(detailData.ngayGiao)}</div>
                                                </div>
                                            </div>
                                            <div className="border-[1px] rounded-xl p-3">
                                                <div className="text-[16px] font-medium mb-2">Thời hạn</div>
                                                <div className="flex items-center gap-2">
                                                    <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-[#c46574]" />
                                                    <div className="text-[16px] font-medium">{formatDate(detailData.thoiHanXuLy)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                    <hr />
                                    <Box px={4} pb={4} pt={2} className="text-[16px] font-medium">
                                        <div className="flex items-center justify-between w-full py-3">
                                            <div>Trạng thái</div>
                                            <div className="text-[14px] text-white font-medium leading-[1] bg-gray-500 px-2 py-[6px] rounded-xl">
                                                {
                                                    detailData.tinhTrang.tenTinhTrang
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full py-3">
                                            <div>Giao cho</div>
                                            <div>
                                                {
                                                    detailData.nguoiThucHienNhiemVus?.find((item) => item.chuTri === true)?.hoTenNguoiThucHien
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-start justify-between w-full py-3">
                                            <div>Hỗ trợ</div>
                                            <div className="flex flex-col">
                                                {
                                                    detailData.nguoiThucHienNhiemVus
                                                        ?.filter((item) => item.chuTri === false)
                                                        ?.map((item) => ( <div>{item.hoTenNguoiThucHien}</div> ))
                                                        || "Chưa có"
                                                }
                                            </div>
                                        </div>
                                        {/* <div className="flex items-center justify-between w-full py-3">
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
                                    </div> */}
                                    </Box>
                                    <hr />
                                    <Box p={4}>
                                        <div className="text-[16px] font-medium mb-1">Nội dung nhiệm vụ</div>
                                        <div className="text-[16px] leading-[22px]">
                                            {detailData.noiDung}
                                        </div>
                                    </Box>
                                    <hr />
                                    {/* <Box p={4}>
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
                                    </Box> */}
                                    {/* <Divider />
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
                                    </Box> */}
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