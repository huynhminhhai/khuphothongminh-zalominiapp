import { useLoginZalo } from "apiRequest/auth"
import RegisterApForm from "components/account/RegisterApForm"
import { HeaderSub } from "components/header-sub"
import React, { useEffect, useState } from "react"
import { getAccessTokenAccount, getPhoneNumberAccount } from "services/zalo"
import { useStoreApp } from "store/store"
import { useCustomSnackbar } from "utils/useCustomSnackbar"
import { Box, Button, Modal, Page, useNavigate } from "zmp-ui"

const RegisterApPage: React.FC = () => {

    const navigate = useNavigate();
    const { showError, showWarning } = useCustomSnackbar();
    const { setIsLoadingFullScreen, account } = useStoreApp();
    const { mutateAsync } = useLoginZalo();
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        if (account) {
            return;
        } else {
            setIsShowModal(true);
        }
    }, [])

    const loginWithZalo = async () => {

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
            }

        } catch (error: any) {
            if (error.code === -201) {
                showWarning('Bạn đã từ chối đăng nhập bằng Zalo')
                navigate(-1)
            } else {
                console.error(`Lỗi: ${error}`)
                showError(error)
            }
        } finally {
            setIsLoadingFullScreen(false);
        }
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Đăng ký thông tin Khu phố/Ấp" />
                <Box>
                    <RegisterApForm />
                </Box>
            </Box>

            <Modal
                visible={isShowModal}
                onClose={() => setIsShowModal(false)}
                title='Chức năng cần số điện thoại của bạn'
            >
                <div style={{ padding: "20px" }}>
                    <p style={{ marginBottom: "20px", textAlign: "center" }}>Chúng tôi cần thông tin số điện thoại của bạn để định danh tài khoản và thực hiện chức năng.</p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                        }}
                    >
                        <Button
                            size='medium'
                            onClick={() => {
                                setIsShowModal(false)
                                navigate(-1)
                            }}
                            style={{ flex: 1, backgroundColor: "#ececec", color: "#000" }}
                        >
                            Để sau
                        </Button>
                        <Button
                            size='medium'
                            onClick={() => {
                                setIsShowModal(false)
                                loginWithZalo()
                            }}
                            style={{ flex: 1, backgroundColor: "#0262c9", color: "#fff" }}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            </Modal>
        </Page>
    )
}

export default RegisterApPage