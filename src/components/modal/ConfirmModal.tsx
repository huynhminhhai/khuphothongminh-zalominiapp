import React from "react";
import { Modal, Button } from "zmp-ui";

interface ConfirmModalProps {
  visible: boolean; 
  title?: string; 
  message?: string;
  onConfirm: () => void; 
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      onClose={onCancel}
      title={title}
    >
      <div style={{ padding: "20px" }}>
        <p style={{ marginBottom: "20px", textAlign: "center" }}>{message}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            onClick={onCancel}
            style={{ flex: 1, backgroundColor: "#f8f9fa", color: "#000" }}
          >
            Hủy
          </Button>
          <Button
            onClick={onConfirm}
            style={{ flex: 1, backgroundColor: "#007bff", color: "#fff" }}
          >
            Đồng ý
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
