import { useGetResidentDetail } from "apiRequest/resident";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub"
import { ResidentInfoList } from "components/inforResident";
import { InforItemMain } from "components/inforResident/ResidentInfoList";
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton";
import React from "react"
import { useSearchParams } from "react-router-dom";
import { Box, Page, useSnackbar } from "zmp-ui"

const ProfileResidentPage: React.FC = () => {

    const [searchParams] = useSearchParams();

    const residentId = searchParams.get("id");
    const { data: residentDetailData, isLoading } = useGetResidentDetail((Number(residentId)));

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cư dân" />
                <Box>
                    {
                        isLoading ? <UserInfoSkeleton /> :
                        residentDetailData ? 
                        <Box px={4}>
                            <InforItemMain label="Họ tên" value={residentDetailData.hoTen}  />
                            <ResidentInfoList residentDetailData={residentDetailData} isShow={true} />
                        </Box> :
                        <EmptyData title="Không tìm thấy thông tin thành viên hộ gia đình này" />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default ProfileResidentPage