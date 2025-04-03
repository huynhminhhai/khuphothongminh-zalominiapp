import React, { useEffect, useMemo, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { compareNguoiThucHienNhiemVus, convertParticipants, convertTaskBack, FormDataTask, schemaTask } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploader, FormInputAreaField, FormInputField, FormSelectField, FormSelectMultipleField } from "components/form"
import { ConfirmModal } from "components/modal"
import { STAFFOPTION, TASKS } from "constants/utinities"
import { taskPriority, taskStatus } from "constants/mock"
import { useSearchParams } from "react-router-dom"
import { useGetMeetingDetail, useGetMeetingStatus } from "apiRequest/meeting"
import { useGetTaskDetail, useGetTaskStatus, useUpdateTask } from "apiRequest/task"
import { useQueryClient } from "@tanstack/react-query"

const defaultValues: FormDataTask = {
    tieuDe: '',
    noiDung: '',
    chuTri: 0,
    ngayGiao: '',
    thoiHanXuLy: '',
    tinhTrangId: 0,
    thanhVien: []
}

const TaskUpdateForm: React.FC = () => {

    const queryClient = useQueryClient();
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTask>(defaultValues)

    const { handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<FormDataTask>({
        resolver: yupResolver(schemaTask),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const taskId = searchParams.get("id");

    const { mutateAsync: updateTask, isPending } = useUpdateTask();
    const { data: taskStatus } = useGetTaskStatus();
    const { data: meetingStatus } = useGetMeetingStatus();
    const { data: taskDetail } = useGetTaskDetail(Number(taskId));

    const nguoiThamDus = useMemo(() => {
        return meetingStatus?.nguoiThamDus?.map((item) => ({
            value: item.nguoiThamDuId,
            label: item.hoTen
        })) || [];
    }, [meetingStatus]);

    const tinhTrangs = useMemo(() => {
        return taskStatus?.map((item) => ({
            value: item.tinhTrangId,
            label: item.tenTinhTrang
        })) || [];
    }, [taskStatus]);

    const chuTriId = watch("chuTri");
    const thanhVienId = watch("thanhVien");

    const danhSachThanhVien = useMemo(() => {
        return nguoiThamDus.filter(
            (nguoi: any) => nguoi.value !== chuTriId
        );
    }, [chuTriId, nguoiThamDus]);

    useEffect(() => {
        if (thanhVienId?.includes(chuTriId)) {
            setValue("thanhVien", thanhVienId.filter((id: number) => id !== chuTriId));
        }
    }, [chuTriId, setValue, watch]);

    useEffect(() => {
        if (taskDetail) {

            const dataConvertBack = convertTaskBack(taskDetail);

            reset({ ...dataConvertBack })
        }
    }, [taskDetail, reset])


    const onSubmit: SubmitHandler<FormDataTask> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {
                const prepareDataSubmit = { ...formData, nhiemVuId: taskDetail.nhiemVuId, apId: taskDetail.apId, tinhTrangId: taskDetail.tinhTrangId }

                const dataConvertParticipants = convertParticipants(prepareDataSubmit)

                const dataCompare = compareNguoiThucHienNhiemVus(taskDetail, dataConvertParticipants)

                const dataSubmit = { ...dataConvertParticipants, nguoiThucHienNhiemVus: dataCompare }

                await updateTask(dataSubmit);

                queryClient.invalidateQueries({ queryKey: ["taskDetail"] });

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
                        <FormInputAreaField
                            name="noiDung"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="chuTri"
                            label="Giao cho"
                            placeholder="Chọn cán bộ"
                            control={control}
                            options={nguoiThamDus}
                            error={errors.chuTri?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectMultipleField
                            name="thanhVien"
                            label="Người hỗ trợ"
                            placeholder="Chọn người hỗ trợ"
                            control={control}
                            options={danhSachThanhVien}
                            error={errors.thanhVien?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="ngayGiao"
                            label="Ngày giao"
                            placeholder="Chọn ngày giao"
                            control={control}
                            required={true}
                            error={errors.ngayGiao?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="thoiHanXuLy"
                            label="Thời hạn"
                            placeholder="Chọn thời hạn"
                            control={control}
                            required={true}
                            error={errors.thoiHanXuLy?.message}
                        />
                    </div>
                    {/* <div className="col-span-6">
                        <FormSelectField
                            name="priority"
                            label="Mức độ ưu tiên"
                            placeholder="Chọn mức độ"
                            control={control}
                            options={taskPriority}
                            error={errors.priority?.message}
                            required
                        />
                    </div> */}
                    {/* <div className="col-span-12">
                        <FormImageUploader
                            name="imageUrl"
                            label="Chọn ảnh đính kèm"
                            control={control}
                            error={errors.imageUrl?.message}
                        />
                    </div> */}
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật nhiệm vụ"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin nhiệm vụ này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TaskUpdateForm