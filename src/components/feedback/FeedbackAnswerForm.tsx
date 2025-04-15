import React, { useEffect, useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormImageUploader, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataFeedback, schemaFeedback } from "./type"
import { useCustomSnackbar } from "utils/useCustomSnackbar"

const defaultValues: FormDataFeedback = {
    content: '',
    files: [],
}

type FeedbackAnswerFormProps = {
    feedbackId: number;
    responseData: any | undefined
}

const FeedbackAnswerForm: React.FC<FeedbackAnswerFormProps> = ({ feedbackId, responseData }) => {

    const { showSuccess, showError } = useCustomSnackbar();
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
            showSuccess('Thêm phản hồi thành công')
            reset(defaultValues);
            navigate('/feedback-management');
        } catch (error: any) {
            console.error(`Lỗi: ${error}`)
            showError(error)
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
            showSuccess('Cập nhật thông tin phản hồi thành công')
            reset(defaultValues);
            navigate('/feedback-management');
        } catch (error: any) {
            console.error(`Lỗi: ${error}`)
            showError(error)
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
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
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