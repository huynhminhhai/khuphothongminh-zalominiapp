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

    const { data: userInfo, isLoading, error } = useGetUserInfo();

    if (isLoading) return <UserInfoSkeleton />;
    
    if (error) return <EmptyData title="Có lỗi khi lấy thông tin người dùng" />;
    
    if (!userInfo.thongTinDanCu) return <Box px={4}>
        <EmptyData title="Chưa có thông tin dân cư" desc="Vui lòng liên hệ với ban quản trị khu phố/ấp để đăng ký thông tin cư dân" />
    </Box>

    if (userInfo?.apId !== userInfo.thongTinDanCu?.apId) return <EmptyData title="Bạn chưa có thông tin dân cư ở ấp/khu phố này" desc="Vui lòng liên hệ với ban quản trị khu phố/ấp" />

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