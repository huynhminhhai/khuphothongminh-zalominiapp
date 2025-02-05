import { Icon } from "@iconify/react";
import { HeaderSub } from "components/header-sub"
import React, { useState } from "react"
import { getAccessTokenAccount, getPhoneNumberAccount } from "services/zalo";
import { Box, List, Page, useNavigate, useSnackbar } from "zmp-ui"

const AccountPage: React.FC = () => {

    const { Item } = List;
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const handleLoginWithZalo = async () => {
        setLoading(true);
        try {
            const phoneNumber = await getPhoneNumberAccount()

            if (phoneNumber) {
                const accessToken = await getAccessTokenAccount()

                console.log('call api login zalo with: ', {token: phoneNumber, userAccessToken: accessToken})
            }
            // Thành công
            openSnackbar({
                icon: true,
                text: "Đăng nhập thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            navigate('/pofile');
        } catch (error) {
            console.error('Error:', error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{backgroundColor: '#f5f6f7'}}>
            <Box>
                <HeaderSub title="Tài khoản" />
                <Box>
                    <Box m={4}>
                        <List className="bg-white rounded-lg">
                            <div className="px-4 pt-4 text-[18px] leading-[1] font-medium">Đăng nhập</div>
                            <Item
                                onClick={() => handleLoginWithZalo()}
                                title="Với zalo"
                                prefix={<Icon fontSize={28} icon="material-symbols-light:login" />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                            <Item
                                onClick={() => navigate('/login')}
                                title="Với tài khoản"
                                prefix={<Icon fontSize={28} icon="material-symbols-light:login" />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                        </List>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default AccountPage