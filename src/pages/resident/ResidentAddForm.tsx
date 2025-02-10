import React, { useState } from "react";
import { Box, useNavigate, useSnackbar } from "zmp-ui";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from "components/button";
import { FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField } from "components/form";
import { gender, jobs, residentRealationships, residentStatus, residentType } from "constants/mock";
import FormControllerRadioGroup from "components/form/FormRadioGroup";
import { ConfirmModal } from "components/modal";
import { FormDataResident, schemaResident } from "./type";

const defaultValues: FormDataResident = {
    fullname: '',
    phoneNumber: '',
    residenceType: 1,
    residenceStatus: 1,
    address: 'Thị trấn Bến Lức, Huyện Bến Lức, Tỉnh Long An',
    relationship: 0,
    birthDate: '',
    gender: 0,
    numberCard: '',
    dateCard: '',
    religion: '',
    nation: '',
    bhyt: '',
    job: 0
};

const ResidentAddForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataResident>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataResident>({
        resolver: yupResolver(schemaResident),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataResident> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm thành viên
            console.log('call api add with: ', { ...formData });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Yêu cầu thêm thành viên thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/resident-member');
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
                        <FormSelectField
                            name="relationship"
                            label="Quan hệ với chủ hộ"
                            placeholder="Chọn quan hệ với chủ hộ"
                            control={control}
                            options={residentRealationships}
                            error={errors.relationship?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="fullname"
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
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
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerRadioGroup
                            name="residenceType"
                            control={control}
                            label="Loại cư trú"
                            options={residentType}
                            required
                        />
                    </div>
                    <div className="col-span-12 flexCol">
                        <FormControllerRadioGroup
                            name="residenceStatus"
                            control={control}
                            label="Tình trạng"
                            options={residentStatus}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="address"
                            disabled
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            control={control}
                            error={errors.address?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
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
                    <div className="col-span-6">
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
                    <div className="col-span-6">
                        <FormInputField
                            type="number"
                            name="numberCard"
                            label="CCCD/Mã định danh"
                            placeholder="Nhập CCCD/Mã định danh"
                            control={control}
                            error={errors.numberCard?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerDatePicker
                            name="dateCard"
                            label="Ngày cấp"
                            control={control}
                            placeholder="Chọn ngày cấp"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.dateCard?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            name="religion"
                            label="Tôn giáo"
                            placeholder="Nhập tôn giáo"
                            control={control}
                            error={errors.religion?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            name="nation"
                            label="Dân tộc"
                            placeholder="Nhập dân tộc"
                            control={control}
                            error={errors.nation?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="job"
                            label="Nghề nghiệp"
                            placeholder="Chọn nghề nghiệp"
                            control={control}
                            options={jobs}
                            error={errors.job?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="bhyt"
                            label="Bảo hiểm y tế"
                            placeholder="Nhập mã bảo hiểm y tế"
                            control={control}
                            error={errors.bhyt?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Gửi yêu cầu thêm thành viên"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi yêu cầu thêm thành viên này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ResidentAddForm;