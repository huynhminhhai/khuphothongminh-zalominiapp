import React, { useEffect, useState } from "react";
import { chooseImage } from "zmp-sdk";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { Control, Controller } from "react-hook-form";

type ImageUploaderMultiProps = {
    label: string;
    name: string;
    error?: string;
    field: {
        value: File[] | null; // Lưu mảng File
        onChange: (value: File[] | null) => void;
    };
    required?: boolean;
};

const ImageUploaderMulti: React.FC<ImageUploaderMultiProps> = ({
    label,
    error,
    field,
    required = false,
}) => {
    const [previews, setPreviews] = useState<string[]>([]); // Mảng URL để preview

    // Cập nhật preview khi field.value thay đổi
    useEffect(() => {
        if (field.value && Array.isArray(field.value)) {
            const newPreviews = field.value.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => {
                // Thu hồi các URL cũ để tránh memory leak
                prev.forEach((url) => URL.revokeObjectURL(url));
                return newPreviews;
            });
        } else {
            setPreviews((prev) => {
                prev.forEach((url) => URL.revokeObjectURL(url));
                return [];
            });
        }
        // Cleanup khi component unmount
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [field.value]);

    const handleChooseImage = () => {
        chooseImage({
            count: 100, // Cho phép chọn nhiều ảnh, có thể giới hạn nếu cần
            sourceType: ["album", "camera"],
            success: async (res) => {
                const files = await Promise.all(
                    res.tempFiles.map(async (file, index) => {
                        const response = await fetch(file.path);
                        const blob = await response.blob();
                        return new File([blob], `upload_${Date.now()}_${index}.jpg`, { type: blob.type });
                    })
                );
                // Thêm các file mới vào mảng hiện tại
                field.onChange([...(field.value || []), ...files]);
            },
            fail: (err) => {
                console.error("Error choosing images:", err);
            },
        });
    };

    const handleRemoveImage = (index: number) => {
        if (field.value) {
            const updatedFiles = [...field.value];
            updatedFiles.splice(index, 1);
            field.onChange(updatedFiles.length > 0 ? updatedFiles : null); // Nếu rỗng thì trả về null
        }
    };

    return (
        <div className="pb-4 relative">
            <Label text={label} required={required} />
            <div
                onClick={handleChooseImage}
                className="flex items-center justify-center cursor-pointer rounded-lg border-dashed border-[2px] border-[#b9bdc1] min-h-[50px] h-auto w-full"
            >
                <span>Nhấn để chọn ảnh</span>
            </div>
            {previews.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative w-[100px] h-[100px]">
                            <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover rounded-lg border-[1px] border-[#ddd]"
                            />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

type FormMultiImageUploaderProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: string;
    required?: boolean;
};

const FormMultiImageUploader: React.FC<FormMultiImageUploaderProps> = ({
    name,
    label,
    control,
    error,
    required = false,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ImageUploaderMulti
                    label={label}
                    name={name}
                    required={required}
                    field={field}
                    error={error}
                />
            )}
        />
    );
};

export default FormMultiImageUploader;