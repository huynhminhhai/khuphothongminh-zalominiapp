import { yupResolver } from "@hookform/resolvers/yup"
import { PrimaryButton } from "components/button"
import { FormImageUploaderSingle, FormInputAreaField, FormInputField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataNews, schemaNews } from "components/news/type"
import { NEWSDATA } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { Box, useNavigate, useSnackbar } from "zmp-ui"

const defaultValues: FormDataNews = {
    title: '',
    description: '',
    content: '',
    imageUrl: '',
}

const NewsUpdateForm = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>(defaultValues)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataNews>({
        resolver: yupResolver(schemaNews),
        defaultValues
    });

    const [searchParams] = useSearchParams();

    const newsId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchResidentData = async () => {
            setLoading(true);
            try {
                // Giả sử API trả về thông tin thành viên
                // const response = await fetch(`/api/residents/${residentId}`);
                // const data = await response.json();

                const data = NEWSDATA.find(resident => resident.id === Number(newsId))

                if (data) {
                    setFormData(data)
                    reset(data)
                }

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
    }, [newsId]);

    const onSubmit: SubmitHandler<FormDataNews> = (data) => {

        const updatedData = {};

        let hasChanges = false;

        // Duyệt qua tất cả các trường và so sánh với giá trị mặc định
        Object.keys(data).forEach((key) => {
            if (data[key] !== formData[key]) {
                updatedData[key] = data[key];
                hasChanges = true;
            }
        });

        if (!hasChanges) {
            openSnackbar({
                icon: true,
                text: "Không có thay đổi nào để cập nhật.",
                type: 'warning',
                duration: 3000,
            });
            return; // Không thực hiện tiếp tục gửi yêu cầu
        }

        setConfirmVisible(true);

        setFormData(updatedData)
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            // Gọi API thêm thành viên
            console.log('call api update with: ', formData);
            // Thành công
            openSnackbar({
                icon: true,
                text: "Cập nhật thông tin tin tức thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/news-management');
        } catch (error) {
            console.error('Error:', error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            fetchApi()
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
                    <div className="col-span-12">
                        <FormInputField
                            name="title"
                            label="Tiêu đề"
                            placeholder="Nhập tiêu đề"
                            control={control}
                            error={errors.title?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormImageUploaderSingle
                            name="imageUrl"
                            label="Upload ảnh"
                            control={control}
                            error={errors.imageUrl?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="description"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            control={control}
                            error={errors.description?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormTextEditorField
                            name="content"
                            label="Nội dung tin tức"
                            placeholder="Nhập nội dung tin tức..."
                            control={control}
                            error={errors.content?.message}
                            required
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật tin tức"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật tin tức này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default NewsUpdateForm