import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormFileInput, FormInputAreaField, FormInputField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataDocument, schemaDocument } from "./type"
import { useSearchParams } from "react-router-dom"
import { useStoreApp } from "store/store"
import { useDeleteFileDocument, useGetDocumentDetail, useUpdateDocument } from "apiRequest/document"
import { omit } from "lodash"
import { convertToFormData, loadFile } from "utils/file"

const defaultValues: FormDataDocument = {
    soHieu: '',
    trichYeu: '',
    ngayBanHanh: '',
    tenCoQuanBanHanh: '',
    tinhTrangId: 39
}
const DocumentUpdateForm: React.FC = () => {

    const { setIsLoadingFullScreen } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataDocument>(defaultValues)
    const [initialImages, setInitialImages] = useState<{ tapTinVanBanId: number; tapTin: string }[]>([]);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataDocument>({
        resolver: yupResolver(schemaDocument),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const transactionsId = searchParams.get("id");

    const { mutateAsync: updateDocument, isPending } = useUpdateDocument();
    const { data: documentDetail, isLoading } = useGetDocumentDetail(Number(transactionsId));
    const { mutate: deleteFileDocument } = useDeleteFileDocument();

    useEffect(() => {
        setIsLoadingFullScreen((isLoading))
    }, [isLoading])

    useEffect(() => {
        if (documentDetail) {

            const dataConvertBack =
                { ...omit(documentDetail, ['tapTinVanBans']), fileDinhKems: [] }
                ;

            reset({ ...dataConvertBack })

            const fetchAndSetImages = async () => {
                if (documentDetail?.tapTinVanBans) {
                    const imageItems = Array.isArray(documentDetail.tapTinVanBans)
                        ? documentDetail.tapTinVanBans
                        : [documentDetail.tapTinVanBans];

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
                        tapTinVanBanId: item.tapTinVanBanId,
                        tapTin: item.tapTin,
                    })));
                }
            };

            fetchAndSetImages();
        }
    }, [documentDetail, reset])

    const onSubmit: SubmitHandler<FormDataDocument> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        if (formData) {
            try {

                const dataSubmit = convertToFormData(formData)

                if (initialImages.length > 0) {
                    await Promise.all(
                        initialImages.map(async (image) => {
                            deleteFileDocument(image.tapTinVanBanId);
                        })
                    );
                }
                
                await updateDocument(dataSubmit);
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
                        <FormInputAreaField
                            name="trichYeu"
                            label="Trích yếu"
                            placeholder="Nhập trích yếu"
                            control={control}
                            error={errors.trichYeu?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="soHieu"
                            label="Số ký hiệu"
                            placeholder="Nhập số ký hiệu"
                            control={control}
                            error={errors.soHieu?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="tenCoQuanBanHanh"
                            label="Tên cơ quan ban hành"
                            placeholder="Nhập tên cơ quan ban hành"
                            control={control}
                            error={errors.tenCoQuanBanHanh?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="ngayBanHanh"
                            label="Ngày ban hành"
                            placeholder="Chọn ngày ban hành"
                            control={control}
                            error={errors.ngayBanHanh?.message}
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
                            <PrimaryButton disabled={isPending} fullWidth label={isPending ? "Đang xử lý..." : "Cập nhật văn bản"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin văn bản này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default DocumentUpdateForm