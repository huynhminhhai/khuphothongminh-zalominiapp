import React, { useEffect, useMemo, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataPhanAnh, phanAnhSchema } from "./type";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmModal } from "components/modal";
import { PrimaryButton } from "components/button";
import { FormImageUploader, FormInputAreaField, FormInputField, FormSelectField, FormSwitchField } from "components/form";
import { useStoreApp } from "store/store";
import { useAddressSelectorWithoutPrefix } from "utils/useAddress";
import { useDeleteFileFeedback, useGetFeebackDetail, useUpdateFeedback } from "apiRequest/feeback";
import { convertToFormData, loadImage } from "utils/file";
import { useSearchParams } from "react-router-dom";
import { omit } from "lodash";

const defaultValues: FormDataPhanAnh = {
    noiDung: "",
    diaChi: "",
    maXa: "",
    maHuyen: "",
    maTinh: "",
    latitude: null,
    longitude: null,
    congKhaiThongTinCaNhan: false,
    congKhaiPhanAnh: false,
    tinhTrangId: 0,
    tapTinPhanAnhFormFiles: []
};

const FeedbackUpdateForm: React.FC = () => {

    const { tinhs } = useStoreApp()
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataPhanAnh>(defaultValues)
    const [initialImages, setInitialImages] = useState<{ tapTinPhanAnhId: number; tapTin: string }[]>([]);

    const { handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<FormDataPhanAnh>({
        resolver: yupResolver(phanAnhSchema),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const feedbackId = searchParams.get("id");

    const { mutateAsync: updateFeedback, isPending } = useUpdateFeedback();
    const { data: feedbackDetail } = useGetFeebackDetail(Number(feedbackId));
    const { mutate: deleteFileFeedback } = useDeleteFileFeedback();

    // const { data: feedbackStatus } = useGetFeedbackStatus();

    // const feedbackStatusOptions = useMemo(() => {
    //     return feedbackStatus?.map((item) => ({
    //         value: item.tinhTrangId,
    //         label: item.tenTinhTrang
    //     })) || [];
    // }, [feedbackStatus]);

    const phanAnhAddress = useAddressSelectorWithoutPrefix({
        tinhOptions: tinhs,
        watch,
        setValue,
    });

    useEffect(() => {
        if (feedbackDetail) {
            reset({ ...omit(feedbackDetail, ['tapTinPhanAnhs']), tapTinPhanAnhFormFiles: [] });

            const fetchAndSetImages = async () => {
                if (feedbackDetail?.tapTinPhanAnhs) {
                    const imageItems = Array.isArray(feedbackDetail.tapTinPhanAnhs)
                        ? feedbackDetail.tapTinPhanAnhs
                        : [feedbackDetail.tapTinPhanAnhs];

                    const files = await Promise.all(
                        imageItems.map(async (url) => await loadImage(url.tapTin))
                    );

                    const validFiles = files.filter((file): file is File => file !== null);

                    if (validFiles.length > 0) {
                        reset((prevValues) => ({
                            ...prevValues,
                            tapTinPhanAnhFormFiles: validFiles,
                        }));
                    }

                    setInitialImages(imageItems.map((item) => ({
                        tapTinPhanAnhId: item.tapTinPhanAnhId,
                        tapTin: item.tapTin,
                    })));
                }
            };

            fetchAndSetImages();
        }
    }, [feedbackDetail, reset]);

    useEffect(() => {
        if (feedbackDetail) {
            if (feedbackDetail.maHuyen) {
                setValue("maHuyen", feedbackDetail.maHuyen);
            }
        }
    }, [phanAnhAddress.huyenOptions, feedbackDetail, setValue]);

    useEffect(() => {
        if (feedbackDetail) {
            if (feedbackDetail.maXa) {
                setValue("maXa", feedbackDetail.maXa);
            }
        }
    }, [phanAnhAddress.xaOptions, feedbackDetail, setValue]);


    const onSubmit: SubmitHandler<FormDataPhanAnh> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            if (initialImages.length > 0) {
                await Promise.all(
                    initialImages.map(async (image) => {
                        deleteFileFeedback(image.tapTinPhanAnhId);
                    })
                );
            }

            const dataSubmit = convertToFormData(formData);

            await updateFeedback(dataSubmit);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    return (
        <Box p={4}>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    {/* <div className="col-span-12">
                        <FormInputField
                            name="title"
                            label="Tiêu đề phản ánh"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.title?.message}
                            required
                        />
                    </div> */}
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="noiDung"
                            label="Nội dung phản ánh"
                            placeholder="Nhập nội dung phản ánh..."
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormSelectField
                            name="maTinh"
                            label="Địa chỉ thường trú"
                            placeholder="Chọn tỉnh/thành phố"
                            control={control}
                            options={tinhs}
                            error={errors.maTinh?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="maHuyen"
                            label=""
                            placeholder="Chọn quận/huyện"
                            control={control}
                            options={phanAnhAddress.huyenOptions}
                            error={errors.maHuyen?.message}
                            disabled={!phanAnhAddress.watchedTinh}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="maXa"
                            label=""
                            placeholder="Chọn phường/xã"
                            control={control}
                            options={phanAnhAddress.xaOptions}
                            error={errors.maXa?.message}
                            disabled={!phanAnhAddress.watchedHuyen}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="diaChi"
                            label=""
                            placeholder="Nhập địa chỉ chi tiết"
                            control={control}
                            error={errors.diaChi?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            type="number"
                            name="latitude"
                            placeholder="Nhập latitude"
                            control={control}
                            error={errors.latitude?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            type="number"
                            name="longitude"
                            placeholder="Nhập Longitute"
                            control={control}
                            error={errors.longitude?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <div className="mb-1 font-medium text-[16px]">Công khai <span className="text-[#dc2626]">(*)</span></div>
                    </div>
                    <div className="col-span-6">
                        <FormSwitchField
                            name="congKhaiThongTinCaNhan"
                            label="Thông tin cá nhân"
                            control={control}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSwitchField
                            name="congKhaiPhanAnh"
                            label="Phản ánh"
                            control={control}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormImageUploader
                            name="tapTinPhanAnhFormFiles"
                            label="Upload ảnh"
                            control={control}
                            error={errors.tapTinPhanAnhFormFiles?.message}
                            required
                        />
                    </div>
                    {/* <div className="col-span-12">
                        <FormSelectField
                            name="tinhTrangId"
                            label="Tình trạng"
                            placeholder="Tình trạng"
                            control={control}
                            options={feedbackStatusOptions}
                            error={errors.tinhTrangId?.message}
                        />
                    </div> */}
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật phản ánh"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi phản ánh này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default FeedbackUpdateForm