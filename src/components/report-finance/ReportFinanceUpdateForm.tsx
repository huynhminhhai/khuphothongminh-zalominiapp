import React, { useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataReportFinance, schemaReportFinance } from "./type"

const defaultValues: FormDataReportFinance = {
    title: '',
    startDate: '',
    endDate: '',
    totalIncome: 0,
    totalExpense: 0,
    remainingBalance: 0
}

const ReportFinanceUpdateForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataReportFinance>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataReportFinance>({
        resolver: yupResolver(schemaReportFinance),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataReportFinance> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            console.log('call api add with: ', { ...formData });
            // Thành công
            openSnackbar({
                icon: true,
                text: "Tạo báo cáo thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/report-finance-management');
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
                            name="startDate"
                            label="Ngày bắt đầu"
                            placeholder="Chọn ngày bắt đầu"
                            control={control}
                            required={true}
                            error={errors.startDate?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="endDate"
                            label="Ngày kết thúc"
                            placeholder="Chọn ngày kết thúc"
                            control={control}
                            required={true}
                            error={errors.endDate?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="totalIncome"
                            label="Tổng thu"
                            placeholder="Nhập số tiền tổng thu"
                            control={control}
                            error={errors.totalIncome?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="totalExpense"
                            label="Tổng chi"
                            placeholder="Nhập số tiền tổng chi"
                            control={control}
                            error={errors.totalExpense?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="remainingBalance"
                            label="Số tiền quỹ còn lại"
                            placeholder="Nhập số tiền quỹ còn lại"
                            control={control}
                            error={errors.remainingBalance?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormTextEditorField
                            name="description"
                            label="Nội dung báo cáo"
                            placeholder="Nhập nội dung báo cáo..."
                            control={control}
                            error={errors.description?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Tạo báo cáo"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn tạo báo cáo này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ReportFinanceUpdateForm