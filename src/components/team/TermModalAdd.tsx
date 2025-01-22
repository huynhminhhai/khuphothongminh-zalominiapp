import React, { useEffect, useState } from "react";
import { Box, Button, Modal, useNavigate, useSnackbar } from "zmp-ui";
import { FormDataTerm, schemaTermAdd } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConfirmModal } from "components/modal";
import { FormControllerDatePicker, FormInputField } from "components/form";
import { TERMDATA } from "constants/utinities";

type TermModalAddProps = {
    visible: boolean;
    onClose: () => void;
    staffId: number;
    termId?: number;
}

const defaultValues: FormDataTerm = {
    position: '',
    start_date: '',
    end_date: ''
}

const TermModalAdd: React.FC<TermModalAddProps> = ({ visible, onClose, staffId, termId }) => {

    const [formData, setFormData] = useState<FormDataTerm>(defaultValues)
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const fetchTermData = async () => {
        setLoading(true);
        try {

            const data = TERMDATA.find(term => term.id === termId)

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

        if (termId !== 0) {
            fetchTermData();
        } else {
            reset(defaultValues)
        }

    }, [termId]);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTerm>({
        resolver: yupResolver(schemaTermAdd),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataTerm> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApiAdd = () => {
        setLoading(true);
        try {
            console.log('call api add with: ', { ...formData, staffId: staffId });

            openSnackbar({
                icon: true,
                text: "Thêm nhiệm kỳ thành công",
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
            console.log('call api update with: ', { ...formData, staffId: staffId, id: termId });

            openSnackbar({
                icon: true,
                text: "Cập nhật nhiệm kỳ thành công",
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
            if (termId === 0) {
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
                title={termId === 0 ? 'Thêm nhiệm kỳ' : 'Cập nhật nhiệm kỳ'}
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
                                name="position"
                                label="Chức vụ"
                                placeholder="Nhập tên chức vụ"
                                control={control}
                                error={errors.position?.message}
                                required
                            />
                        </div>
                        <div className="col-span-12">
                            <FormControllerDatePicker
                                name="start_date"
                                label="Ngày bắt đầu"
                                control={control}
                                placeholder="Chọn bắt đầu"
                                required
                                dateFormat="dd/mm/yyyy"
                                error={errors.start_date?.message}
                            />
                        </div>
                        <div className="col-span-12">
                            <FormControllerDatePicker
                                name="end_date"
                                label="Ngày kết thúc"
                                control={control}
                                placeholder="Chọn kết thúc"
                                required
                                dateFormat="dd/mm/yyyy"
                                error={errors.end_date?.message}
                            />
                        </div>
                        <div className="col-span-12 mt-2">
                            <Button size="medium" fullWidth onClick={handleSubmit(onSubmit)}>{termId === 0 ? 'Thêm' : 'Cập nhật'}</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message={
                    termId === 0 ? "Bạn có chắc chắn muốn thêm nhiệm kỳ này không?" : "Bạn có chắc chắn muốn cập nhật nhiệm kỳ này không?"
                }
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default TermModalAdd;