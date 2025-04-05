import { useNavigate } from "react-router-dom";
import { useSnackbar } from "zmp-ui";
import { getAccessTokenAccount, getPhoneNumberAccount } from "./zalo";
import { useStoreApp } from "store/store";
import { useLoginZalo } from "apiRequest/auth";
import envConfig from "envConfig";

export const useLoginWithZalo = () => {

    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();
    const { setIsLoadingFullScreen, account } = useStoreApp();
    const { mutateAsync } = useLoginZalo();

    const loginWithZalo = async (redirectUrl?: string) => {

        if (account) {
            console.log('Đã đăng nhập')
            navigate(redirectUrl || "/");
            return;
        }

        setIsLoadingFullScreen(true);
        
        try {
            const phoneNumber = await getPhoneNumberAccount();

            if (phoneNumber) {
                const accessToken = await getAccessTokenAccount();

                if (!accessToken) {
                    openSnackbar({
                        icon: true,
                        text: "Có lỗi xảy ra, vui lòng thử lagi.",
                        type: "error",
                        action: { text: "Đóng", close: true },
                        duration: 5000,
                    });
                    return;
                }

                await mutateAsync({ token: phoneNumber, userAccessToken: accessToken });
            }
            
        } catch (error) {
            console.error("Error:", error);
            if ((error as any).code === -201) {
                openSnackbar({
                    icon: true,
                    text: "Bạn đã từ chối đăng nhập bằng số điện thoại",
                    type: "error",
                    action: { text: "Đóng", close: true },
                    duration: 5000,
                });
            } else {
                openSnackbar({
                    icon: true,
                    text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                    type: "error",
                    action: { text: "Đóng", close: true },
                    duration: 5000,
                });
            }
        } finally {
            setIsLoadingFullScreen(false);
        }
    };

    return { loginWithZalo };
};
