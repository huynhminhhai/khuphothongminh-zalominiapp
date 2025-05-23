import React, { useEffect, useState } from "react"
import { Box, Button } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormControllerDatePicker, FormInputAreaField, FormInputField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataHouseHold, schemaTransactions } from "./type"
import { useSearchParams } from "react-router-dom"
import { useGetResidentDetail } from "apiRequest/resident"
import { Icon } from "@iconify/react"
import { useCreateHouseholdInfo, useDeleteHouseholdInfo, useGetHouseholdDetailInfo, useUpdateHouseholdInfo } from "apiRequest/household"
import { useStoreApp } from "store/store"

const defaultValues: FormDataHouseHold = {
    soHieu: "",
    coQuanBanHanh: "",
    tuNgay: new Date().toISOString().slice(0, 10) + ' 00:00:00',
    denNgay: "",
    trichYeu: "",
}
const HouseholdHoNgheoUpdateForm: React.FC = () => {

    const { setIsLoadingFullScreen } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
    const [formData, setFormData] = useState<FormDataHouseHold>(defaultValues)
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataHouseHold>({
        resolver: yupResolver(schemaTransactions),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const danCuId = searchParams.get("danCuId");
    const loai = searchParams.get("loai");

    const { data: residentDetail, isLoading: isLoadingDetail } = useGetResidentDetail(Number(danCuId));
    const { data: householdDetail, isLoading } = useGetHouseholdDetailInfo(Number(danCuId), Number(loai));

    const { mutateAsync: createHouseholdInfo, isPending: isPendingCreate } = useCreateHouseholdInfo();
    const { mutateAsync: updateHouseholdInfo, isPending: isPendingUpdate } = useUpdateHouseholdInfo();
    const { mutate: deleteHouseholdInfo } = useDeleteHouseholdInfo();


    useEffect(() => {
        if (householdDetail) {

            reset({ ...householdDetail })

        }
    }, [householdDetail, reset])

    useEffect(() => {
        setIsLoadingFullScreen((isLoading))
    }, [isLoading])

    const onSubmit: SubmitHandler<FormDataHouseHold> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
        handleUpdate(data);
    };

    const handleUpdate = async (data: any) => {
        if (data) {
            try {

                if (householdDetail) {

                    const dataSubmit = {
                        ...data
                    }

                    console.log(dataSubmit)

                    openConfirmModal(async () => {
                        await updateHouseholdInfo(dataSubmit);
                    }, 'Xác nhận cập nhật', 'Bạn có chắc chắn muốn cập nhật thông tin này?');
                } else {

                    const extraFields =
                        Number(loai) === 1
                            ? { giaDinhVanHoa: false, hoCanNgheo: false, hoNgheo: true }
                            : Number(loai) === 2
                                ? { giaDinhVanHoa: false, hoCanNgheo: true, hoNgheo: false }
                                : Number(loai) === 3
                                    ? { giaDinhVanHoa: true, hoCanNgheo: false, hoNgheo: false }
                                    : {};

                    const dataSubmit = {
                        ...data,
                        ...extraFields,
                        danCuId: Number(danCuId)
                    }

                    openConfirmModal(async () => {
                        await createHouseholdInfo(dataSubmit);
                    }, 'Xác nhận thêm', 'Bạn có chắc chắn muốn thêm thông tin này?');

                }

            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const openConfirmModal = (action: () => void, title: string, message: string) => {
        setConfirmAction(() => action);
        setModalContent({ title, message });
        setConfirmVisible(true);
    };

    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
            setConfirmVisible(false);
            setConfirmAction(null);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
        setConfirmAction(null);
    };

    const removeInfo = (id: number) => {
        openConfirmModal(async () => {
            await deleteHouseholdInfo(id);
        }, 'Xác nhận xóa', 'Bạn có chắc chắn muốn xóa thông tin này?');
    }

    return (
        <Box p={4}>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center gap-2 text-[15px] font-medium text-gray-800">
                                <span className="text-gray-600">Chủ hộ:</span>
                                {isLoadingDetail ? (
                                    <div className="flex items-center gap-1 text-gray-500" role="status" aria-label="Đang tải thông tin chủ hộ">
                                        <Icon icon="line-md:loading-twotone-loop" fontSize={16} className="text-gray-400" />
                                    </div>
                                ) : (
                                    <span
                                        className="truncate max-w-[250px] font-semibold"
                                        title={`${residentDetail?.hoTen} - ${residentDetail?.soGiayTo}`}
                                    >
                                        {residentDetail?.hoTen ? `${residentDetail.hoTen} - ${residentDetail.soGiayTo}` : 'Chưa có dữ liệu'}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-[15px] font-medium text-gray-800">
                                <span className="text-gray-600">Công nhận:</span>
                                <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[13px] font-semibold transition-colors duration-200 ${Number(loai) === 1
                                            ? 'bg-red-100 text-red-700 border border-red-300'
                                            : Number(loai) === 2
                                                ? 'bg-orange-100 text-orange-700 border border-orange-300'
                                                : Number(loai) === 3
                                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                                        }`}
                                    role="status"
                                    aria-label={
                                        Number(loai) === 1
                                            ? 'Hộ nghèo'
                                            : Number(loai) === 2
                                                ? 'Hộ cận nghèo'
                                                : Number(loai) === 3
                                                    ? 'Gia đình văn hóa'
                                                    : 'Không xác định'
                                    }
                                >
                                    <Icon
                                        icon={
                                            Number(loai) === 1 || Number(loai) === 2
                                                ? 'mdi:alert-circle'
                                                : Number(loai) === 3
                                                    ? 'mdi:check-circle'
                                                    : 'mdi:information-outline'
                                        }
                                        fontSize={14}
                                        aria-hidden="true"
                                    />
                                    {Number(loai) === 1
                                        ? 'Hộ nghèo'
                                        : Number(loai) === 2
                                            ? 'Hộ cận nghèo'
                                            : Number(loai) === 3
                                                ? 'Gia đình văn hóa'
                                                : 'Không xác định'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="soHieu"
                            label="Số, ký hiệu"
                            placeholder="Nhập số, ký hiệu"
                            control={control}
                            error={errors.soHieu?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputAreaField
                            name="trichYeu"
                            label="Trích yếu văn bản"
                            placeholder="Nhập trích yếu văn bản"
                            control={control}
                            error={errors.trichYeu?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="coQuanBanHanh"
                            label="Cơ quan ban hành"
                            placeholder="Nhập cơ quan ban hành"
                            control={control}
                            error={errors.coQuanBanHanh?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="tuNgay"
                            label="Ngày công nhận"
                            placeholder="Chọn ngày công nhận"
                            control={control}
                            required={true}
                            error={errors.tuNgay?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="denNgay"
                            label="Ngày hết hạn"
                            placeholder="Chọn ngày hết hạn"
                            control={control}
                            error={errors.denNgay?.message}
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} px={4} className="w-[100%] gap-2" flex alignItems="center" justifyContent="center">
                            {
                                householdDetail &&
                                <Button
                                    onClick={() => removeInfo(householdDetail?.thongTinHoGiaDinhId)}
                                    className="!bg-red-100 !text-red-700"
                                >Xóa</Button>
                            }

                            <Button
                                variant="primary"
                                disabled={isPendingCreate || isPendingUpdate}
                                fullWidth
                                onClick={handleSubmit(onSubmit)}
                            >
                                {(isPendingCreate || isPendingUpdate) ? "Đang xử lý..." : `${householdDetail ? "Cập nhật thông tin" : "Thêm mới thông tin"}`}
                            </Button>

                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title={modalContent.title}
                message={modalContent.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default HouseholdHoNgheoUpdateForm