import React, { useCallback } from 'react';
import { Controller, Control, ControllerRenderProps } from 'react-hook-form';
import { chooseImage } from 'zmp-sdk';
import Label from './Label';
import ErrorMessage from './ErrorMessage';

const ImagePreview: React.FC<{ imagePath: string, onRemove: () => void }> = React.memo(({ imagePath, onRemove }) => {
    return (
        <div className='relative w-[100px] h-[100px]'>
            <img
                src={imagePath}
                alt={`Preview`}
                className='w-[100%] h-[100%] object-cover rounded-lg border-[1px] border-[#ddd]'
            />
            <button
                onClick={onRemove}
                className='absolute top-1 right-1 bg-[red] text-[white] border-none rounded-full w-[20px] h-[20px] flex items-center justify-center cursor-pointer'
            >
                ×
            </button>
        </div>
    );
});

type ImageUploaderFieldProps = {
    label: string;
    name: string;
    error?: string;
    field: ControllerRenderProps<any, string>;
    required?: boolean;
};

const ImageUploaderField: React.FC<ImageUploaderFieldProps> = ({
    label,
    name,
    error,
    field,
    required = false,
}) => {
    const handleChooseImage = () => {
        chooseImage({
            count: 100,
            sourceType: ['album', 'camera'],
            success: async (res) => {
                const paths = res.tempFiles.map((file) => file.path);
                field.onChange([...(field.value || []), ...paths]);

                const files = await Promise.all(
                    res.tempFiles.map(async (file, index) => {
                        const response = await fetch(file.path);
                        const blob = await response.blob();
                        return new File([blob], `image_${index}.png`, { type: blob.type });
                    })
                );

                uploadImages(files);
            },
            fail: (err) => {
                console.error('Error choosing images:', err);
            },
        });
    };

    const uploadImages = async (files: (string | Blob)[] | null) => {
        if (!files || files.length === 0) {
            console.error("No files to upload.");
            return;
        }

        const formData = new FormData();

        files.forEach((file: string | Blob, index: number) => {
            if (file) {
                formData.append(`file_${index}`, file);
            }
        });

        try {
            const response = await fetch("https://your-api.com/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            console.log("Upload success:", data);

        } catch (error) {
            console.error("Lỗi khi gửi request:", error);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...field.value];
        updatedImages.splice(index, 1);
        field.onChange(updatedImages);
    };

    return (
        <div className='pb-4 relative'>
            <Label text={label} required={false} />
            <div
                onClick={handleChooseImage}
                className='flex items-center justify-center h-[50px] rounded-lg cursor-pointer border-dashed border-[2px] border-[#b9bdc1]'
            >
                <span>Nhấn để chọn ảnh</span>
            </div>
            <div className='flex gap-2 flex-wrap mt-4'>
                {field.value?.map((imagePath: string, index: number) => (
                    <ImagePreview
                        key={index}
                        imagePath={imagePath}
                        onRemove={() => handleRemoveImage(index)}
                    />
                ))}
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

type FormImageUploaderProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: string;
    required?: boolean;
};

const FormImageUploader: React.FC<FormImageUploaderProps> = ({
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
                <ImageUploaderField
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

export default FormImageUploader;
