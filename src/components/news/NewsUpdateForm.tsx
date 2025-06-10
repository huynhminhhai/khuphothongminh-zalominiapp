import { yupResolver } from "@hookform/resolvers/yup"
import { useGetNewsDetail, useUpdateNews } from "apiRequest/news"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataNews, schemaNews } from "components/news/type"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { useStoreApp } from "store/store"
import { convertToFormData, loadImage } from "utils/file"
import { Box } from "zmp-ui"

const defaultValues: FormDataNews = {
    tieuDe: "",
    moTa: "",
    noiDung: "",
    tacGia: "",
    fileAnhDaiDien: undefined,
    ngayXuatBan: new Date().toISOString().split("T")[0]
};

const NewsUpdateForm = () => {

    const { setIsLoadingFullScreen } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNews>({
        resolver: yupResolver(schemaNews),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const newsId = searchParams.get("id");

    const { mutateAsync: updateNews, isPending } = useUpdateNews();
    const { data: newsDetail, isLoading } = useGetNewsDetail(Number(newsId));

    useEffect(() => {
        if (newsDetail) {
            reset({
                ...newsDetail,
                tieuDe: newsDetail.tieuDe,
                moTa: newsDetail.moTa,
                noiDung: newsDetail.noiDung,
                tacGia: newsDetail.tacGia,
                ngayXuatBan: newsDetail.ngayXuatBan,
                fileAnhDaiDien: undefined,
            });

            const fetchAndSetImage = async () => {
                if (newsDetail?.anhDaiDien) {
                    const file = await loadImage(newsDetail.anhDaiDien);

                    if (file) {
                        reset((prevValues) => ({
                            ...prevValues,
                            fileAnhDaiDien: file,
                        }));
                    }
                }
            };

            fetchAndSetImage();
        }
    }, [newsDetail, reset]);

    useEffect(() => {
        setIsLoadingFullScreen((isLoading))
    }, [isLoading])

    const onSubmit: SubmitHandler<FormDataNews> = (data) => {

        setConfirmVisible(true);

        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);

        try {
            const dataSubmit = {...formData}

            const formDataConverted = convertToFormData(dataSubmit);

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
                            name="tieuDe"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.tieuDe?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormImageUploaderSingle
                            name="fileAnhDaiDien"
                            label="Upload ảnh đại diện"
                            control={control}
                            error={errors.fileAnhDaiDien?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="moTa"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            control={control}
                            error={errors.moTa?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormTextEditorField
                            name="noiDung"
                            label="Nội dung"
                            placeholder="Nhập nội dung..."
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="ngayXuatBan"
                            label="Ngày xuất bản"
                            placeholder="Chọn ngày xuất bản"
                            control={control}
                            required={true}
                            error={errors.ngayXuatBan?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="tacGia"
                            label="Tác giả"
                            placeholder="Nhập tên tác giả"
                            control={control}
                            error={errors.tacGia?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật bản tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật bản tin Khu phố/Ấp này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default NewsUpdateForm