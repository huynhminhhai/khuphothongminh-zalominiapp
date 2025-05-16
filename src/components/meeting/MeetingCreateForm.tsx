import React, { useEffect, useMemo, useState } from "react"
import { Box } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormControllerTimePicker, FormFileInput, FormInputField, FormSelectField, FormSelectMultipleField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { convertMeetingTime, convertParticipants, FormDataMeeting, schemaMeeting } from "./type"
import { useStoreApp } from "store/store"
import { useCreateMeeting, useGetMeetingStatus } from "apiRequest/meeting"
import { convertToFormData } from "utils/file"

const defaultValues: FormDataMeeting = {
    tieuDe: '',
    noiDung: '',
    ngayHop: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    diaDiem: '',
    linkHopOnLine: '',
    tinhTrangId: 0,
    chuTri: 0,
    thuKy: null,
    thanhVien: [],
    fileDinhKems: []
}

const MeetingAddForm: React.FC = () => {

    const { account } = useStoreApp()

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataMeeting>(defaultValues)

    const { handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm<FormDataMeeting>({
        resolver: yupResolver(schemaMeeting),
        defaultValues
    });

    const { mutateAsync: createMeeting, isPending } = useCreateMeeting();
    const { data: meetingStatus } = useGetMeetingStatus();

    const nguoiThamDus = useMemo(() => {
        return meetingStatus?.nguoiThamDus?.map((item) => ({
            value: item.nguoiThamDuId,
            label: item.hoTen
        })) || [];
    }, [meetingStatus]);

    // const loaiNguoiThamDus = useMemo(() => {
    //     return meetingStatus?.loaiNguoiThamDus?.map((item) => ({
    //         value: item.loaiNguoiThamDuId,
    //         label: item.tenLoaiNguoiThamDu
    //     })) || [];
    // }, [meetingStatus]);

    const tinhTrangs = useMemo(() => {
        return meetingStatus?.tinhTrangs?.map((item) => ({
            value: item.tinhTrangId,
            label: item.tenTinhTrang
        })) || [];
    }, [meetingStatus]);

    const thuKyId = watch("thuKy");
    const chuTriId = watch("chuTri");
    const thanhVienId = watch("thanhVien");

    const danhSachThanhVien1 = useMemo(() => {
        return nguoiThamDus.filter(
            (nguoi: any) => nguoi.value !== chuTriId
        );
    }, [chuTriId, nguoiThamDus]);

    const danhSachThanhVien2 = useMemo(() => {
        return danhSachThanhVien1.filter(
            (nguoi: any) => nguoi.value !== thuKyId
        );
    }, [thuKyId, nguoiThamDus, danhSachThanhVien1]);

    useEffect(() => {
        if (thuKyId === chuTriId) {
            setValue("thuKy", null);
        }

        if (thanhVienId?.includes(chuTriId)) {
            setValue("thanhVien", thanhVienId.filter((id: number) => id !== chuTriId));
        }

        if (thuKyId) {
            if (thanhVienId?.includes(thuKyId)) {
                setValue("thanhVien", thanhVienId.filter((id: number) => id !== thuKyId));
            }
        }
    }, [chuTriId, thuKyId, setValue, watch]);

    const onSubmit: SubmitHandler<FormDataMeeting> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData && account) {
            try {

                const dataConvertDate = convertMeetingTime(formData)

                const dataConvertParticipants = convertParticipants(dataConvertDate)

                const dataSubmit = convertToFormData(dataConvertParticipants)

                await createMeeting(dataSubmit);

                reset(defaultValues);
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
                        <FormInputField
                            name="tieuDe"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.tieuDe?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="ngayHop"
                            label="Ngày họp"
                            control={control}
                            placeholder="Chọn ngày họp"
                            required
                            error={errors.ngayHop?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerTimePicker
                            name="thoiGianBatDau"
                            label="Thời gian bắt đầu"
                            placeholder="Chọn thời gian họp"
                            control={control}
                            required={true}
                            error={errors.thoiGianBatDau?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerTimePicker
                            name="thoiGianKetThuc"
                            label="Thời gian kết thúc"
                            placeholder="Chọn thời gian họp"
                            control={control}
                            required={true}
                            error={errors.thoiGianKetThuc?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="diaDiem"
                            label="Địa điểm"
                            placeholder="Nhập địa điểm"
                            control={control}
                            error={errors.diaDiem?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="linkHopOnLine"
                            label="Link họp online (nếu có)"
                            placeholder="Nhập địa điểm"
                            control={control}
                            error={errors.linkHopOnLine?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="chuTri"
                            label="Chủ trì"
                            placeholder="Chọn chủ trì"
                            control={control}
                            options={nguoiThamDus}
                            error={errors.chuTri?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="thuKy"
                            label="Thư ký"
                            placeholder="Chọn thư ký"
                            control={control}
                            options={danhSachThanhVien1}
                            error={errors.thuKy?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectMultipleField
                            name="thanhVien"
                            label="Thành viên"
                            placeholder="Chọn thành viên"
                            control={control}
                            options={danhSachThanhVien2}
                            error={errors.thanhVien?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormTextEditorField
                            name="noiDung"
                            label="Nội dung"
                            placeholder="Nhập nội dung"
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormFileInput
                            name="fileDinhKems"
                            label="Tập tin đính kèm"
                            control={control}
                            error={errors.fileDinhKems?.message}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth disabled={isPending} label={isPending ? "Đang xử lý..." : "Thêm cuộc họp"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default MeetingAddForm