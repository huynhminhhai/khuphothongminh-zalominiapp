import React, { useState } from "react"
import { Box } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormFileInput, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataFeedbackAnswer, schemaFeedbackAnswer } from "./type"
import { useCreateFeebackAnswer } from "apiRequest/feeback"
import { useSearchParams } from "react-router-dom"
import { convertToFormData } from "utils/file"

const defaultValues: FormDataFeedbackAnswer = {
    noiDung: '',
    tapTinPhanHoiFormFiles: [],
}

const FeedbackAnswerAddForm: React.FC = () => {

    const [searchParams] = useSearchParams();
    const feedbackId = searchParams.get("id");

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataFeedbackAnswer>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataFeedbackAnswer>({
        resolver: yupResolver(schemaFeedbackAnswer),
        defaultValues
    });

    const { mutateAsync: createFeedbackAnswer, isPending } = useCreateFeebackAnswer();

    const onSubmit: SubmitHandler<FormDataFeedbackAnswer> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };


    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            const dataSubmit = convertToFormData({ ...formData, phanAnhId: feedbackId });

            await createFeedbackAnswer(dataSubmit);

            reset(defaultValues);
        } catch (error) {
            console.error("Error:", error);
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
                            name="noiDung"
                            label="Nội dung phản hồi"
                            placeholder="Nhập nội dung phản hồi..."
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormFileInput
                            name="tapTinPhanHoiFormFiles"
                            label="Tập tin đính kèm"
                            control={control}
                            error={errors.tapTinPhanHoiFormFiles?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth disabled={isPending} label={isPending ? "Đang xử lý..." : "Thêm phản hồi"} handleClick={handleSubmit(onSubmit)} />
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

export default FeedbackAnswerAddForm