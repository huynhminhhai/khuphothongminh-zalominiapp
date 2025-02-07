import { HeaderSub } from "components/header-sub"
import { NotificationList } from "components/notification"
import React from "react"
import { Box, Page } from "zmp-ui"

const NotificationPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Thông báo" />
                <Box>
                    <NotificationList />
                </Box>
            </Box>
        </Page>
    )
}

export default NotificationPage