import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import { FormDataProfile, schemaProfile } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormAvatarUploaderSingle, FormControllerDatePicker, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { gender } from "constants/mock"
import { useStoreApp } from "store/store"

const defaultValues: FormDataProfile = {
    hoTen: '',
    anhDaiDien: '',
    tenDangNhap: ''
}

const ProfileForm: React.FC = () => {

    const { account } = useStoreApp()

    console.log(account)

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataProfile>(defaultValues);

    const { handleSubmit, reset, watch, control, formState: { errors } } = useForm<FormDataProfile>({
        resolver: yupResolver(schemaProfile),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataProfile> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        if (account) {
            reset({
                hoTen: account.hoTen,
                anhDaiDien: account.anhDaiDien,
                tenDangNhap: account.tenDangNhap
            })
        }
    }, [account])

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                console.log('call api here')
            } catch (error) {

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
                        <FormAvatarUploaderSingle
                            name="anhDaiDien"
                            label="Upload ảnh"
                            control={control}
                            error={errors.anhDaiDien?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="tenDangNhap"
                            label="Tên đăng nhập"
                            placeholder="Nhập tên đăng nhập"
                            control={control}
                            error={errors.tenDangNhap?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="hoTen"
                            label="Họ tên"
                            placeholder="Nhập họ tên"
                            control={control}
                            error={errors.hoTen?.message}
                            required
                        />
                    </div>

                    {/* <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={loading || !isSubmitEnabled} fullWidth label={loading ? "Đang xử lý..." : "Cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div> */}
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin tài khoản không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ProfileForm