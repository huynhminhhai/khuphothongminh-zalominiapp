import { useGetResidentDetail } from "apiRequest/resident";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub"
import { ResidentInfoList } from "components/inforResident";
import { InforItemMain } from "components/inforResident/ResidentInfoList";
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton";
import React from "react"
import { useSearchParams } from "react-router-dom";
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const ProfileResidentPage: React.FC = () => {

    const [searchParams] = useSearchParams();

    const residentId = searchParams.get("id");
    const { data: residentDetailData, isLoading, error } = useGetResidentDetail((Number(residentId)));

    if (isLoading) return <UserInfoSkeleton />;
    if (error) return <EmptyData title="Có lỗi khi lấy thông tin người dùng" />;

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cư dân" />
                <Box>
                    {
                        !residentDetailData ? <EmptyData title="Không tìm thấy thông tin hộ dân" /> :
                        <Box px={4}>
                            <InforItemMain label="Họ tên" value={residentDetailData.hoTen}  />
                            <ResidentInfoList residentDetailData={residentDetailData} isShow={true} />
                        </Box>
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default ProfileResidentPage