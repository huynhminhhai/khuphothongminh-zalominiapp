import React, { useMemo, useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataInsurance, schemaInsurance } from "./type"
import { useCreateInsurance } from "apiRequest/insurance"
import { useSearchParams } from "react-router-dom"

const defaultValues: FormDataInsurance = {
    loaiBaoHiemId: 1,
    noiDangKy: '',
    tuNgay: '',
    denNgay: '',
    maSo: '',
}

const InsuranceManagementAddForm: React.FC = () => {

    const navigator = useNavigate()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataInsurance>(defaultValues)

    const { handleSubmit, control, formState: { errors } } = useForm<FormDataInsurance>({
        resolver: yupResolver(schemaInsurance),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const danCuId = searchParams.get("danCuId");

    const { mutateAsync: createInsurance, isPending } = useCreateInsurance();


    const onSubmit: SubmitHandler<FormDataInsurance> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                await createInsurance({ ...formData, danCuId: Number(danCuId) });

                navigator('/insurance-management')
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
                            name="maSo"
                            label="Mã số BHYT"
                            placeholder="Nhập mã số BHYT"
                            control={control}
                            error={errors.maSo?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="tuNgay"
                            label="Ngày bắt đầu"
                            placeholder="Chọn ngày bắt đầu"
                            control={control}
                            required={true}
                            error={errors.tuNgay?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="denNgay"
                            label="Ngày hết hiệu lực"
                            placeholder="Chọn ngày hết hiệu lực"
                            control={control}
                            required={true}
                            error={errors.denNgay?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="noiDangKy"
                            label="Nơi đăng ký"
                            placeholder="Nhập nơi đăng ký"
                            control={control}
                            error={errors.noiDangKy?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Thêm thẻ BHYT"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm thẻ BHYT này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default InsuranceManagementAddForm