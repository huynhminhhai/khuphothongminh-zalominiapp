import { Icon } from "@iconify/react";
import { PrimaryButton } from "components/button";
import SecondaryButton from "components/button/SecondaryButton";
import { HeaderSub } from "components/header-sub"
import { ConfirmModal } from "components/modal";
import { ethnicOptions, religionOptions } from "constants/mock";
// import { genderLabel, RESIDENT, RESIDENTCRAFT } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { getLabelOptions } from "utils/options";
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

export const InforItemMain = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex items-center justify-between gap-6 py-4 resident-item">
            <div className="text-[14px] text-[#767a7f] font-normal whitespace-nowrap">{label}</div>
            <div className="text-[14px] font-normal text-end">{value}</div>
        </div>
    )
}

const ResidentCraftPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<any>()
    const [detailOldData, setDetailOldData] = useState<any>()
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const userId = searchParams.get("id");

    const fetchResidentData = async () => {
        setLoading(true);
        try {

            const data = RESIDENTCRAFT.find(resident => resident.id === Number(userId))

            if (data) {
                setDetailData(data)
            }


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

    const fetchResidentOldData = async () => {
        setLoading(true);
        try {

            const data = RESIDENT.find(resident => resident.id === Number(userId))

            if (data) {
                setDetailOldData(data)
            }


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

    useEffect(() => {
        fetchResidentData();
        fetchResidentOldData();
    }, [userId]);

    const openConfirmModal = (action: () => void, title: string, message: string) => {
        setConfirmAction(() => action);  // Lưu hành động xác nhận
        setModalContent({ title, message });
        setConfirmVisible(true);  // Mở modal
    };

    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction(); // Gọi hành động đã lưu
            setConfirmVisible(false);
            setConfirmAction(null);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
        setConfirmAction(null);
    };

    const handleAccept = () => {
        openConfirmModal(() => {
            console.log('Call API aceppt');

            // Hiển thị thông báo
            openSnackbar({
                text: 'Chấp nhận xét duyệt thành công',
                type: 'success',
                duration: 5000,
            });
        }, 'Xác nhận xét duyệt', 'Bạn có chắc chắn muốn xét duyệt thông tin này không?');
    };

    const handleNotAccept = () => {
        openConfirmModal(() => {
            console.log('Call API not aceppt');

            // Hiển thị thông báo
            openSnackbar({
                text: 'Không xét duyệt thành công',
                type: 'success',
                duration: 5000,
            });
        }, 'Xác nhận không xét duyệt', 'Bạn có chắc chắn không muốn xét duyệt thông tin này không?');
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thông tin xét duyệt" />
                <Box p={4}>
                    {
                        detailOldData && <Box>
                            <Box pt={4} pb={2}>
                                <h3 className="text-[18px] font-semibold">Thông tin cũ</h3>
                            </Box>
                            <Box>
                                <InforItemMain label="Số định danh cá nhân" value={detailOldData.fullname} />
                                <InforItemMain label="Số định danh cá nhân" value={detailOldData.numberCard} />
                                <InforItemMain label="Giới tính" value={genderLabel[detailOldData.gender]} />
                                <InforItemMain label="Ngày sinh" value={detailOldData.birthDate} />
                                <InforItemMain label="Dân tộc" value={getLabelOptions(detailData.nation, ethnicOptions) as string} />
                                <InforItemMain label="Tôn giáo" value={getLabelOptions(detailData.religion, religionOptions) as string} />
                                <InforItemMain label="Quốc tịch" value={detailOldData.nationality} />
                                <InforItemMain label="Quê quán" value={detailOldData.address} />
                                <InforItemMain label="Bảo hiểm y tế" value={detailOldData.bhyt} />
                            </Box>
                        </Box>
                    }
                    {
                        detailData &&
                        <Box>
                            <Box pt={4} pb={2}>
                                <h3 className="text-[18px] font-semibold">Thông tin mới</h3>
                            </Box>
                            <Box>
                                <InforItemMain label="Số định danh cá nhân" value={detailData.fullname} />
                                <InforItemMain label="Số định danh cá nhân" value={detailData.numberCard} />
                                <InforItemMain label="Giới tính" value={genderLabel[detailData.gender]} />
                                <InforItemMain label="Ngày sinh" value={detailData.birthDate} />
                                <InforItemMain label="Dân tộc" value={getLabelOptions(detailData.nation, ethnicOptions) as string} />
                                <InforItemMain label="Tôn giáo" value={getLabelOptions(detailData.religion, religionOptions) as string} />
                                <InforItemMain label="Quốc tịch" value={detailData.nationality} />
                                <InforItemMain label="Quê quán" value={detailData.address} />
                                <InforItemMain label="Bảo hiểm y tế" value={detailData.bhyt} />
                            </Box>
                        </Box>
                    }
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                        <Box py={3} flex alignItems="center" justifyContent="center" className="w-full">
                            <SecondaryButton fullWidth label="Không duyệt" handleClick={() => handleNotAccept()} iconLeft={<Icon fontSize={16} icon='' />} />
                            <PrimaryButton fullWidth label="Xét duyệt" handleClick={() => handleAccept()} iconLeft={<Icon fontSize={16} icon='' />} />
                        </Box>
                    </div>
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

export default ResidentCraftPage