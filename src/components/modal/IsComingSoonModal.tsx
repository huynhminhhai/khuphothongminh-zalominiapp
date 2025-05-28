import React from 'react';
import { useStoreApp } from 'store/store';
import { Modal, Button } from 'zmp-ui';

const ComingSoonModal = () => {

    const { isShowModalIsComingSoon, setIsShowModalIsComingSoon } = useStoreApp()

    return (
        <Modal
            visible={isShowModalIsComingSoon}
            onClose={() => setIsShowModalIsComingSoon(false)}
            // title="Chức năng sắp triển khai"
        >
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p style={{ marginBottom: "20px" }}>
                    Chức năng này sắp được triển khai. Vui lòng quay lại sau!
                </p>
                <Button
                    size="medium"
                    onClick={() => setIsShowModalIsComingSoon(false)}
                    style={{ width: "100%", backgroundColor: "#ececec", color: "#000" }}
                >
                    Đóng
                </Button>
            </div>
        </Modal>
    );
};

export default ComingSoonModal;