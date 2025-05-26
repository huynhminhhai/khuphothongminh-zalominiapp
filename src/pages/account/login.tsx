import images from "assets/images"
import { LoginForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React, { useEffect } from "react"
import { getDataFromStorage } from "services/zalo"
import { useStoreApp } from "store/store"
import { useCustomSnackbar } from "utils/useCustomSnackbar"
import { Box, Page, useNavigate } from "zmp-ui"

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();
    const { account, setAccount, setToken } = useStoreApp();

    useEffect(() => {
        const checkLogin = async () => {
            if (account) {
                showSuccess('Đăng nhập thành công')
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
                        src={images.bg2}
                        alt="Đăng nhập"
                    />
                </Box>
                <Box p={4} mt={6}>
                    <Box>
                        <h3 className="text-[24px] font-bold text-primary-color text-center">Chào Mừng Trở Lại</h3>
                        <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">Chức năng đăng nhập dành cho ban điều hành khu phố/ấp</h4>
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