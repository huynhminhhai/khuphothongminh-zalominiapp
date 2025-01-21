import React, { useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploaderSingle, FormInputAreaField, FormInputField, FormSelectField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataTeam, schemaTeam } from "./type"
import { convertToValueLabel } from "utils/options"
import { RESIDENTIALGROUPDATA } from "constants/utinities"

const defaultValues: FormDataTeam = {
    fullname: '',
    birthDate: '',
    phoneNumber: '',
    officeAddress: '',
    residential_group_id: 1,
    email: '',
    term: {
        position: '',
        startDate: '',
        endDate: ''
    }
}

const TeamAddForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTeam>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTeam>({
        resolver: yupResolver(schemaTeam),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataTeam> = (data) => {
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
                text: "Thêm nhân sự thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/team-management');
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
                        <h3 className="text-[18px] font-semibold mb-3">Thông tin cơ bản</h3>
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
                        <FormInputField
                            name="phoneNumber"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            control={control}
                            error={errors.phoneNumber?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="email"
                            label="Email (nếu có)"
                            placeholder="Nhập email"
                            control={control}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="officeAddress"
                            label="Nơi công tác"
                            placeholder="Nhập công tác"
                            control={control}
                            error={errors.officeAddress?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="residential_group_id"
                            label="Thuộc tổ cư dân"
                            placeholder="Chọn tổ cư dân"
                            control={control}
                            options={convertToValueLabel(RESIDENTIALGROUPDATA)}
                            error={errors.residential_group_id?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <h3 className="text-[18px] font-semibold mb-3 mt-2">Thông tin nhiệm kỳ</h3>
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="term.position"
                            label="Chức vụ"
                            placeholder="Nhập tên chức vụ"
                            control={control}
                            error={errors.term?.position?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="term.startDate"
                            label="Ngày bắt đầu"
                            control={control}
                            placeholder="Chọn ngày bắt đầu"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.term?.startDate?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="term.endDate"
                            label="Ngày kết thúc"
                            control={control}
                            placeholder="Chọn ngày kết thúc"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.term?.endDate?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm nhân sự"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm nhân sự này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TeamAddForm