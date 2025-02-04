import React, { useEffect, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploaderSingle, FormInputAreaField, FormInputField, FormSelectField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataTranscations, schemaTransactions } from "./type"
import { transactionsOptions } from "constants/mock"
import { useSearchParams } from "react-router-dom"
import { TRANSACTIONSDATA } from "constants/utinities"

const defaultValues: FormDataTranscations = {
    transaction_type: 0,
    description: '',
    category: '',
    transaction_date: '',
    amount: 0
}

const TransactionsUpdateForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTranscations>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTranscations>({
        resolver: yupResolver(schemaTransactions),
        defaultValues
    });

    const [searchParams] = useSearchParams();

    const transactionsId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchTaskData = async () => {
            setLoading(true);
            try {
                const data = TRANSACTIONSDATA.find(transactions => transactions.id === Number(transactionsId))

                if (data) {
                    setFormData(data)
                    reset(data)
                }

            } catch (error) {
                console.error("Failed to fetch transactions data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTaskData();
    }, [transactionsId]);

    const onSubmit: SubmitHandler<FormDataTranscations> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm thành viên
            console.log('call api update with: ', formData);
            // Thành công
            openSnackbar({
                icon: true,
                text: "Cập nhật thông tin khoản thu/chi thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/transactions-management');
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
                            name="transaction_type"
                            label="Loại giao dịch"
                            placeholder="Chọn loại giao dịch"
                            control={control}
                            options={transactionsOptions}
                            error={errors.transaction_type?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="category"
                            label="Loại khoản thu/chi"
                            placeholder="VD: Phí lắp đèn đường"
                            control={control}
                            error={errors.category?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="amount"
                            label="Số tiền"
                            placeholder="Nhập số tiền"
                            control={control}
                            error={errors.amount?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="transaction_date"
                            label="Ngày thu/chi"
                            placeholder="Chọn ngày thu/chi"
                            control={control}
                            required={true}
                            error={errors.transaction_date?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormTextEditorField
                            name="description"
                            label="Nội dung giao dịch"
                            placeholder="Nhập nội dung giao dịch..."
                            control={control}
                            error={errors.description?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm khoản thu/chi"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin khoản thu/chi này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TransactionsUpdateForm