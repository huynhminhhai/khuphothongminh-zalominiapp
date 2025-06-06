import { yupResolver } from "@hookform/resolvers/yup"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormControllerTimePicker, FormFileInput, FormInputField, FormSelectField, FormSelectMultipleField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import React, { useEffect, useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { Box } from "zmp-ui"
import { convertMeetingBack, convertMeetingTime, convertParticipants, FormDataMeeting, schemaMeeting } from "./type"
import { useDeleteFileMeeting, useGetMeetingDetail, useGetMeetingStatus, useUpdateMeeting } from "apiRequest/meeting"
import { useQueryClient } from "@tanstack/react-query"
import { omit } from "lodash"
import { convertToFormData, loadFile } from "utils/file"
import { useStoreApp } from "store/store"

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
    thanhVien: []
}

const MeetingUpdateForm = () => {

    const { setIsLoadingFullScreen } = useStoreApp();

    const queryClient = useQueryClient();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues);
    const [initialImages, setInitialImages] = useState<{ tapTinCuocHopId: number; tapTin: string }[]>([]);

    const { handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<FormDataMeeting>({
        resolver: yupResolver(schemaMeeting),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const meetingId = searchParams.get("id");

    const { mutateAsync: updateMeeting, isPending } = useUpdateMeeting();
    const { mutate: deleteFileMeeting } = useDeleteFileMeeting();
    const { data: meetingStatus } = useGetMeetingStatus();
    const { data: meetingkDetail, isLoading } = useGetMeetingDetail(Number(meetingId));

    useEffect(() => {
        setIsLoadingFullScreen((isLoading))
    }, [isLoading])

    const nguoiThamDus = useMemo(() => {
        return meetingStatus?.nguoiThamDus?.map((item) => ({
            value: item.nguoiThamDuId,
            label: item.hoTen
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

    useEffect(() => {
        if (meetingkDetail) {

            const dataConvertBack = convertMeetingBack(
                { ...omit(meetingkDetail, ['tapTinCuocHops']), fileDinhKems: [] }
            );

            reset({ ...dataConvertBack })

            const fetchAndSetImages = async () => {
                if (meetingkDetail?.tapTinCuocHops) {
                    const imageItems = Array.isArray(meetingkDetail.tapTinCuocHops)
                        ? meetingkDetail.tapTinCuocHops
                        : [meetingkDetail.tapTinCuocHops];

                    const files = await Promise.all(
                        imageItems.map(async (url) => await loadFile({ tapTin: url.tapTin, tenTapTin: url.tenTapTin }))
                    );

                    const validFiles = files.filter((file): file is File => file !== null);

                    if (validFiles.length > 0) {
                        reset((prevValues) => ({
                            ...prevValues,
                            fileDinhKems: validFiles,
                        }));
                    }

                    setInitialImages(imageItems.map((item) => ({
                        tapTinCuocHopId: item.tapTinCuocHopId,
                        tapTin: item.tapTin,
                    })));
                }
            };

            fetchAndSetImages();
        }
    }, [meetingkDetail, reset])

    const onSubmit: SubmitHandler<FormDataMeeting> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                const dataConvertDate = convertMeetingTime({ ...formData, cuocHopId: meetingkDetail.cuocHopId })

                const dataConvertParticipants = convertParticipants(dataConvertDate)

                const dataSubmit = convertToFormData(dataConvertParticipants)

                if (initialImages.length > 0) {
                    await Promise.all(
                        initialImages.map(async (image) => {
                            deleteFileMeeting(image.tapTinCuocHopId);
                        })
                    );
                }

                await updateMeeting(dataSubmit);

                queryClient.invalidateQueries({ queryKey: ["meetingDetail"] });

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
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật cuộc họp này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default MeetingUpdateForm