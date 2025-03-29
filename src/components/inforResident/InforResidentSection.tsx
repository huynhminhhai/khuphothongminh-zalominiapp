import React from "react"
import { Box, Tabs } from "zmp-ui"
import InforResidentItemMain from "./InforResidentItemMain"
import MemberResidentSection from "./MemberResidentSection"
import { useGetUserInfo } from "apiRequest/user"
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton"
import { EmptyData } from "components/data"

const InforResidentSection: React.FC = () => {

    const { data: userInfo, isLoading, error } = useGetUserInfo();

    if (isLoading) return <UserInfoSkeleton />;
    if (error) return <EmptyData title="Có lỗi khi lấy thông tin người dùng" />;
    if (!userInfo.thongTinDanCu) return <EmptyData title="Không tìm thấy thông tin hộ dân" />

    return (
        <Box>
            <Box>
                <Tabs className="tab-resident">
                    <Tabs.Tab key="tab1" label="Thông tin cá nhân">
                        <InforResidentItemMain data={userInfo} />
                    </Tabs.Tab>
                    <Tabs.Tab key="tab2" label="Thông tin gia đình">
                        <MemberResidentSection danCuId={userInfo.thongTinDanCu.danCuId} />
                    </Tabs.Tab>
                </Tabs>
            </Box>
        </Box>
    )
}

export default InforResidentSection