import { LoginForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React, { useEffect } from "react"
import { getDataFromStorage } from "services/zalo"
import { useStoreApp } from "store/store"
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();
    const { account, setAccount, setToken } = useStoreApp();

    useEffect(() => {
        const checkLogin = async () => {
            if (account) {
                openSnackbar({
                    icon: true,
                    text: "Bạn đã đăng nhập thành công",
                    type: 'success',
                    action: { text: "Đóng", close: true },
                    duration: 3000,
                });
                navigate("/");
                return;
            }

            const storedData = await getDataFromStorage(["account", "accessToken", "refreshToken", "hanSuDungToken"]);

            if (storedData?.account && storedData?.accessToken && storedData?.refreshToken) {
                try {
                    const parsedAccount = JSON.parse(storedData.account);
                    setAccount(parsedAccount);
                    setToken({ accessToken: storedData.accessToken, refreshToken: storedData.refreshToken, hanSuDungToken: storedData.hanSuDungToken });
                } catch (error) {
                    console.error("Lỗi parse account:", error);
                }
            }
        };

        checkLogin();
    }, [account, setAccount, setToken]);


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