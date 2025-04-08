import { Icon } from "@iconify/react";
import { useGetMeetingDetail } from "apiRequest/meeting";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { copyToClipboard } from "utils/copyToClipboard";
import { formatDate, getHourFromDate, renderDayOfWeek } from "utils/date";
import { Avatar, Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const MeetingDetailPage: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const [ totalMember, setTotalMember ] = useState(0);

    const newsId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetMeetingDetail(Number(newsId));

    useEffect(() => {
        if (detailData) {
            setTotalMember(detailData.thanhVienCuocHops?.filter(thanhVien => thanhVien.loaiNguoiThamDuId === 3)?.length);
        }
    }, [detailData]);

    const handleCopy = async (linkOnl: string) => {
        copyToClipboard(
            linkOnl,
            () => openSnackbar({
                icon: true,
                text: "Sao chép thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            }),
            () => openSnackbar({
                icon: true,
                text: "Sao chép không thành công",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            })
        );
    };

    // const openConfirmModal = (action: () => void, title: string, message: string) => {
    //     setConfirmAction(() => action)
    //     setModalContent({ title, message });
    //     setConfirmVisible(true);
    // };

    // const handleConfirm = () => {
    //     if (confirmAction) {
    //         confirmAction();
    //         setConfirmVisible(false);
    //         setConfirmAction(null);
    //     }
    // };

    // const handleCancel = () => {
    //     setConfirmVisible(false);
    //     setConfirmAction(null);
    // };

    // const acceptMeeeting = (id: number, accept: boolean) => {
    //     openConfirmModal(() => {
    //         console.log('Call API accept meeting with id:', id);

    //         // Hiển thị thông báo
    //         openSnackbar({
    //             text: accept ? 'Xác nhận tham gia thành công' : 'Từ chối tham gia thành công',
    //             type: 'success',
    //             duration: 5000,
    //         });
    //     }, accept ? 'Xác nhận tham gia' : 'Xác nhận từ chối', accept ? 'Bạn có chắc chắn muốn tham gia cuộc họp này?' : 'Bạn có chắc muốn từ chối cuộc họp này?');
    // };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[76px]">
            <Box>
                <HeaderSub title="Chi tiết cuộc họp" />
                <Box>
                    {
                        isLoading ?
                        <NewsDetailSkeleton count={1} /> :
                        detailData ?
                            <Box>
                                <Box px={4}>
                                    <h3 className="text-[22px] leading-[28px] font-semibold">{detailData.tieuDe}</h3>
                                    <div className="mt-6 mb-2 flex items-center gap-3">
                                        <Avatar size={30} src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" />
                                        <div className="text-[16px] font-medium text-[#808080]">chủ trì cuộc họp <span className="text-[#000]">{detailData.thanhVienCuocHops.find(thanhVien => thanhVien.loaiNguoiThamDuId === 1)?.hoTenNguoiThamDu}</span></div>
                                    </div>
                                </Box>
                                <Box p={4} className="text-[16px] font-medium">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Box>
                                                <Icon className="text-[#808080]" fontSize={26} icon='dashicons:welcome-write-blog' />
                                            </Box>
                                            <Box>
                                            thư ký cuộc họp: <span className="text-[#000]">{detailData.thanhVienCuocHops.find(thanhVien => thanhVien.loaiNguoiThamDuId === 2)?.hoTenNguoiThamDu}</span>
                                            </Box>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Box>
                                                <Icon className="text-[#808080]" fontSize={26} icon='mdi:calendar-outline' />
                                            </Box>
                                            <Box>
                                                {`${renderDayOfWeek(formatDate(detailData.thoiGianBatDau))}, ngày ${formatDate(detailData.thoiGianBatDau)}, vào lúc ${getHourFromDate(detailData.thoiGianBatDau)} đến ${getHourFromDate(detailData.thoiGianKetThuc)}` }
                                            </Box>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Box>
                                                <Icon className="text-[#808080] -mt-1" fontSize={26} icon='mdi:location' />
                                            </Box>
                                            <Box>
                                                {detailData.diaDiem}
                                            </Box>
                                        </div>
                                        {
                                            detailData.linkHopOnLine &&
                                            <div className="flex items-center gap-3">
                                                <Box>
                                                    <Icon className="text-[#808080]" fontSize={26} icon='material-symbols:meeting-room-outline' />
                                                </Box>
                                                <Box flex className="gap-2">
                                                    {detailData.linkHopOnLine}
                                                    <div className="flex items-center justify-center text-[10px] text-[#fff] leading-[1] rounded-lg w-fit" onClick={() => handleCopy(detailData.linkOnl as string)}>
                                                        <Icon fontSize={20} className="text-[#808080]" icon='solar:copy-bold' />
                                                    </div>
                                                </Box>
                                            </div>
                                        }

                                        <div className="flex flex-col gap-2 mt-2">
                                            <div className="flex items-center gap-1">
                                                {detailData.thanhVienCuocHops && detailData.thanhVienCuocHops?.filter(thanhVien => thanhVien.loaiNguoiThamDuId === 3).slice(0, 5).map((_, index) => (
                                                    <Avatar
                                                        key={index}
                                                        size={30}
                                                        src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                                                    />
                                                ))}
                                                {totalMember > 5 && (
                                                    <div
                                                        className="ml-2"
                                                        onClick={() => console.log(123)}
                                                    >
                                                        +{totalMember - 5}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-[#808080]"><span className="text-[#000] font-semibold">{totalMember}</span> thành viên tham gia</div>
                                                {/* <div className="text-[#808080] mt-2"><span className="text-[#000] font-semibold">1080</span> người dân tham gia</div> */}
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                                <Box className="text-[16px]">
                                    <div className="bg-[#f8f8f8] text-[#808080] text-[18px] font-semibold p-4">Nội dung cuộc họp</div>
                                    <Box p={4} className="leading-[22px]">
                                        {detailData.noiDung}
                                    </Box>
                                </Box>
                                {/* <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
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
                                </div> */}
                            </Box> :
                            <EmptyData title="Không tìm thấy cuộc họp" />
                    }
                </Box>
            </Box>
            {/* <ConfirmModal
                visible={isConfirmVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            /> */}
        </Page>
    )
}

export default MeetingDetailPage