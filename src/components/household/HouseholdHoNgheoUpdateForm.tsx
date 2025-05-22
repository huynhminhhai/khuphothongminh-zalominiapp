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
    };

    const handleUpdate = async () => {
        if (formData) {
            try {

                if (householdDetail) {

                    const dataSubmit = {
                        ...formData
                    }

                    openConfirmModal( async () => {
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
                        ...formData,
                        ...extraFields,
                        danCuId: Number(danCuId)
                    }

                    openConfirmModal( async () => {
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
                        <Box mb={4}>
                            <div className="text-[14px] font-medium flex items-center gap-1 mb-1">
                                <span>
                                    Chủ hộ:
                                </span>
                                {
                                    isLoadingDetail ? <Icon icon='line-md:loading-twotone-loop' /> : `${residentDetail?.hoTen} - ${residentDetail?.soGiayTo}`
                                }
                            </div>
                            <div className="text-[14px] font-medium flex items-center gap-1">
                                <span>
                                    Công nhận:
                                </span>
                                <span
                                    style={{ fontWeight: 600 }}
                                    className={
                                        Number(loai) === 1
                                            ? 'text-red-700'
                                            : Number(loai) === 2
                                                ? 'text-orange-500'
                                                : Number(loai) === 3
                                                    ? 'text-green-600'
                                                    : ''
                                    }
                                >
                                    {Number(loai) === 1
                                        ? 'Hộ nghèo'
                                        : Number(loai) === 2
                                            ? 'Hộ cận nghèo'
                                            : Number(loai) === 3
                                                ? 'Gia đình văn hóa'
                                                : ''}
                                </span>
                            </div>
                        </Box>
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
                                    className="!bg-red-700"
                                >Xóa</Button>
                            }

                            <Button
                                variant="primary"
                                disabled={isPendingCreate || isPendingUpdate}
                                fullWidth
                                onClick={handleSubmit(handleUpdate)}
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