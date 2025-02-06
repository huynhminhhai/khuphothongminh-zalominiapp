import React, { useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataProfile, schemaProfile } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormAvatarUploaderSingle, FormControllerDatePicker, FormImageUploaderSingle, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import images from "assets/images"
import { gender } from "constants/mock"

const defaultValues: FormDataProfile = {
    fullname: 'Huỳnh Minh Hải',
    phoneNumber: '0848551555',
    avatar: images.avatar
}

const ProfileForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataProfile>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataProfile>({
        resolver: yupResolver(schemaProfile),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataProfile> = (data) => {
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
                text: "Cập nhật thông tin tài khoản thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            // navigate('/news-management');
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
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
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