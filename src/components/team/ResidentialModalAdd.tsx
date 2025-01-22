import React, { useEffect, useState } from "react";
import { Box, Button, Modal, useNavigate, useSnackbar } from "zmp-ui";
import { FormDataResidential, schemaResidential, schemaTermAdd } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConfirmModal } from "components/modal";
import { FormControllerDatePicker, FormInputField } from "components/form";
import { RESIDENTIALGROUPDATA, TERMDATA } from "constants/utinities";

type ResidentialModalAddProps = {
    visible: boolean;
    onClose: () => void;
    residentialId?: number;
}

const defaultValues: FormDataResidential = {
    name: '',
}

const ResidentialModalAdd: React.FC<ResidentialModalAddProps> = ({ visible, onClose, residentialId }) => {

    const [formData, setFormData] = useState<FormDataResidential>(defaultValues)
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const fetchResidentialData = async () => {
        setLoading(true);
        try {

            const data = RESIDENTIALGROUPDATA.find(term => term.id === residentialId)

            if (data) {
                setFormData(data)
                reset(data)
            }

        } catch (error) {
            console.error("Failed to fetch resident data:", error);
            openSnackbar({
                text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (residentialId !== 0) {
            fetchResidentialData();
        } else {
            reset(defaultValues)
        }

    }, [residentialId]);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataResidential>({
        resolver: yupResolver(schemaResidential),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataResidential> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApiAdd = () => {
        setLoading(true);
        try {
            console.log('call api add with: ', { ...formData });

            openSnackbar({
                icon: true,
                text: "Thêm tổ dân cư thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
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

    const fetchApiUpdate = () => {
        setLoading(true);
        try {
            console.log('call api update with: ', { ...formData, id: residentialId });

            openSnackbar({
                icon: true,
                text: "Cập nhật tổ dân cư thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
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


    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            if (residentialId === 0) {
                fetchApiAdd()
            } else {
                fetchApiUpdate()
            }
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

    return (
        <>
            <Modal
                visible={visible}
                title={residentialId === 0 ? 'Thêm tổ dân cư' : 'Cập nhật tổ dân cư'}
                onClose={onClose}
                actions={[
                    {
                        text: 'Đóng',
                        close: true,
                        highLight: true,
                    },
                ]}
            >
                <Box>
                    <div className="grid grid-cols-12 gap-x-3">
                        <div className="col-span-12">
                            <FormInputField
                                name="name"
                                label="Tên tổ dân cư"
                                placeholder="Nhập tên tổ dân cư"
                                control={control}
                                error={errors.name?.message}
                                required
                            />
                        </div>
                        <div className="col-span-12 mt-2">
                            <Button size="medium" fullWidth onClick={handleSubmit(onSubmit)}>{residentialId === 0 ? 'Thêm' : 'Cập nhật'}</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message={
                    residentialId === 0 ? "Bạn có chắc chắn muốn thêm tổ dân cư này không?" : "Bạn có chắc chắn muốn cập nhật tổ dân cư này không?"
                }
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default ResidentialModalAdd;