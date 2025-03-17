import { yupResolver } from "@hookform/resolvers/yup"
import { useUpdateNews } from "apiRequest/management/news"
import { useGetNewsDetail } from "apiRequest/news"
import { PrimaryButton } from "components/button"
import { FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataNews, schemaNews } from "components/news/type"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { Box, useNavigate, useSnackbar } from "zmp-ui"

const defaultValues: FormDataNews = {
    title: '',
    description: '',
    content: '',
    imageUrl: '',
}

const NewsUpdateForm = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNews>({
        resolver: yupResolver(schemaNews),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const newsId = searchParams.get("id");

    const { mutate: updateNews, isPending } = useUpdateNews();
    const { data: newsDetail } = useGetNewsDetail(Number(newsId));

    useEffect(() => {
        if (newsDetail) {
            reset(newsDetail);
        }
    }, [newsDetail, reset]);

    const onSubmit: SubmitHandler<FormDataNews> = (data) => {

        const updatedData = {};

        let hasChanges = false;

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
            return;
        }

        setConfirmVisible(true);

        setFormData(updatedData)
    };

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData && newsId) {
            updateNews({ id: Number(newsId), data: formData }, {
                onSuccess: () => {
                    reset(defaultValues);
                    navigate("/news-management");
                },
            });
        }
    };

    const handleCancel = () => {
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
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật tin tức"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default NewsUpdateForm