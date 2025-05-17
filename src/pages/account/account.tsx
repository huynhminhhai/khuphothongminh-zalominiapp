import { Icon } from "@iconify/react";
import { useLogout } from "apiRequest/auth";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { createMiniAppShortcut, openPermissionSettingApp } from "services/zalo";
import { useStoreApp } from "store/store";
import { Box, List, Page, useNavigate } from "zmp-ui"

const ManagementTitle = ({ title }: any) => {
    return (
        <div className="px-4 pt-4 pb-1 text-primary-color text-[16px] leading-[1] font-semibold">
            {title}
        </div>
    )
}

const AccountPage: React.FC = () => {

    const { Item } = List;

    const navigate = useNavigate()
    // const { loginWithZalo } = useLoginWithZalo();
    const { account, accessToken, hasRole } = useStoreApp();
    const logout = useLogout();

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tài khoản" onBackClick={() => navigate('/')} />
                <Box>
                    {
                        accessToken &&
                        <>
                            <Box m={4}>
                                <List className="bg-white rounded-lg">
                                    <Item
                                        onClick={() => navigate('/register-ap')}
                                        title="Đăng ký thông tin ấp/khu phố"
                                        prefix={<img src={images.progress} width={30} />}
                                        suffix={<Icon fontSize={20} icon="formkit:right" />}
                                    />
                                </List>
                            </Box>
                            <Box m={4}>
                                <List className="bg-white rounded-lg">
                                    <ManagementTitle title="Tài khoản" />
                                    <Item
                                        onClick={() => navigate('/profile-account')}
                                        title="Thông tin"
                                        prefix={<img src={images.resume} width={30} />}
                                        suffix={<Icon fontSize={20} icon="formkit:right" />}
                                    />
                                    {
                                        hasRole('TRUONG_AP') &&
                                        <Item
                                            onClick={() => navigate('/change-password')}
                                            title="Đổi mật khẩu"
                                            prefix={<img src={images.changePw} width={30} />}
                                            suffix={<Icon fontSize={20} icon="formkit:right" />}
                                        />
                                    }
                                    <Item
                                        onClick={logout}
                                        title="Đăng xuất"
                                        prefix={<img src={images.logout} width={30} />}
                                        suffix={<Icon fontSize={20} icon="formkit:right" />}
                                    />
                                </List>
                            </Box>
                        </>
                        // :
                        // <Box m={4}>
                        //     <List className="bg-white rounded-lg">
                        //         <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Đăng nhập</div>
                        //         <Item
                        //             onClick={() => navigate('/login')}
                        //             title="Với tài khoản"
                        //             prefix={<img src={images.login} width={30} />}
                        //             suffix={<Icon fontSize={20} icon="formkit:right" />}
                        //         />
                        //         <Item
                        //             onClick={() => loginWithZalo()}
                        //             title="Với zalo"
                        //             prefix={<img src={images.zalo} width={30} />}
                        //             suffix={<Icon fontSize={20} icon="formkit:right" />}
                        //         />
                        //     </List>
                        // </Box>
                    }
                    <Box m={4}>
                        <List className="bg-white rounded-lg">
                            <ManagementTitle title="Cài đặt" />
                            <Item
                                onClick={() => openPermissionSettingApp()}
                                title="Quản lý quyền Zalo"
                                prefix={<img src={images.setting} width={30} />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                            <Item
                                onClick={() => createMiniAppShortcut()}
                                title="Thêm vào màn hình chính"
                                prefix={<img src={images.shortcut} width={30} />}
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