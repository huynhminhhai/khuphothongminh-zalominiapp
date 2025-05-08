import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import { FormDataProfile, schemaProfile } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormAvatarUploaderSingle, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { useStoreApp } from "store/store"
import { useUpdateAccount } from "apiRequest/auth"
import { convertToFormData, loadImage } from "utils/file"

const defaultValues: FormDataProfile = {
    hoTen: '',
    fileAnhDaiDien: undefined,
    tenDangNhap: '',
    dienThoai: '',
    email: '',
    soGiayTo: ''
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

    const { mutateAsync: updateAccount, isPending } = useUpdateAccount();

    const onSubmit: SubmitHandler<FormDataProfile> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        if (account) {
            reset({
                hoTen: account.hoTen,
                tenDangNhap: account.tenDangNhap,
                dienThoai: account?.dienThoai || "",
                email: account?.email || "",
                soGiayTo: account?.soGiayTo || "",
                fileAnhDaiDien: undefined
            })

            const fetchAndSetImage = async () => {
                if (account?.anhDaiDien) {
                    const file = await loadImage(account.anhDaiDien);

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
    }, [account])

    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            const dataSubmit = {
                ...formData,
                nguoiDungId: account?.nguoiDungId,
            };

            const formDataConverted = convertToFormData(dataSubmit);

            await updateAccount(formDataConverted);

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
                        <FormAvatarUploaderSingle
                            name="fileAnhDaiDien"
                            label="Upload ảnh"
                            control={control}
                            error={errors.fileAnhDaiDien?.message}
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
                            disabled
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

                    <div className="col-span-12">
                        <FormInputField
                            name="dienThoai"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            control={control}
                            error={errors.dienThoai?.message}
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
                        <FormInputField
                            type="number"
                            name="soGiayTo"
                            label="Số định danh cá nhân"
                            placeholder="Nhập số định danh cá nhân"
                            control={control}
                            error={errors.soGiayTo?.message}
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
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