import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Modal } from 'zmp-ui';
import { FormDataReportTask, schemaReportTask, TaskType } from './type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ConfirmModal } from 'components/modal';
import { useGetTaskStatus, useUpdateTaskStatus } from 'apiRequest/task';

type TaskUpdateFormModalProps = {
    visible: boolean;
    onClose: () => void;
    taskData: TaskType
}

const defaultValues: FormDataReportTask = {
    tinhTrangId: 0,
}

const TaskUpdateFormModal: React.FC<TaskUpdateFormModalProps> = ({
    visible,
    onClose,
    taskData
}) => {

    const [formData, setFormData] = useState<FormDataReportTask>(defaultValues)
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataReportTask>({
        resolver: yupResolver(schemaReportTask),
        defaultValues
    });


    const { data: taskStatus } = useGetTaskStatus();
    const { mutate, isPending } = useUpdateTaskStatus();

    const taskStatusTypeOpton = useMemo(() => {
        return taskStatus?.map((item) => ({
            value: item.tinhTrangId,
            label: item.tenTinhTrang
        })) || [];
    }, [taskStatus]);


    const onSubmit: SubmitHandler<FormDataReportTask> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        reset({
            tinhTrangId: taskData.tinhTrangId,
        })
    }, [taskData])

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                mutate({
                    nhiemVuId: taskData.nhiemVuId,
                    tinhTrangId: formData.tinhTrangId,
                });
            } catch (error) {

            }
        }
    };

    const handleCancel = () => {
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
                            <Controller
                                name="tinhTrangId"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} id="tinhTrangId" className='w-full h-[46px] bg-gray-100 border-[0px] rounded px-4 font-medium'>
                                        {taskStatusTypeOpton.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
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
                        disabled={isPending}
                    >
                        {isPending ? 'Đang xử lý' : 'Cập nhật'}
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
