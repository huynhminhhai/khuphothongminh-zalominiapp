import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Modal } from 'zmp-ui';
import { FormDataTienDoNhiemVu, schemaTienDoNhiemVu, TaskType } from './type';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ConfirmModal } from 'components/modal';
import { FormFileInput, FormInputAreaField, FormInputField, FormSelectField } from 'components/form';
import { useCreateTienDoNhiemVu, useGetTaskStatus } from 'apiRequest/task';
import { useStoreApp } from 'store/store';
import { convertToFormData } from 'utils/file';

type TaskUpdateFormModalProps = {
    visible: boolean;
    onClose: () => void;
    taskData: TaskType
}

const defaultValues: FormDataTienDoNhiemVu = {
    tinhTrangId: 0,
    ghiChu: ''
}

const TaskUpdateFormModal: React.FC<TaskUpdateFormModalProps> = ({
    visible,
    onClose,
    taskData
}) => {

    const { account } = useStoreApp();

    const [formData, setFormData] = useState<FormDataTienDoNhiemVu>(defaultValues)
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTienDoNhiemVu>({
        resolver: yupResolver(schemaTienDoNhiemVu),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataTienDoNhiemVu> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const { mutateAsync: createTask, isPending } = useCreateTienDoNhiemVu();
    const { data: taskStatus } = useGetTaskStatus();

    const tinhTrangs = useMemo(() => {
        return taskStatus?.slice(1, -1).map((item) => ({
            value: item.tinhTrangId,
            label: item.tenTinhTrang
        })) || [];
    }, [taskStatus]);


    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {

                const prepareDataSubmit = { ...formData, nhiemVuId: taskData.nhiemVuId, nguoiTao: account?.nguoiDungId }

                const dataSubmit = convertToFormData(prepareDataSubmit)

                await createTask(dataSubmit);

                reset(defaultValues);
                
                onClose()
            } catch (error) {
                console.error("Error:", error);
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
                <h3 className='text-[18px] text-[black] leading-[22px] font-semibold text-center mb-4'>Cập nhật tiến độ</h3>

                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormSelectField
                            name="tinhTrangId"
                            label="Tình trạng thực hiện"
                            placeholder="Chọn tình trạng"
                            control={control}
                            options={tinhTrangs}
                            error={errors.tinhTrangId?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="ghiChu"
                            label="Nội dung báo cáo"
                            placeholder="Nhập nội dung báo cáo"
                            control={control}
                            error={errors.ghiChu?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormFileInput
                            name="fileDinhKems"
                            label="Tập tin đính kèm"
                            control={control}
                            error={errors.fileDinhKems?.message}
                        />
                    </div>
                </div>

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
