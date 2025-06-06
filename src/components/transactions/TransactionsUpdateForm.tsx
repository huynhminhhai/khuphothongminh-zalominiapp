import React, { useEffect, useMemo, useState } from "react"
import { Box } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField, FormSwitchField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataTranscations, schemaTransactions } from "./type"
import { useSearchParams } from "react-router-dom"
import { useGetTransactionDetail, useGetTransactionType, useUpdateTransaction } from "apiRequest/transaction"
import { useStoreApp } from "store/store"

const defaultValues: FormDataTranscations = {
    noiDung: '',
    soTien: 0,
    congKhai: false,
    hoatDong: true,
    loaiGiaoDichTaiChinhId: 0,
    ngayGiaoDich: '',
}
const TransactionsUpdateForm: React.FC = () => {

    const { setIsLoadingFullScreen } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTranscations>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTranscations>({
        resolver: yupResolver(schemaTransactions),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const transactionsId = searchParams.get("id");

    const { mutateAsync: updateTransaction, isPending } = useUpdateTransaction();
    const { data: transactionDetail, isLoading } = useGetTransactionDetail(Number(transactionsId));
    const { data: transactionType } = useGetTransactionType();

    useEffect(() => {
        setIsLoadingFullScreen((isLoading))
    }, [isLoading])

    const transactionTypeOpton = useMemo(() => {
        return transactionType?.map((item) => ({
            value: item.loaiGiaoDichTaiChinhId,
            label: item.tenLoaiGiaoDichTaiChinh
        })) || [];
    }, [transactionType]);

    useEffect(() => {
        if (transactionDetail) {

            reset({ ...transactionDetail })

        }
    }, [transactionDetail, reset])

    const onSubmit: SubmitHandler<FormDataTranscations> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                await updateTransaction(formData);
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
                        <FormSelectField
                            name="loaiGiaoDichTaiChinhId"
                            label="Loại giao dịch"
                            placeholder="Chọn loại giao dịch"
                            control={control}
                            options={transactionTypeOpton}
                            error={errors.loaiGiaoDichTaiChinhId?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="noiDung"
                            label="Nội dung giao dịch"
                            placeholder="VD: Phí lắp đèn đường"
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="soTien"
                            label="Số tiền"
                            placeholder="Nhập số tiền"
                            control={control}
                            error={errors.soTien?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="ngayGiaoDich"
                            label="Ngày thu/chi"
                            placeholder="Chọn ngày thu/chi"
                            control={control}
                            required={true}
                            error={errors.ngayGiaoDich?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSwitchField
                            name="congKhai"
                            label="Công khai"
                            control={control}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật khoản thu/chi"} handleClick={handleSubmit(onSubmit)} />
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