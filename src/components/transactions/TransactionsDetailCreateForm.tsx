import React, { useMemo, useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataTranscationsDetail, schemaTransactionsDetail } from "./type"
import { useStoreApp } from "store/store"
import { useCreateTransactionDetail, useGetTransactionDetail } from "apiRequest/transaction"
import { useSearchParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useGetChuHosList } from "apiRequest/resident"
import { useGetUserList } from "apiRequest/user"

const defaultValues: FormDataTranscationsDetail = {
    nguoiGiaoDichId: 0,
    soTien: 0,
    ngayGiaoDich: '',
    ghiChu: '',
    nguoiGiaoDichKhac: ''
}

const TransactionsDetailCreateForm: React.FC = () => {

    const { account } = useStoreApp()
    const navigator = useNavigate()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTranscationsDetail>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataTranscationsDetail>({
        resolver: yupResolver(schemaTransactionsDetail),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const transactionsId = searchParams.get("thuChiId");

    const { data: detailData, isLoading: isLoadingDetail } = useGetTransactionDetail(Number(transactionsId));
    const { data: userList } = useGetUserList();
    const { mutateAsync: createTransactionDetail, isPending } = useCreateTransactionDetail();
    const { data: chuHos } = useGetChuHosList();

    const houseHoldOptions = useMemo(() => {
        return chuHos?.map((item) => ({
            value: item.danCuId,
            label: item.hoTen
        })) || [];
    }, [chuHos]);

    const userListOptions = useMemo(() => {
        return userList?.map((item) => ({
            value: item.nguoiDungId,
            label: item.hoTen
        })) || [];
    }, [chuHos]);

    const onSubmit: SubmitHandler<FormDataTranscationsDetail> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {

                await createTransactionDetail({ ...formData, thuChiId: Number(transactionsId) });

                reset(defaultValues);

                navigator(`/transactions-detail-management?id=${transactionsId}`);
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
                        <Box mb={4}>
                            <div className="text-[14px] font-medium flex items-center gap-1 mb-1">
                                <span>
                                    - Nội dung: 
                                </span>
                                {
                                    isLoadingDetail ? <Icon icon='line-md:loading-twotone-loop' /> : detailData?.noiDung
                                }
                            </div>
                            <div className="text-[14px] font-medium flex items-center gap-1">
                                <span>
                                    - Loại: 
                                </span>
                                {
                                    isLoadingDetail ? <Icon icon='line-md:loading-twotone-loop' /> : detailData?.tenLoaiGiaoDichTaiChinh
                                }
                            </div>
                        </Box>
                    </div>
                    {
                        detailData?.tenLoaiGiaoDichTaiChinh === "Thu" ?
                            <div className="col-span-12">
                                <FormSelectField
                                    name="nguoiGiaoDichId"
                                    label="Người nộp tiền"
                                    placeholder="Chọn người nộp tiền"
                                    control={control}
                                    options={houseHoldOptions}
                                    error={errors.nguoiGiaoDichId?.message}
                                    required
                                />
                            </div> :
                            <div className="col-span-12">
                                <FormSelectField
                                    name="nguoiGiaoDichId"
                                    label="Người chi tiền"
                                    placeholder="Chọn người chi tiền"
                                    control={control}
                                    options={userListOptions}
                                    error={errors.nguoiGiaoDichId?.message}
                                    required
                                />
                            </div>
                    }
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
                            label="Ngày thực hiện"
                            placeholder="Chọn ngày thực hiện"
                            control={control}
                            required={true}
                            error={errors.ngayGiaoDich?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="ghiChu"
                            label="Ghi chú"
                            placeholder="Nhập ghi chú"
                            control={control}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Thêm chi tiết khoản thu/chi"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm khoản thu/chi này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TransactionsDetailCreateForm