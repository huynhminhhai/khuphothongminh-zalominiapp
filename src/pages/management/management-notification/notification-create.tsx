import { HeaderSub } from "components/header-sub"
import { NotificationAddForm } from "components/notification"
import React from "react"
import { Box, Page } from "zmp-ui"

const NotificationAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm thông báo nhanh" />
                <NotificationAddForm />
            </Box>
        </Page>
    )
}

export default NotificationAddPage