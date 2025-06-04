import { DocumentUpdateForm } from "components/document"
import { HeaderSub } from "components/header-sub"
import { NotificationUpdateForm } from "components/notification"
import React from "react"
import { Box, Page } from "zmp-ui"

const NotificationUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật thông báo" />
                <NotificationUpdateForm />
            </Box>
        </Page>
    )
}

export default NotificationUpdatePage