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
    residential_group_id: 0,
    email: '',
    term: {
        position: '',
        start_date: '',
        end_date: ''
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
                    {/* <div className="col-span-12">
                        <h3 className="text-[18px] font-semibold mb-3">Thông tin cơ bản</h3>
                    </div> */}
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
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm thành viên"} handleClick={handleSubmit(onSubmit)} />
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