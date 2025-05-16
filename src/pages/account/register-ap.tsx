import RegisterApForm from "components/account/RegisterApForm"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const RegisterApPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Đăng ký thông tin ấp/khu phố" />
                <Box>
                    <RegisterApForm />
                </Box>
            </Box>
        </Page>
    )
}

export default RegisterApPage