import { ProfileForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const ProfileAccountPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin tài khoản" />
                <Box>
                    <ProfileForm />
                </Box>
            </Box>
        </Page>
    )
}

export default ProfileAccountPage