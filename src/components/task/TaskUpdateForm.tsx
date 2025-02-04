import React, { useEffect, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataTask, schemaTask } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploader, FormInputAreaField, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { STAFFOPTION, TASKS } from "constants/utinities"
import { taskPriority, taskStatus } from "constants/mock"
import { useSearchParams } from "react-router-dom"

const defaultValues: FormDataTask = {
    title: '',
    description: '',
    assignedTo: 0,
    dueDate: '',
    status: 1,
    priority: 0
}

const TaskUpdateForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTask>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTask>({
        resolver: yupResolver(schemaTask),
        defaultValues
    });

    const [searchParams] = useSearchParams();

    const taskId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchTaskData = async () => {
            setLoading(true);
            try {
                const data = TASKS.find(task => task.id === Number(taskId))

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

        fetchTaskData();
    }, [taskId]);

    const onSubmit: SubmitHandler<FormDataTask> = (data) => {
        const updatedData = {};

        let hasChanges = false;

        // Duyệt qua tất cả các trường và so sánh với giá trị mặc định
        Object.keys(data).forEach((key) => {
            if (data[key] !== formData[key]) {
                updatedData[key] = data[key];
                hasChanges = true;
            }
        });

        if (!hasChanges) {
            openSnackbar({
                icon: true,
                text: "Không có thay đổi nào để cập nhật.",
                type: 'warning',
                duration: 3000,
            });
            return; // Không thực hiện tiếp tục gửi yêu cầu
        }

        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm thành viên
            console.log('call api update with: ', formData);
            // Thành công
            openSnackbar({
                icon: true,
                text: "Cập nhật thông tin nhiệm vụ thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/task-management');
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
            fetchApi()
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

    return (
        <Box p={4}>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormInputField
                            name="title"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.title?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="description"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            control={control}
                            error={errors.description?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="assignedTo"
                            label="Giao cho"
                            placeholder="Chọn cán bộ"
                            control={control}
                            options={STAFFOPTION}
                            error={errors.assignedTo?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="dueDate"
                            label="Thời hạn"
                            placeholder="Chọn thời hạn"
                            control={control}
                            required={true}
                            error={errors.dueDate?.message}
                        />
                    </div>
                    <div className="col-span-6">
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
                    <div className="col-span-6">
                        <FormSelectField
                            name="priority"
                            label="Mức độ ưu tiên"
                            placeholder="Chọn mức độ"
                            control={control}
                            options={taskPriority}
                            error={errors.priority?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormImageUploader
                            name="imageUrl"
                            label="Chọn ảnh đính kèm"
                            control={control}
                            error={errors.imageUrl?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm nhiệm vụ"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin nhiệm vụ này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TaskUpdateForm