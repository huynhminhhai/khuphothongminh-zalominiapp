import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import { FormDataRegisterAp, schemaRegisterAp } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { useStoreApp } from "store/store"
import { useRegisterAp } from "apiRequest/auth"
import { setAddressWithoutPrefixStepByStep, useAddressSelectorWithoutPrefix } from "utils/useAddress"

const defaultValues: FormDataRegisterAp = {
    hoTen: '',
    maTinh: '80',
    maHuyen: '',
    maXa: '',
    apId: 0,
    dienThoai: '',
    soGiayTo: ''
}

const RegisterApForm: React.FC = () => {

    const { account, tinhs, setIsLoadingFullScreen } = useStoreApp()

    useEffect(() => {
        setIsLoadingFullScreen(true); 

        const timer = setTimeout(() => {
            setIsLoadingFullScreen(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const isRegisteredWithAnotherRole =
        account?.vaiTros.some((r) => r.tenVaiTro === "Registered Users") &&
        (account?.vaiTros.length ?? 0) > 1;

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataRegisterAp>(defaultValues);

    const { handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<FormDataRegisterAp>({
        resolver: yupResolver(schemaRegisterAp),
        defaultValues
    });

    const { mutateAsync: registerAp, isPending } = useRegisterAp();

    const registerApAddress = useAddressSelectorWithoutPrefix({
        tinhOptions: tinhs,
        watch,
        setValue,
    });

    const onSubmit: SubmitHandler<FormDataRegisterAp> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        if (account) {

            const {
                hoTen = "",
                tenDangNhap = "",
                soGiayTo = "",
                maXa = "",
                maHuyen = "",
                apId = 0,
                dienThoai
            } = account || {};

            reset({
                hoTen: hoTen,
                dienThoai: isRegisteredWithAnotherRole ? dienThoai : tenDangNhap,
                soGiayTo: soGiayTo,
                maXa: maXa,
                maHuyen: maHuyen,
                apId: apId,
            })

            setAddressWithoutPrefixStepByStep(
                { maTinh: '80', maHuyen, maXa, apId },
                setValue
            );
        }
    }, [account])

    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            const dataSubmit = {
                ...formData,
                nguoiDungId: account?.nguoiDungId,
            };

            await registerAp(dataSubmit);

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
                            required
                            disabled={!isRegisteredWithAnotherRole}
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

                    <div className="col-span-12">
                        <FormSelectField
                            name="maHuyen"
                            label="Quận/Huyện"
                            placeholder="Chọn quận/huyện"
                            control={control}
                            options={registerApAddress.huyenOptions}
                            error={errors.maHuyen?.message}
                            required
                            disabled={isRegisteredWithAnotherRole}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="maXa"
                            label="Phường/Xã"
                            placeholder="Chọn phường/xã"
                            control={control}
                            options={registerApAddress.xaOptions}
                            error={errors.maXa?.message}
                            required
                            disabled={!registerApAddress.watchedHuyen || isRegisteredWithAnotherRole}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormSelectField
                            name="apId"
                            label="Ấp"
                            placeholder="Chọn ấp"
                            control={control}
                            options={registerApAddress.apOptions}
                            error={errors.apId?.message}
                            required
                            disabled={!registerApAddress.watchedXa || isRegisteredWithAnotherRole}
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

export default RegisterApForm