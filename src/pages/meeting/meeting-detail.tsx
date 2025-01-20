import { Icon } from "@iconify/react";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub"
import { FormDataMeeting } from "components/meeting/type";
import { ConfirmModal } from "components/modal";
import { MEETINGDATA } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { renderDayOfWeek } from "utils/date";
import { Avatar, Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const MeetingDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<FormDataMeeting>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    const meetingId = searchParams.get("id");

    useEffect(() => {
        const fetchResidentData = async () => {
            setLoading(true);
            try {

                const data = MEETINGDATA.find(resident => resident.id === Number(meetingId))

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

        fetchResidentData();
    }, [meetingId]);

    const handleCopy = async () => {
        try {
            const tempInput = document.createElement("textarea");
            tempInput.value = detailData?.linkOnl as string;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            openSnackbar({
                icon: true,
                text: "Sao chép thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        } catch (error) {
            console.error('Lỗi khi sao chép:', error);
            openSnackbar({
                icon: true,
                text: "Sao chép không thành công",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            });
        }
    };

    const openConfirmModal = (action: () => void, title: string, message: string) => {
        setConfirmAction(() => action)
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

    const acceptMeeeting = (id: number, accept: boolean) => {
        openConfirmModal(() => {
            console.log('Call API accept meeting with id:', id);

            // Hiển thị thông báo
            openSnackbar({
                text: accept ? 'Xác nhận tham gia thành công' : 'Từ chối tham gia thành công',
                type: 'success',
                duration: 5000,
            });
        }, accept ? 'Xác nhận tham gia' : 'Xác nhận từ chối', accept ? 'Bạn có chắc chắn muốn tham gia cuộc họp này?' : 'Bạn có chắc muốn từ chối cuộc họp này?');
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[76px]">
            <Box>
                <HeaderSub title="Chi tiết cuộc họp" />
                <Box>
                    {
                        detailData ?
                            <Box>
                                <Box pt={4} px={4}>
                                    <h3 className="text-[22px] font-semibold">{detailData.title}</h3>
                                    <div className="mt-6 mb-2 flex items-center gap-3">
                                        <Avatar size={30} src="https://tse1.mm.bing.net/th?id=OIP.LN-T_MAQBZx7pCwEWw5GwgHaHa&pid=Api" />
                                        <div className="text-[16px] font-medium text-[#808080]">được tảo bởi <span className="text-[#000]">{'Huỳnh Minh Hải'}</span></div>
                                    </div>
                                </Box>
                                <Box p={4} className="text-[16px] font-medium">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start gap-3">
                                            <Box>
                                                <Icon className="text-[#808080]" fontSize={26} icon='mdi:calendar-outline' />
                                            </Box>
                                            <Box>
                                                {`${renderDayOfWeek(detailData.meetingDate)}, ngày ${detailData.meetingDate}, vào lúc ${detailData.startTime} đến ${detailData.endTime}`}
                                            </Box>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Box>
                                                <Icon className="text-[#808080]" fontSize={26} icon='mdi:location' />
                                            </Box>
                                            <Box>
                                                {detailData.address}
                                            </Box>
                                        </div>
                                        {
                                            detailData.linkOnl &&
                                            <div className="flex items-center gap-3">
                                                <Box>
                                                    <Icon className="text-[#808080]" fontSize={26} icon='material-symbols:meeting-room-outline' />
                                                </Box>
                                                <Box flex className="gap-2">
                                                    {detailData.linkOnl}
                                                    <div className="flex items-center justify-center text-[10px] text-[#fff] leading-[1] rounded-lg w-fit" onClick={() => handleCopy()}>
                                                        <Icon fontSize={20} className="text-[#808080]" icon='solar:copy-bold' />
                                                    </div>
                                                </Box>
                                            </div>
                                        }

                                        <div className="flex flex-col gap-2 mt-2">
                                            <div className="flex items-center gap-1">
                                                {detailData.staff && detailData.staff.slice(0, 5).map((_, index) => (
                                                    <Avatar
                                                        key={index}
                                                        size={30}
                                                        src="https://tse3.mm.bing.net/th?id=OIP.N7KsedtGL40KQta33dvNoAHaHa&pid=Api&P=0&h=180"
                                                    />
                                                ))}
                                                {detailData.staff && detailData.staff.length > 5 && (
                                                    <div
                                                        className="ml-2"
                                                        onClick={() => console.log(123)}
                                                    >
                                                        +{detailData.staff.length - 5}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-[#808080]"><span className="text-[#000] font-semibold">{detailData.staff?.length}</span> thành viên ban điều hành tham gia</div>
                                                <div className="text-[#808080] mt-2"><span className="text-[#000] font-semibold">1080</span> người dân tham gia</div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                                <Box className="text-[16px]">
                                    <div className="bg-[#f8f8f8] text-[#808080] text-[18px] font-semibold p-4">Nội dung cuộc họp</div>
                                    <Box p={4} className="leading-[22px]">
                                        {detailData.description}
                                    </Box>
                                </Box>
                                <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                                    <div className="flex items-center justify-around p-4 w-full">
                                        <div
                                            className="flex items-center gap-2 text-green-700 bg-[#15803c1e] px-4 py-2 rounded-3xl"
                                            onClick={() => {
                                                detailData.id && acceptMeeeting(detailData.id, true)
                                            }}
                                        >
                                            <div>
                                                <Icon icon='mdi:tick-circle-outline' fontSize={28} />
                                            </div>
                                            <div className="text-[16px] font-semibold">Chấp nhận</div>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 text-red-700 bg-[#b91c1c15] px-4 py-2 rounded-3xl"
                                            onClick={() => {
                                                detailData.id && acceptMeeeting(detailData.id, false)
                                            }}
                                        >
                                            <div>
                                                <Icon icon='carbon:close-outline' fontSize={28} />
                                            </div>
                                            <div className="text-[16px] font-semibold">Từ chối</div>
                                        </div>
                                    </div>
                                </div>
                            </Box> :
                            <EmptyData />
                    }
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
    )
}

export default MeetingDetailPage