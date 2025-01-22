import React, { useEffect, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataTeamUpdate, schemaTeamUpdate } from "./type"
import { convertToValueLabel } from "utils/options"
import { RESIDENTIALGROUPDATA, TEAMDATA } from "constants/utinities"
import { useSearchParams } from "react-router-dom"

const defaultValues: FormDataTeamUpdate = {
    fullname: '',
    birthDate: '',
    phoneNumber: '',
    officeAddress: '',
    residential_group_id: 1,
    email: ''
}

const TeamUpdateForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTeamUpdate>({
        resolver: yupResolver(schemaTeamUpdate),
        defaultValues
    });

    const [searchParams] = useSearchParams();

    const staffId = searchParams.get("id");

    useEffect(() => {

        const fetchResidentData = async () => {
            setLoading(true);
            try {

                const data = TEAMDATA.find(resident => resident.id === Number(staffId))

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
    }, [staffId]);

    const onSubmit: SubmitHandler<FormDataTeamUpdate> = (data) => {

        const updatedData = {};

        let hasChanges = false;

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
            return;
        }

        setConfirmVisible(true);

        setFormData(updatedData)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            console.log('call api update with: ', formData);

            openSnackbar({
                icon: true,
                text: "Cập nhật thông tin nhân sự thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });

            reset(defaultValues);
            
            navigate('/news-management');
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
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật thông tin nhân sự"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin nhân sự này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TeamUpdateForm