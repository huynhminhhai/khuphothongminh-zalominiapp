import React, { useEffect, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormImageUploader, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataFeedback, schemaFeedback } from "./type"
import { FeedbackResponse } from "constants/utinities"

const defaultValues: FormDataFeedback = {
    content: '',
    files: [],
}

type FeedbackAnswerFormProps = {
    feedbackId: number;
    responseData: FeedbackResponse | undefined
}

const FeedbackAnswerForm: React.FC<FeedbackAnswerFormProps> = ({ feedbackId, responseData }) => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataFeedback>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataFeedback>({
        resolver: yupResolver(schemaFeedback),
        defaultValues
    });

    useEffect(() => {
        if (responseData) {
            reset({
                content: responseData?.content,
                files: responseData?.files
            })
        }
    }, [responseData, feedbackId])

    const onSubmit: SubmitHandler<FormDataFeedback> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApiAdd = () => {
        setLoading(true);
        try {
            // Gọi API thêm tin tức
            console.log('call api add with: ', { ...formData, feedbackId });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Thêm phản hồi thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/feedback-management');
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
            // Gọi API thêm tin tức
            console.log('call api update with: ', { ...formData, feedbackId });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Cập nhật phản hồi thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/feedback-management');
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
            if (responseData) {
                fetchApiUpdate()
            } else {
                fetchApiAdd()
            }
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormTextEditorField
                            name="content"
                            label="Nội dung phản hồi"
                            placeholder="Nhập nội dung phản hồi..."
                            control={control}
                            error={errors.content?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormImageUploader
                            name="files"
                            label="Upload ảnh"
                            control={control}
                            error={errors.files?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            {
                                responseData ?
                                    <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật phản hồi"} handleClick={handleSubmit(onSubmit)} />
                                    :
                                    <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm phản hồi"} handleClick={handleSubmit(onSubmit)} />
                            }
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn phản hồi phản ánh này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default FeedbackAnswerForm