import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getAccessTokenAccount, getPhoneNumberAccount } from "./zalo";
import { useStoreApp } from "store/store";
import { useLoginZalo } from "apiRequest/auth";
import { useCustomSnackbar } from "utils/useCustomSnackbar";

export const useLoginWithZalo = () => {

    const navigate = useNavigate();
    const { showSuccess, showError, showWarning } = useCustomSnackbar();
    const { setIsLoadingFullScreen, account } = useStoreApp();
    const { mutateAsync } = useLoginZalo();

    const location = useLocation();

    const reloadPage = async () => {
        navigate('/loading', { replace: true });
        setTimeout(() => {
            navigate(location, { replace: true });
        }, 100);
    };

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
                    showError('Có lỗi xảy ra, vui lòng thử lại sau')
                    return;
                }

                await mutateAsync({ token: phoneNumber, userAccessToken: accessToken });
                await reloadPage()
            }

        } catch (error: any) {
            if (error.code === -201) {
                showWarning('Bạn đã từ chối đăng nhập bằng Zalo')
            } else {
                console.error(`Lỗi: ${error}`)
                showError(error)
            }
        } finally {
            setIsLoadingFullScreen(false);
        }
    };

    return { loginWithZalo };
};
