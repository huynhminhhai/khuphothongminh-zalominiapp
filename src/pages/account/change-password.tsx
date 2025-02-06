import { ChangePasswordForm, LoginForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const ChangePasswordPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white login-page">
            <Box>
                <HeaderSub title="Đổi mật khẩu" />
                <Box>
                    <img
                        className="h-[260px] w-full object-cover"
                        style={{
                            clipPath: 'ellipse(120% 100% at 60% 0%)'
                        }}
                        src={'https://www.thitruong.today/uploads/files/2019/06/03/thanh-pho-tan-an-tinh-long-an-co-thuc-su-la-vung-dat-mau-mo-de-dau-tu-1.jpg'}
                        alt="Đổi mật khẩu"
                    />
                </Box>
                <Box p={4} mt={4}>
                    <Box>
                        <h3 className="text-[24px] font-bold text-[#731611] text-center">Chào Mừng Trở Lại</h3>
                        <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">Đổi mật khẩu tài khoản của bạn</h4>
                    </Box>
                    <Box py={4}>
                        <ChangePasswordForm />
                    </Box>
                </Box>

            </Box>
        </Page>
    )
}

export default ChangePasswordPage