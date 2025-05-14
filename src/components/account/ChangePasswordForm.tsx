import React, { useEffect, useState } from "react"
import { Box, Button } from "zmp-ui"
import { FormDataChangePassword, schemaChangePassword } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormInputField } from "components/form"
import { Icon } from "@iconify/react"
import { useChangePassword } from "apiRequest/auth"
import { useStoreApp } from "store/store"
import { ConfirmModal } from "components/modal"
import { convertToFormData, loadImage } from "utils/file"

const defaultValues: FormDataChangePassword = {
    matKhauMoi: '',
    matKhau: '',
    matKhauMoiLapLai: ''
}

const ChangePasswordForm: React.FC = () => {

    const { account } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataChangePassword>(defaultValues)
    const [isHidePw, setIsHidePw] = useState<boolean>(true)
    const [isHideOPw, setIsHideOPw] = useState<boolean>(true)
    const [isHideCPw, setIsHideCPw] = useState<boolean>(true)

    const { handleSubmit, control, reset, formState: { errors } } = useForm<FormDataChangePassword>({
        resolver: yupResolver(schemaChangePassword),
        defaultValues
    });

    const { mutateAsync: changePassword, isPending } = useChangePassword();

    useEffect(() => {
        if (account) {
            reset({
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

    const onSubmit: SubmitHandler<FormDataChangePassword> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };


    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            const dataSubmit = {
                ...formData,
                nguoiDungId: account?.nguoiDungId,
                hoTen: account?.hoTen
            };

            const formDataConverted = convertToFormData(dataSubmit);

            await changePassword(formDataConverted);

            reset(defaultValues);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };


    return (
        <Box px={4} pb={4} className="login-form">
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="var(--primary-color)" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="matKhau"
                            type={isHideOPw ? 'password' : 'text'}
                            label=""
                            placeholder="Mật khẩu cũ"
                            control={control}
                            error={errors.matKhau?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHideOPw(!isHideOPw)}>

                            {
                                isHideOPw ? <Icon fontSize={20} color="var(--primary-color)" icon='mdi:eye-off' /> : <Icon fontSize={20} color="var(--primary-color)" icon='mdi:eye' />
                            }
                        </div>
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="var(--primary-color)" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="matKhauMoi"
                            type={isHidePw ? 'password' : 'text'}
                            label=""
                            placeholder="Mật khẩu mới"
                            control={control}
                            error={errors.matKhauMoi?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHidePw(!isHidePw)}>

                            {
                                isHidePw ? <Icon fontSize={20} color="var(--primary-color)" icon='mdi:eye-off' /> : <Icon fontSize={20} color="var(--primary-color)" icon='mdi:eye' />
                            }
                        </div>
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="var(--primary-color)" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="matKhauMoiLapLai"
                            type={isHideCPw ? 'password' : 'text'}
                            label=""
                            placeholder="Xác nhận mật khẩu mới"
                            control={control}
                            error={errors.matKhauMoiLapLai?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHideCPw(!isHideCPw)}>

                            {
                                isHideCPw ? <Icon fontSize={20} color="var(--primary-color)" icon='mdi:eye-off' /> : <Icon fontSize={20} color="var(--primary-color)" icon='mdi:eye' />
                            }
                        </div>
                    </div>
                    <div className="col-span-12 relative mt-[40px]">
                        <Button fullWidth onClick={handleSubmit(onSubmit)} disabled={isPending}>
                            {isPending ? "Đang xử lý..." : "Đổi mật khẩu"}
                        </Button>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật mật khẩu không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ChangePasswordForm