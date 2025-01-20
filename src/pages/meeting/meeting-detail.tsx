import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub"
import { MEETINGDATA } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const MeetingDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<any>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const meetingId = searchParams.get("id");

    useEffect(() => {
            // Hàm gọi API để lấy thông tin thành viên
            const fetchResidentData = async () => {
                setLoading(true);
                try {
                    // Giả sử API trả về thông tin thành viên
                    // const response = await fetch(`/api/residents/${residentId}`);
                    // const data = await response.json();
    
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

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết cuộc họp" />
                <Box p={4}>
                    {
                        detailData ?
                        <Box>{detailData.title}</Box> :
                        <EmptyData />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default MeetingDetailPage