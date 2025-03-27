import React, { useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataNews, schemaNews } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { useStoreApp } from "store/store"
import { useCreateNews } from "apiRequest/news"
import { convertToFormData } from "utils/file"

const defaultValues: FormDataNews = {
    TieuDe: "",
    MoTa: "",
    NoiDung: "",
    TacGia: "",
    FileAnhDaiDien: undefined,
};

const NewsAddForm: React.FC = () => {
    
    const { account } = useStoreApp()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataNews>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNews>({
        resolver: yupResolver(schemaNews),
        defaultValues
    });

    const { mutateAsync: createNews, isPending } = useCreateNews();

    const onSubmit: SubmitHandler<FormDataNews> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);

        try {
            const formDataConverted = convertToFormData({...formData, ApId: account?.apId, TinhTrangId: 1 });

            await createNews(formDataConverted);
            reset(defaultValues);
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
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Thêm tin tức"} handleClick={handleSubmit(onSubmit)} />
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