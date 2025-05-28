import { Icon } from '@iconify/react'
import images from 'assets/images'
import React from 'react'
import { useLoginWithZalo } from 'services/loginWithZalo'
import { useStoreApp } from 'store/store'
import { Button, List, Modal, useNavigate } from 'zmp-ui'

const LoginModal = () => {

    const { isShowModalIsLogin, setIsShowModalIsLogin } = useStoreApp()
    const { Item } = List;
    const { loginWithZalo } = useLoginWithZalo();

    const navigate = useNavigate()

    return (
        <Modal
            visible={isShowModalIsLogin}
            onClose={() => setIsShowModalIsLogin(false)}
            title='Chức năng cần đăng nhập'
        >
            <List className="bg-white rounded-lg">
                <div className="pt-4 pb-1 text-primary-color text-[16px] leading-[1] font-semibold">
                    Đăng nhập
                </div>
                <Item
                    onClick={() => {
                        navigate('/login')
                        setIsShowModalIsLogin(false)
                    }}
                    title="Dành cho ban điều hành"
                    prefix={<img src={images.login} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                    className='!px-0'
                />
                <Item
                    onClick={() => {
                        loginWithZalo()
                        setIsShowModalIsLogin(false)
                    }}
                    title="Dành cho hộ gia đình"
                    prefix={<img src={images.zalo} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                    className='!px-0'
                    subTitle={'Yêu cầu truy cập số điện thoại'}
                />
            </List>

            <div className='flex justify-end items-center'>
                <button onClick={() => setIsShowModalIsLogin(false)} className='font-medium'>Đóng</button>
            </div>
        </Modal>
    )
}

export default LoginModal