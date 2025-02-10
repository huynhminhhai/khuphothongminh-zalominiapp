import React, { useEffect, useState } from "react";
import { Box, useNavigate, useSnackbar } from "zmp-ui";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from "components/button";
import { FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField } from "components/form";
import { gender, jobs, residentRealationships, residentStatus, residentType } from "constants/mock";
import FormControllerRadioGroup from "components/form/FormRadioGroup";
import { ConfirmModal } from "components/modal";
import { useSearchParams } from "react-router-dom";
import { RESIDENT } from "constants/utinities";
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

const ResidentEditForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState({})

    const { handleSubmit, reset, control, getValues, formState: { errors } } = useForm<FormDataResident>({
        resolver: yupResolver(schemaResident),
        defaultValues
    });

    const [searchParams] = useSearchParams();

    const residentId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchResidentData = async () => {
            setLoading(true);
            try {
                // Giả sử API trả về thông tin thành viên
                // const response = await fetch(`/api/residents/${residentId}`);
                // const data = await response.json();

                const data = RESIDENT.find(resident => resident.id === Number(residentId))

                if (data) {
                    setFormData(data)
                    reset(data)
                }

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin thành viên. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
    }, [residentId]);

    const onSubmit: SubmitHandler<FormDataResident> = (data) => {

        const updatedData = {};

        let hasChanges = false;

        // Duyệt qua tất cả các trường và so sánh với giá trị mặc định
        Object.keys(data).forEach((key) => {
            if (data[key] !== formData[key]) {
                updatedData[key] = data[key];
                hasChanges = true;
            }
        });

        if (!hasChanges) {
            openSnackbar({
                icon: true,
                text: "Không có thay đổi nào để cập nhật.",
                type: 'warning',
                duration: 3000,
            });
            return; // Không thực hiện tiếp tục gửi yêu cầu
        }

        setConfirmVisible(true);

        setFormData(updatedData)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm thành viên
            console.log('call api update with: ', formData);
            // Thành công
            openSnackbar({
                icon: true,
                text: "Yêu cầu cập nhật thông tin thành viên thành công",
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
            <form>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormSelectField
                            disabled={getValues().relationship === 0}
                            name="relationship"
                            label="Quan hệ với chủ hộ"
                            placeholder={getValues().relationship === 0 ? 'Chủ hộ' : "Chọn quan hệ với chủ hộ"}
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
                            disabled
                            name="address"
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
                            required
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
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Gửi yêu cầu cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </form>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi yêu cầu cập nhật thông tin thành viên này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ResidentEditForm;