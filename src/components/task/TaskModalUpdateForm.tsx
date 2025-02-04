import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, useSnackbar } from 'zmp-ui';
import { FormDataReportTask, schemaReportTask } from './type';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ConfirmModal } from 'components/modal';
import { FormImageUploader, FormSelectField, FormTextEditorField } from 'components/form';
import { taskStatus } from 'constants/mock';
import { TaskType } from 'constants/utinities';

type TaskUpdateFormModalProps = {
    visible: boolean;
    onClose: () => void;
    taskData: TaskType
}

const defaultValues: FormDataReportTask = {
    status: 0,
}

const TaskUpdateFormModal: React.FC<TaskUpdateFormModalProps> = ({
    visible,
    onClose,
    taskData
}) => {

    const { openSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataReportTask>(defaultValues)
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataReportTask>({
        resolver: yupResolver(schemaReportTask),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataReportTask> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        reset({
            status: taskData.status,
            note: taskData.note,
            imageReport: taskData.imageReport
        })
    }, [])

    const fetchApi = () => {
        setLoading(true);
        try {
            console.log('call api update with: ', { ...formData });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Cập nhật tiến độ thành công",
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
            onClose()
        }
    }

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            fetchApi()
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

    return (
        <Modal
            visible={visible}
            title={''}
            onClose={onClose}
            verticalActions
        >
            <Box p={4}>
                {/* Tiêu đề và mô tả */}
                <h3 className='text-[18px] text-[black] leading-[22px] font-semibold text-center mb-2'>Cập nhật tiến độ</h3>

                <Box py={4}>
                    <div className="grid grid-cols-12 gap-x-3">
                        <div className="col-span-12">
                            <FormSelectField
                                name="status"
                                label="Trạng thái"
                                placeholder="Chọn trạng thái"
                                control={control}
                                options={taskStatus}
                                error={errors.status?.message}
                                required
                            />
                        </div>
                        <div className="col-span-12">
                            <FormTextEditorField
                                name="note"
                                label="Ghi chú"
                                placeholder="Nhập nội dung ghi chú..."
                                control={control}
                                error={errors.note?.message}
                            />
                        </div>
                        <div className="col-span-12">
                            <FormImageUploader
                                name="imageReport"
                                label="Chọn ảnh đính kèm"
                                control={control}
                                error={errors.imageReport?.message}
                            />
                        </div>
                    </div>
                </Box>

                <div className='flex items-center gap-2'>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                        fullWidth
                        size='medium'
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(onSubmit)}
                        fullWidth
                        size='medium'
                    >
                        Cập nhật
                    </Button>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn cập nhật tiến độ của nhiệm vụ này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Modal>
    );
};

export default TaskUpdateFormModal;
