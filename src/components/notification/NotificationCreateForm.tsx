import React, { useState } from "react"
import { Box } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormInputAreaField, FormInputField } from "components/form"
import { ConfirmModal } from "components/modal"
import { useStoreApp } from "store/store"
import { FormDataNotification, schemaNotification } from "./type"
import { useCreateNotification } from "apiRequest/notification"

const defaultValues: FormDataNotification = {
    tieuDe: '',
    noiDung: ''
}

const NotificationAddForm: React.FC = () => {

    const { account } = useStoreApp()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataNotification>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNotification>({
        resolver: yupResolver(schemaNotification),
        defaultValues
    });

    const { mutateAsync: createNotification, isPending } = useCreateNotification();

    const onSubmit: SubmitHandler<FormDataNotification> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {

                const dataSubmit = { ...formData, apId: account?.apId, nguoiTao: account?.nguoiDungId, maXa: account?.maXa }

                await createNotification(dataSubmit);

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
                        <FormInputAreaField
                            name="noiDung"
                            label="Nội dung"
                            placeholder="Nhập nội dung"
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Thêm thông báo"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm thông báo này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default NotificationAddForm