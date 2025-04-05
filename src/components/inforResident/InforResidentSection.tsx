import React from "react"
import { Box, Tabs } from "zmp-ui"
import InforResidentItemMain from "./InforResidentItemMain"
import MemberResidentSection from "./MemberResidentSection"
import { useGetUserInfo } from "apiRequest/user"
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton"
import { EmptyData } from "components/data"
import { useStoreApp } from "store/store"

const InforResidentSection: React.FC = () => {

    const  { isResidentMainTab, setIsResidentMainTab } = useStoreApp()

    console.log(isResidentMainTab)

    const { data: userInfo, isLoading, error } = useGetUserInfo();

    if (isLoading) return <UserInfoSkeleton />;
    if (error) return <EmptyData title="Có lỗi khi lấy thông tin người dùng" />;
    if (!userInfo.thongTinDanCu) return <Box px={4}>
        <EmptyData desc="Không tìm thấy thông tin dân cư" />
    </Box>

    return (
        <Box>
            <Box>
                <Tabs className="tab-resident" activeKey={isResidentMainTab} onChange={(value) => setIsResidentMainTab(value)}>
                    <Tabs.Tab key="residentTab" label="Thông tin cá nhân">
                        <InforResidentItemMain data={userInfo} />
                    </Tabs.Tab>
                    <Tabs.Tab key="memberTab" label="Thông tin gia đình">
                        <MemberResidentSection danCuId={userInfo.thongTinDanCu.danCuId} />
                    </Tabs.Tab>
                </Tabs>
            </Box>
        </Box>
    )
}

export default InforResidentSection