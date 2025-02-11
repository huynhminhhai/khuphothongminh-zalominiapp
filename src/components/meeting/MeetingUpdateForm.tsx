import { yupResolver } from "@hookform/resolvers/yup"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormControllerTimePicker, FormInputAreaField, FormInputField, FormSelectField, FormSelectMultipleField } from "components/form"
import { ConfirmModal } from "components/modal"
import { MEETINGDATA, RESIDENTOPTION, STAFFOPTION } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataMeeting, schemaMeeting } from "./type"

const defaultValues: FormDataMeeting = {
    title: '',
    description: '',
    meetingDate: '',
    startTime: '',
    endTime: '',
    address: '',
    linkOnl: '',
    resident: undefined,
    staff: []
}

const MeetingUpdateForm = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataMeeting>({
        resolver: yupResolver(schemaMeeting),
        defaultValues
    });

    const [searchParams] = useSearchParams();

    const meetingId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchResidentData = async () => {
            setLoading(true);
            try {

                const data = MEETINGDATA.find(resident => resident.id === Number(meetingId))

                if (data) {
                    setFormData(data)

                    reset(data)
                }

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
    }, [meetingId]);

    const onSubmit: SubmitHandler<FormDataMeeting> = (data) => {

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
                text: "Cập nhật thông tin cuộc họp thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/meeting-management');
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
                        <FormInputField
                            name="title"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.title?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="meetingDate"
                            label="Ngày họp"
                            control={control}
                            placeholder="Chọn ngày họp"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.meetingDate?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerTimePicker
                            name="startTime"
                            label="Thời gian bắt đầu"
                            placeholder="Chọn thời gian họp"
                            control={control}
                            required={true}
                            error={errors.startTime?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerTimePicker
                            name="endTime"
                            label="Thời gian kết thúc"
                            placeholder="Chọn thời gian họp"
                            control={control}
                            required={true}
                            error={errors.endTime?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="address"
                            label="Địa điểm"
                            placeholder="Nhập địa điểm"
                            control={control}
                            error={errors.address?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="linkOnl"
                            label="Link họp online (nếu có)"
                            placeholder="Nhập địa điểm"
                            control={control}
                            error={errors.linkOnl?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="resident"
                            label="Người dân"
                            placeholder="Chọn người dân"
                            control={control}
                            options={RESIDENTOPTION}
                            error={errors.resident?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectMultipleField
                            name="staff"
                            label="Cán bộ"
                            placeholder="Chọn cán bộ"
                            control={control}
                            options={STAFFOPTION}
                            error={errors.staff?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="description"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            control={control}
                            error={errors.description?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default MeetingUpdateForm