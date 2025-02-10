import React, { useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataNews, schemaNews } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"

const defaultValues: FormDataNews = {
    title: '',
    description: '',
    content: '',
    imageUrl: '',
}

const NewsAddForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataNews>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNews>({
        resolver: yupResolver(schemaNews),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataNews> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm tin tức
            console.log('call api add with: ', { ...formData });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Thêm tin tức thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/news-management');
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
                        <FormImageUploaderSingle
                            name="imageUrl"
                            label="Upload ảnh"
                            control={control}
                            error={errors.imageUrl?.message}
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
                        <FormTextEditorField
                            name="content"
                            label="Nội dung tin tức"
                            placeholder="Nhập nội dung tin tức..."
                            control={control}
                            error={errors.content?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm tin tức"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default NewsAddForm