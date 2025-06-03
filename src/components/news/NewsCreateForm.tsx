import React, { useState } from "react"
import { Box } from "zmp-ui"
import { FormDataNews, schemaNews } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { useStoreApp } from "store/store"
import { useCreateNews } from "apiRequest/news"
import { convertToFormData } from "utils/file"

const defaultValues: FormDataNews = {
    tieuDe: "",
    moTa: "",
    noiDung: "",
    tacGia: "",
    fileAnhDaiDien: undefined,
    ngayXuatBan: new Date().toISOString().split("T")[0]
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
        if (formData && account) {
            try {
                const dataSubmit = { ...formData, apId: account?.apId, nguoiTao: account?.nguoiDungId, maXa: account?.maXa }
    
                const formDataConverted = convertToFormData(dataSubmit);
    
                await createNews(formDataConverted);
                
                reset(defaultValues);
            } catch (error) {
                console.error("Error:", error);
            }
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
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Thêm thông tin cần biết"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm thông tin cần biết này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default NewsAddForm