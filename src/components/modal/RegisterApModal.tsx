import React from 'react'
import { useStoreApp } from 'store/store'
import { Button, Modal, useNavigate } from 'zmp-ui'

const RegisterApModal = () => {

    const { isShowModalRegisterAp, setIsShowModalRegisterAp } = useStoreApp()

    const navigate = useNavigate()

    return (
        <Modal
            visible={isShowModalRegisterAp}
            onClose={() => setIsShowModalRegisterAp(false)}
            title='Bạn cần cập nhật thông tin'
        >
            <div style={{ padding: "20px" }}>
                <p style={{ marginBottom: "20px", textAlign: "center" }}>Vui lòng cập nhật thông tin ấp/khu phố để sử dụng tính năng này.</p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                    }}
                >
                    <Button
                        size='medium'
                        onClick={() => setIsShowModalRegisterAp(false)}
                        style={{ flex: 1, backgroundColor: "#e4e4e4", color: "#000" }}
                    >
                        Bỏ qua
                    </Button>
                    <Button
                        size='medium'
                        onClick={() => {
                            setIsShowModalRegisterAp(false)
                            navigate('/register-ap')
                        }}
                        style={{ flex: 1, backgroundColor: "#0262c9", color: "#fff" }}
                    >
                        Cập nhật ngay
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default RegisterApModal