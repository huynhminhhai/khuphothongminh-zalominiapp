import { yupResolver } from "@hookform/resolvers/yup"
import { useGetNewsDetail, useUpdateNews } from "apiRequest/news"
import { PrimaryButton } from "components/button"
import { FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataNews, schemaNews } from "components/news/type"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { convertToFormData, loadImage } from "utils/file"
import { Box, useSnackbar } from "zmp-ui"

const defaultValues: FormDataNews = {
    TieuDe: "",
    MoTa: "",
    NoiDung: "",
    TacGia: "",
    FileAnhDaiDien: undefined,
};

const NewsUpdateForm = () => {

    const { openSnackbar } = useSnackbar();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNews>({
        resolver: yupResolver(schemaNews),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const newsId = searchParams.get("id");

    const { mutateAsync: updateNews, isPending } = useUpdateNews();
    const { data: newsDetail } = useGetNewsDetail(Number(newsId));

    useEffect(() => {
        if (newsDetail) {
            reset({
                TieuDe: newsDetail.tieuDe,
                MoTa: newsDetail.moTa,
                NoiDung: newsDetail.noiDung,
                TacGia: newsDetail.tacGia,
                FileAnhDaiDien: undefined,
            });

            const fetchAndSetImage = async () => {
                if (newsDetail?.anhDaiDien) {
                    const file = await loadImage(newsDetail.anhDaiDien);
                    if (file) {
                        reset((prevValues) => ({
                            ...prevValues,
                            FileAnhDaiDien: file,
                        }));
                    }
                }
            };

            fetchAndSetImage();
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

    const handleConfirm = async () => {
        setConfirmVisible(false);

        try {
            const formDataConverted = convertToFormData({ ...formData, TinTucId: newsId, });

            await updateNews(formDataConverted);

        } catch (error) {
            console.error("Error:", error);
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
                            name="TieuDe"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.TieuDe?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormImageUploaderSingle
                            name="FileAnhDaiDien"
                            label="Upload ảnh đại diện"
                            control={control}
                            error={errors.FileAnhDaiDien?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="MoTa"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            control={control}
                            error={errors.MoTa?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormTextEditorField
                            name="NoiDung"
                            label="Nội dung tin tức"
                            placeholder="Nhập nội dung tin tức..."
                            control={control}
                            error={errors.NoiDung?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="TacGia"
                            label="Tác giả"
                            placeholder="Nhập tên tác giả"
                            control={control}
                            error={errors.TacGia?.message}
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