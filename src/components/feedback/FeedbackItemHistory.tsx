import { Icon } from "@iconify/react"
import { useDeleteFeedback, useGetFeedbackStatus } from "apiRequest/feeback"
import React, { useMemo, useState } from "react"
import { getFullImageUrl, isImage } from "utils/file"
import { getTinhTrangFeedbackColor } from "utils/renderColor"
import { Box, Button, useNavigate } from "zmp-ui"
import { formatDate, getHourFromDate } from "utils/date"
import images from "assets/images"
import { ConfirmModal } from "components/modal"

type FeedbackItemHistoryProps = {
    data: any
}

const FeedbackItemHistory: React.FC<FeedbackItemHistoryProps> = ({ data }) => {

    const navigate = useNavigate();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const { data: feedbackStatus } = useGetFeedbackStatus();
    const { mutate: deleteFeedback } = useDeleteFeedback();

    const status = feedbackStatus?.tinhTrangs?.find((item: any) => item.tinhTrangId === data.tinhTrangId);
    const { color, bg } = getTinhTrangFeedbackColor(status?.tenTinhTrang);

    const feedbackStatusOptions = useMemo(() => {
        return feedbackStatus?.tinhTrangs?.map((item) => ({
            value: item.tinhTrangId,
            label: item.tenTinhTrang,
        })) ?? [];
    }, [feedbackStatus]);

    const imageFiles = data?.tapTinPhanAnhs?.filter(item =>
        isImage(item.tapTin)
    ) || [];

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
            deleteFeedback(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa ý kiến này?');
    }

    return (
        <Box
            pb={4} mb={4} className="border-b-[1px] relative"
        >
            <Box className="relative" onClick={() => navigate(`/feedback-detail?id=${data.phanAnhId}`)}>
                {/* {status && (
                    <div
                        className={`${color} ${bg} feedback-tag py-[6px] px-3 rounded-xl absolute bottom-[0px] right-[2px] font-bold text-[12px] leading-[1]`}
                    >
                        {status.tenTinhTrang}
                    </div>
                )} */}
                <Box className="relative rounded-lg overflow-hidden">
                    <img className="w-[100%] h-[200px] object-cover" src={imageFiles[0]?.tapTin ? getFullImageUrl(imageFiles[0].tapTin) : images.feedback} alt={data.noiDung} />
                </Box>
                <Box mt={2}>
                    <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2 mb-2">{data.noiDung}</h3>
                    {/* <div className="text-gray-color font-medium flex items-center gap-1">
                        <Icon fontSize={20} icon='qlementine-icons:location-16' />
                        <div className="flex-1">
                            <div className="line-clamp-1">
                                {[data?.diaChi, data?.tenAp, data?.tenXa, data?.tenHuyen, data?.tenTinh].filter(Boolean).join(', ')}
                            </div>
                        </div>
                    </div> */}
                </Box>
                <Box mt={3}>
                    <div className="text-gray-color font-medium flex items-center gap-1">
                        <Icon fontSize={20} icon='material-symbols-light:date-range-outline' />
                        <div className="flex-1">
                            <div className="line-clamp-1">
                                {formatDate(data?.ngayTao)} - {getHourFromDate(data?.ngayTao)}
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
            {
                data?.tinhTrangId === feedbackStatusOptions[3]?.value &&
                <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button variant="secondary" size="small" fullWidth onClick={() => navigate(`/feedback-update?id=${data.phanAnhId}`)}>
                        <div className="flex items-center justify-center gap-1 font-semibold">
                            Cập nhật
                        </div>
                    </Button>
                    <Button className="!bg-red-100 !text-red-700" size="small" fullWidth onClick={() => removeFeedback(data.phanAnhId)}>
                        <div className="flex items-center justify-center gap-1 font-semibold">
                            Xóa
                        </div>
                    </Button>
                </div>
            }
            <ConfirmModal
                visible={isConfirmVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default FeedbackItemHistory