import React, { useMemo, useState } from "react"
import { Box, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataPhanAnh, phanAnhSchema } from "./type";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmModal } from "components/modal";
import { PrimaryButton } from "components/button";
import { FormImageUploader, FormInputAreaField, FormInputField, FormSelectField, FormSwitchField } from "components/form";
import { useStoreApp } from "store/store";
import { useAddressSelectorWithoutPrefix, useResidentAddress } from "utils/useAddress";
import { useCreateFeeback, useGetFeedbackStatus } from "apiRequest/feeback";
import { convertToFormData } from "utils/file";

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

const FeedbackAddForm: React.FC = () => {

    const { tinhs } = useStoreApp()

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataPhanAnh>(defaultValues)

    const { handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<FormDataPhanAnh>({
        resolver: yupResolver(phanAnhSchema),
        defaultValues
    });

    const { mutateAsync: createFeedback, isPending } = useCreateFeeback();

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

    const onSubmit: SubmitHandler<FormDataPhanAnh> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            const dataSubmit = convertToFormData({...formData, tinhTrangId: 10});

            console.log(dataSubmit);
            
            await createFeedback(dataSubmit);

            reset(defaultValues);
        } catch (error) {
            console.error("Error:", error);
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
                            size="medium"
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSwitchField
                            name="congKhaiPhanAnh"
                            label="Phản ánh"
                            control={control}
                            size="medium"
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
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Gửi phản ánh"} handleClick={handleSubmit(onSubmit)} />
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

export default FeedbackAddForm