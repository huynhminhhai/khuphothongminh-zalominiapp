import { Icon } from "@iconify/react"
import images from "assets/images"
import { economicStatus, gender } from "constants/mock"
import { genderLabel, RESIDENT, RESIDENTMAIN } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getLabelOptions } from "utils/options"
import { Avatar, Box, useSnackbar } from "zmp-ui"

export const InforItemMain = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex items-center justify-between gap-6 py-4 resident-item">
            <div className="text-[14px] text-[#767a7f] font-normal whitespace-nowrap">{label}</div>
            <div className="text-[14px] font-normal">{value}</div>
        </div>
    )
}

const InforResidentItemMain: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<any>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const userId = searchParams.get("id");

    useEffect(() => {
        const fetchResidentData = async () => {
            setLoading(true);
            try {

                const data = RESIDENT.find(resident => resident.id === Number(userId))

                if (data) {
                    setDetailData(data)
                } else {
                    setDetailData(RESIDENTMAIN)
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

        fetchResidentData();
    }, [userId]);

    return (
        <Box>
            {
                detailData &&
                <Box>
                    <Box>
                        <div className="bg-[#731611] relative flex flex-col items-center justify-center py-[30px] overflow-hidden">
                            {/* <img src={images.shape3} alt="shape3" className="bg-[#e9ca9433] absolute z-10 top-0 left-0 w-full h-full object-none" /> */}
                            <img src={images.shape2} alt="shape" className="absolute top-0 left-0 w-fit h-auto opacity-[0.1] z-0" />
                            <Avatar size={120} src={detailData.avatar || 
                                'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png'
                            } className="relative z-20 border-[4px] border-white" />
                            <div className="relative z-20 uppercase text-[18px] font-bold mt-3 text-white">{detailData.fullname}</div>
                        </div>
                    </Box>
                    <Box p={4}>
                        <InforItemMain label="Chủ hộ" value={detailData.parentName || 'Là chủ hộ'} />
                        <InforItemMain label="Số định danh cá nhân" value={detailData.numberCard} />
                        <InforItemMain label="Giới tính" value={getLabelOptions(detailData.gender, gender) as string} />
                        <InforItemMain label="Ngày sinh" value={detailData.birthDate} />
                        <InforItemMain label="Dân tộc" value={detailData.nation} />
                        <InforItemMain label="Tôn giáo" value={detailData.religion} />
                        <InforItemMain label="Quốc tịch" value={detailData.nationality} />
                        <InforItemMain label="Quê quán" value={detailData.address} />
                        <InforItemMain label="Bảo hiểm y tế" value={detailData.bhyt} />
                        <InforItemMain label="Tình trạng hộ" value={getLabelOptions(detailData.economicStatus, economicStatus) as string} />
                        <InforItemMain label="Gia đình văn hóa" value={detailData.culturalFamilyStatus ? 'Đạt' : 'Không đạt'} />
                    </Box>
                </Box>
            }
            {
                detailData && detailData.isHouseHold &&
                <Box p={4}>
                    <Box p={4} className="border-[1px] rounded-lg" onClick={() => navigate('/resident-member')}>
                        <div className="flex items-center justify-between">
                            <div className="text-[14px] font-normal">Thành viên khác trong hộ gia đình (4)</div>
                            <div>
                                <Icon fontSize={16} icon='mingcute:right-line' />
                            </div>
                        </div>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default InforResidentItemMain