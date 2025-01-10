import React, { useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataFeedback, schemaFeedback } from "./type";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmModal } from "components/modal";
import { PrimaryButton } from "components/button";
import TextEditor from "components/form/TextEditorField";
import { FormImageUploader, FormTextEditorField } from "components/form";

const defaultValues: FormDataFeedback = {
    content: '',
    images: []
};

const FeedbackAddForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataFeedback>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataFeedback>({
        resolver: yupResolver(schemaFeedback),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataFeedback> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm thành viên
            console.log('call api add with: ', { ...formData });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Gửi phản ánh thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/feedback-history');
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
                        <FormTextEditorField
                            name="content"
                            label="Nội dung phản ánh"
                            placeholder="Nhập nội dung phản ánh..."
                            control={control}
                            error={errors.content?.message}
                            required
                        />

                        <FormImageUploader
                            name="images"
                            label="Upload ảnh"
                            control={control}
                            error={errors.images?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Gửi phản ánh"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi phản ánh này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default FeedbackAddForm