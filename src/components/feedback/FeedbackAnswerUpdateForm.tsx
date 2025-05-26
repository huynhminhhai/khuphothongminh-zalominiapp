import React, { useEffect, useState } from "react"
import { Box, Button } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormFileInput, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataFeedbackAnswer, schemaFeedbackAnswer } from "./type"
import { useDeleteFeedbackAnswer, useDeleteFileFeedbackAnswer, useGetFeebackAnswerDetail, useUpdateFeedbackAnswer } from "apiRequest/feeback"
import { useSearchParams } from "react-router-dom"
import { convertToFormData, loadFile } from "utils/file"
import { omit } from "lodash"
import { useStoreApp } from "store/store"

const defaultValues: FormDataFeedbackAnswer = {
    noiDung: '',
    tapTinPhanHoiFormFiles: [],
}

const FeedbackAnswerAddForm: React.FC = () => {

    const [searchParams] = useSearchParams();
    const feedbackId = searchParams.get("id");

    const { account } = useStoreApp();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [isConfirmVisibleDelete, setConfirmVisibleDelete] = useState(false);
    const [formData, setFormData] = useState<FormDataFeedbackAnswer>(defaultValues)
    const [initialImages, setInitialImages] = useState<{ tapTinKetQuaXuLyPhanAnhId: number; tapTin: string }[]>([]);

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataFeedbackAnswer>({
        resolver: yupResolver(schemaFeedbackAnswer),
        defaultValues
    });

    const { mutateAsync: updateFeedbackAnswer, isPending } = useUpdateFeedbackAnswer();
    const { mutate: deleteFileFeedbackAnswer } = useDeleteFileFeedbackAnswer();
    const { data: feedbackAnswerDetail } = useGetFeebackAnswerDetail(Number(feedbackId));
    const { mutate: deleteFeedbackAnswer } = useDeleteFeedbackAnswer();

    useEffect(() => {
        if (feedbackAnswerDetail) {
            reset({ ...omit(feedbackAnswerDetail, ['tapTinKetQuaXuLyPhanAnhs']), tapTinPhanHoiFormFiles: [] });

            const fetchAndSetImages = async () => {
                if (feedbackAnswerDetail?.tapTinKetQuaXuLyPhanAnhs) {
                    const imageItems = Array.isArray(feedbackAnswerDetail.tapTinKetQuaXuLyPhanAnhs)
                        ? feedbackAnswerDetail.tapTinKetQuaXuLyPhanAnhs
                        : [feedbackAnswerDetail.tapTinKetQuaXuLyPhanAnhs];

                    const files = await Promise.all(
                        imageItems.map(async (url) => await loadFile({ tapTin: url.tapTin, tenTapTin: url.tenTapTin }))
                    );

                    const validFiles = files.filter((file): file is File => file !== null);

                    if (validFiles.length > 0) {
                        reset((prevValues) => ({
                            ...prevValues,
                            tapTinPhanHoiFormFiles: validFiles,
                        }));
                    }

                    setInitialImages(imageItems.map((item) => ({
                        tapTinKetQuaXuLyPhanAnhId: item.tapTinKetQuaXuLyPhanAnhId,
                        tapTin: item.tapTin,
                    })));
                }
            };

            fetchAndSetImages();
        }
    }, [feedbackAnswerDetail, reset]);

    const onSubmit: SubmitHandler<FormDataFeedbackAnswer> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };


    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            if (initialImages.length > 0) {
                await Promise.all(
                    initialImages.map(async (image) => {
                        deleteFileFeedbackAnswer(image.tapTinKetQuaXuLyPhanAnhId);
                    })
                );
            }

            const dataSubmit = convertToFormData({ ...formData, phanAnhId: feedbackId, nguoiTao: account?.nguoiDungId });

            await updateFeedbackAnswer(dataSubmit);

            reset(defaultValues);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    const handleConfirmDelete = async () => {
        setConfirmVisibleDelete(false);
        removeFeedbackAnswer();
    };
    
    const handleCancelDelete = () => {
        setConfirmVisibleDelete(false);
    };
    
    const removeFeedbackAnswer = () => {
        deleteFeedbackAnswer(feedbackAnswerDetail.ketQuaXuLyPhanAnhId);
    }

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormTextEditorField
                            name="noiDung"
                            label="Nội dung phản hồi"
                            placeholder="Nhập nội dung phản hồi..."
                            control={control}
                            error={errors.noiDung?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormFileInput
                            name="tapTinPhanHoiFormFiles"
                            label="Tập tin đính kèm"
                            control={control}
                            error={errors.tapTinPhanHoiFormFiles?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <Button
                            onClick={() => setConfirmVisibleDelete(true)}
                            fullWidth size="medium" className="!bg-red-100 !text-red-600"
                        >
                            Xóa phản hồi
                        </Button>
                    </div>

                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth disabled={isPending} label={isPending ? "Đang xử lý..." : "Cập nhật phản hồi"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật phản hồi ý kiến này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <ConfirmModal
                visible={isConfirmVisibleDelete}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn xóa phản hồi ý kiến này không?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Box>
    )
}

export default FeedbackAnswerAddForm