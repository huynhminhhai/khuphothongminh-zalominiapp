import { getAccessTokenAccount, getLocationAccount } from "./zalo";
import { useStoreApp } from "store/store";
import { useCustomSnackbar } from "utils/useCustomSnackbar";
import { useGetLocationAccount } from "apiRequest/zalo";

export const useGetLocationWithZalo = () => {

    const { showError, showWarning } = useCustomSnackbar();
    const { setIsLoadingFullScreen, account } = useStoreApp();
    const { mutateAsync } = useGetLocationAccount();

    const getLocationWithZalo = async () => {
        // setIsLoadingFullScreen(true);

        try {
            const locationToken = await getLocationAccount();

            if (!locationToken) {
                return undefined;
            }

            const accessToken = await getAccessTokenAccount();

            if (!accessToken) {
                showError('Có lỗi xảy ra, vui lòng thử lại sau');
                return undefined;
            }

            const res = await mutateAsync({
                token: locationToken,
                userAccessToken: accessToken,
            });

            return res; // ✅ luôn trả về
        } catch (error: any) {
            if (error.code === -201) {
                showWarning('Bạn đã từ chối lấy vị trí từ Zalo');
            } else {
                console.error(`Lỗi: ${error}`);
                showError(error);
            }
            return undefined; // ✅ return trong catch
        } finally {
            // setIsLoadingFullScreen(false);
        }
    };

    return { getLocationWithZalo };
};
