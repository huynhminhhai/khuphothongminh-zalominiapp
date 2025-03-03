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
import { useUpdateAccount } from "apiRequest/account"

const defaultValues: FormDataProfile = {
    fullname: '',
    phoneNumber: '',
    avatar: '',
    birthDate: ''
}

const ProfileForm: React.FC = () => {

    const { account, setAuth } = useStoreApp()

    console.log(account)

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataProfile>(defaultValues);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const { mutateAsync } = useUpdateAccount();

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
            reset(account)
            setFormData(account)
        }
    }, [account, setAuth])

    useEffect(() => {
        const formValues = watch();
        const isChanged = JSON.stringify(formData) !== JSON.stringify(formValues);
        setIsSubmitEnabled(isChanged);
    }, [formData, watch()]);

    const fetchApi = async () => {

        if (!account) { return; }

        try {
            setLoading(true);
            const fieldsToUpdate = Object.keys(formData).reduce((acc: any, key: string) => {
                if (formData[key] !== account[key]) {
                    acc[key] = formData[key];
                }
                return acc;
            }, {});

            if (Object.keys(fieldsToUpdate).length > 0) {
                await mutateAsync(fieldsToUpdate);  // Gửi các trường thay đổi
            }
        } catch (error) {
            console.error('Error:', error);
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
                        <FormAvatarUploaderSingle
                            name="avatar"
                            label="Upload ảnh"
                            control={control}
                            error={errors.avatar?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="fullname"
                            label="Họ tên"
                            placeholder="Nhập họ tên"
                            control={control}
                            error={errors.fullname?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="phoneNumber"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            control={control}
                            error={errors.phoneNumber?.message}
                            required
                            disabled
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="email"
                            label="Email"
                            placeholder="Nhập email"
                            control={control}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="birthDate"
                            label="Ngày sinh"
                            control={control}
                            placeholder="Chọn ngày sinh"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.birthDate?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="gender"
                            label="Giới tính"
                            placeholder="Chọn giới tính"
                            control={control}
                            options={gender}
                            error={errors.gender?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={loading || !isSubmitEnabled} fullWidth label={loading ? "Đang xử lý..." : "Cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
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