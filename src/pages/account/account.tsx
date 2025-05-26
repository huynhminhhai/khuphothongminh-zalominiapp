import { Icon } from "@iconify/react";
import { useLogout } from "apiRequest/auth";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { createMiniAppShortcut, openPermissionSettingApp } from "services/zalo";
import { useStoreApp } from "store/store";
import { getFullImageUrl } from "utils/file";
import { Avatar, Box, List, Page, useNavigate } from "zmp-ui"

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
                                <div onClick={() => navigate('/profile-account')} className="flex items-center gap-3 bg-white rounded-lg p-4" >
                                    <div className="flex-1">
                                        <Avatar className="border-[2px] border-secondary-color" src={account?.anhDaiDien ? getFullImageUrl(account.anhDaiDien) : images.vnpt} size={80} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="text-[18px] leading-6 font-semibold text-primary-color">{account?.hoTen ? account.hoTen : 'Chưa cập nhật'}</div>
                                        <div className="text-[15px] text-primary-color font-semibold tracking-[0.6px] flex items-center gap-1">
                                            <Icon icon="bxs:phone" fontSize={16} />
                                            {account?.dienThoai || ''}</div>
                                    </div>
                                </div>
                            </Box>
                            <Box m={4}>
                                <List className="bg-white rounded-lg">
                                    <Item
                                        onClick={() => navigate('/register-ap')}
                                        title="Đăng ký thông tin khu phố/ấp"
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
                                        title="Thông tin tài khoản"
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