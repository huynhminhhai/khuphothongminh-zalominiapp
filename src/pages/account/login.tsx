import { LoginForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const LoginPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white login-page">
            <Box>
                <HeaderSub title="Đăng nhập" />
                <Box>
                    <img
                        className="h-[260px] w-full object-cover"
                        style={{
                            clipPath: 'ellipse(120% 100% at 30% 0%)'
                        }}
                        src={'https://bcp.cdnchinhphu.vn/Uploaded/nguyenminhdiem/2019_09_06/TP%20TA.jpg'}
                        alt="Đăng nhập"
                    />
                </Box>
                <Box p={4} mt={6}>
                    <Box>
                        <h3 className="text-[24px] font-bold text-[#731611] text-center">Chào Mừng Trở Lại</h3>
                        <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">Đăng nhập với tài khoản của bạn</h4>
                    </Box>
                    <Box py={4}>
                        <LoginForm />
                    </Box>
                </Box>

            </Box>
        </Page>
    )
}

export default LoginPage