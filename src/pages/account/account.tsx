import { Icon } from "@iconify/react";
import { HeaderSub } from "components/header-sub"
import React, { useState } from "react"
import { useLoginWithZalo } from "services/loginWithZalo";
import { Box, List, Page, useNavigate, useSnackbar } from "zmp-ui"

const AccountPage: React.FC = () => {

    const { Item } = List;
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const { loginWithZalo } = useLoginWithZalo()

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{backgroundColor: '#f5f6f7'}}>
            <Box>
                <HeaderSub title="Tài khoản" />
                <Box>
                    <Box m={4}>
                        <List className="bg-white rounded-lg">
                            <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Đăng nhập</div>
                            <Item
                                onClick={() => loginWithZalo()}
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