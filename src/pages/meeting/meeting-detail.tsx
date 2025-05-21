import { Icon } from "@iconify/react";
import { useGetMeetingDetail } from "apiRequest/meeting";
import images from "assets/images";
import SecondaryButton from "components/button/SecondaryButton";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import http from "services/http";
import { openUrlInWebview } from "services/zalo";
import { copyToClipboard } from "utils/copyToClipboard";
import { formatDate, getHourFromDate, renderDayOfWeek } from "utils/date";
import { getFullImageUrl, isImage } from "utils/file";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { Avatar, Box, Modal, Page } from "zmp-ui"

const MeetingDetailPage: React.FC = () => {

    const { showSuccess, showError } = useCustomSnackbar();
    const [searchParams] = useSearchParams();
    const [memberList, setMemberList] = useState<any>([])
    const [host, setHost] = useState<any>(null)
    const [thuKy, setThuKy] = useState<any>(null)
    const [detailData, setDetailData] = useState<any>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const newsId = searchParams.get("id");

    const { data: fetchedDetailData, isLoading } = useGetMeetingDetail(Number(newsId));

    const fetchUserInfos = async () => {
        setLoading(true);
        try {
            const memberIds = fetchedDetailData.thanhVienCuocHops.map((member) => member.nguoiThamDuId);

            const userInfos = await Promise.all(
                memberIds.map((id: number) => http.get(`/nguoidung/id?id=${id}`))
            );

            const updatedMembers = fetchedDetailData.thanhVienCuocHops.map((member, index) => ({
                ...member,
                anhDaiDien: userInfos[index]?.data?.anhDaiDien || '', // Thêm anhDaiDien, mặc định '' nếu không có
            }));

            setDetailData((prev) => ({
                ...prev,
                thanhVienCuocHops: updatedMembers,
            }));
        } catch (error) {
            console.error('Lỗi khi lấy thông tin thành viên:', error);
            showError('Có lỗi khi lấy thông tin thành viên')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (fetchedDetailData) {
            setDetailData(fetchedDetailData);

            if (fetchedDetailData.thanhVienCuocHops) {
                fetchUserInfos()
            }
        }


    }, [fetchedDetailData]);

    useEffect(() => {
        if (detailData) {

            const member = detailData.thanhVienCuocHops?.filter(thanhVien => thanhVien.loaiNguoiThamDuId === 3)
            const host = detailData.thanhVienCuocHops.find(thanhVien => thanhVien.loaiNguoiThamDuId === 1)
            const thuKy = detailData.thanhVienCuocHops.find(thanhVien => thanhVien.loaiNguoiThamDuId === 2)

            setMemberList(member)
            setHost(host)
            setThuKy(thuKy)
        }
    }, [detailData]);

    const handleCopy = async (linkOnl: string) => {
        copyToClipboard(
            linkOnl,
            () => showSuccess('Sao chép thành công'),
            () => showError('Sao chép thất bại')
        );
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[76px]">
            <Box>
                <HeaderSub title="Chi tiết cuộc họp" />
                <Box>
                    {
                        (isLoading || loading) ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box>
                                    <Box px={4}>
                                        <h3 className="title-page">{detailData.tieuDe}</h3>
                                        <div className="mt-4 flex items-center gap-3">
                                            <Avatar size={30} src={host?.anhDaiDien?.trim() ? getFullImageUrl(host.anhDaiDien) : images.avatar} />
                                            <div className="text-[16px] font-medium text-[#808080]">chủ trì: <span className="text-[#000]">{host?.hoTenNguoiThamDu}</span></div>
                                        </div>
                                    </Box>
                                    <Box p={4} className="text-[16px] font-medium">
                                        <div className="flex flex-col gap-4">
                                            {
                                                thuKy &&

                                                <div className="flex items-center gap-3 text-gray-color">
                                                    <Avatar size={30} src={thuKy?.anhDaiDien?.trim() ? getFullImageUrl(thuKy.anhDaiDien) : images.avatar} />
                                                    <Box>
                                                        thư ký: <span className="text-[#000]">{thuKy?.hoTenNguoiThamDu}</span>
                                                    </Box>
                                                </div>
                                            }
                                            <div className="flex items-start gap-3">
                                                <Box>
                                                    <Icon className="text-[#808080]" fontSize={26} icon='mdi:calendar-outline' />
                                                </Box>
                                                <Box>
                                                    {`${renderDayOfWeek(formatDate(detailData.thoiGianBatDau))}, ngày ${formatDate(detailData.thoiGianBatDau)}, vào lúc ${getHourFromDate(detailData.thoiGianBatDau)} đến ${getHourFromDate(detailData.thoiGianKetThuc)}`}
                                                </Box>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Box>
                                                    <Icon className="text-[#808080] -mt-1" fontSize={26} icon='akar-icons:location' />
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
                                                        <div className="flex items-center justify-center text-[10px] text-[#fff] leading-[1] rounded-lg w-fit" onClick={() => handleCopy(detailData.linkHopOnLine as string)}>
                                                            <Icon fontSize={20} className="text-[#808080]" icon='solar:copy-bold' />
                                                        </div>
                                                    </Box>
                                                </div>
                                            }

                                            <div className="flex flex-col gap-2 mt-2" onClick={() => setPopupVisible(true)}>
                                                <div className="flex items-center gap-1">
                                                    <Box>
                                                        {memberList?.slice(0, 5)?.map((member, index) => (
                                                            <Avatar
                                                                key={index}
                                                                size={30}
                                                                src={member?.anhDaiDien?.trim() ? getFullImageUrl(member.anhDaiDien) : images.avatar}
                                                            />
                                                        ))}
                                                    </Box>
                                                    {memberList.length > 5 && (
                                                        <div
                                                            className="ml-2"
                                                        >
                                                            +{memberList.length - 5}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-[#808080]"><span className="text-[#000] font-semibold">{memberList.length}</span> thành viên tham gia</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                    <Box px={4} pb={4}>
                                        <Box>
                                            {detailData?.tapTinCuocHops && detailData.tapTinCuocHops.length > 0 && (
                                                detailData.tapTinCuocHops.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-2 justify-between mb-2 text-secondary-color">
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
                                            )}
                                        </Box>
                                    </Box>
                                    <Box className="text-[16px]">
                                        <div className="bg-[#f8f8f8] text-[#808080] text-[16px] font-semibold px-4 py-3">Nội dung cuộc họp</div>
                                        <div className="p-4 font-medium detail-content" dangerouslySetInnerHTML={{ __html: detailData.noiDung }}>
                                        </div>
                                    </Box>

                                </Box> :
                                <EmptyData title="Không tìm thấy cuộc họp" />
                    }
                </Box>
            </Box>
            <Modal
                visible={popupVisible}
                title="Thành viên tham gia"
                verticalActions
            >
                <div className="max-h-[400px] overflow-y-auto relative mt-6 mb-3">
                    {
                        memberList.map((member, index) => (
                            <Box mb={3} flex alignItems="center" className="gap-2" key={index}>
                                <Avatar
                                    key={index}
                                    size={30}
                                    src={member?.anhDaiDien?.trim() ? getFullImageUrl(member.anhDaiDien) : images.avatar}
                                />
                                <div className="font-medium text-gray-color">{member?.hoTenNguoiThamDu}</div>
                            </Box>
                        ))
                    }
                </div>
                <Box flex justifyContent="flex-end">
                    <SecondaryButton size="medium" handleClick={() => setPopupVisible(false)} label="Đóng"></SecondaryButton>
                </Box>
            </Modal>
        </Page>
    )
}

export default MeetingDetailPage