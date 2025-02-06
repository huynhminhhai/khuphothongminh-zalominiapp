import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "zmp-ui";
import { getAccessTokenAccount, getPhoneNumberAccount } from "./zalo";

export const useLoginWithZalo = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const loginWithZalo = async () => {
        setLoading(true);
        try {
            const phoneNumber = await getPhoneNumberAccount();
            if (phoneNumber) {
                const accessToken = await getAccessTokenAccount();
                console.log("call api login zalo with: ", { token: phoneNumber, userAccessToken: accessToken });

                // Hiển thị thông báo thành công
                openSnackbar({
                    icon: true,
                    text: "Đăng nhập thành công",
                    type: "success",
                    action: { text: "Đóng", close: true },
                    duration: 5000,
                });

                navigate("/profile");
            }
        } catch (error) {
            console.error("Error:", error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: "error",
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return { loginWithZalo, loading };
};
