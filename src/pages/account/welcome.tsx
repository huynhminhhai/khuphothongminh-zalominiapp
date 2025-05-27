import images from "assets/images"
import React, { useEffect } from "react"
import { useLoginWithZalo } from "services/loginWithZalo"
import { getDataFromStorage } from "services/zalo"
import { useStoreApp } from "store/store"
import { useCustomSnackbar } from "utils/useCustomSnackbar"
import { Box, Page, useNavigate } from "zmp-ui"

const WelcomePage: React.FC = () => {

    const navigate = useNavigate();
    const { showSuccess, showError } = useCustomSnackbar();
    const { account, setAccount, setToken } = useStoreApp();
    const { loginWithZalo } = useLoginWithZalo()

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
        <Page className="relative flex-1 flex flex-col gap-8 bg-white !mt-0 !min-h-screen">
            <Box>
                <img
                    className="h-[300px] w-full object-cover"
                    style={{
                        clipPath: 'ellipse(120% 100% at 30% 0%)'
                    }}
                    src={images.bg2}
                    alt="Đăng nhập"
                />
            </Box>
            <Box p={4} mt={6}>
                <Box>
                    <h3 className="text-[24px] font-bold text-primary-color text-center">Chào mừng đến với</h3>
                    <h3 className="mt-3 text-[28px] font-bold text-primary-color text-center">Khu Phố Thông Minh</h3>
                    <h4 className="mt-4 text-[14px] font-normal text-[#8f8f8f] text-center">Vui lòng chọn đúng vai trò để sử dụng các chức năng phù hợp với bạn</h4>
                </Box>
                <Box mt={10}>
                    <Box p={4}>
                        <div className="col-span-12 mt-2">
                            <button onClick={() => loginWithZalo()} className="flex items-center justify-center gap-2 bg-white h-[48px] rounded-3xl w-full border-[2px] border-primary-color">
                                <span className="text-[14px] font-semibold text-primary-color">Đăng nhập dành cho hộ gia đình</span>
                            </button>
                            <div className="text-center italic text-[12px]">
                                (Đăng nhập với Zalo)
                            </div>
                        </div>
                        <div className="col-span-12 mt-4">
                            <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 bg-primary-color h-[48px] rounded-3xl w-full border-[2px] border-primary-color">
                                <span className="text-[14px] font-medium text-white">Đăng nhập dành cho ban điều hành</span>
                            </button>
                        </div>

                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default WelcomePage