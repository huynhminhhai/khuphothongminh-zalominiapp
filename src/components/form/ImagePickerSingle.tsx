import React from 'react';
import { chooseImage, openMediaPicker } from 'zmp-sdk';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Control, Controller } from 'react-hook-form';

type ImagePickerSingleProps = {
    label: string;
    name: string;
    error?: string;
    field: {
        value: string | null; // Lưu một đường dẫn ảnh
        onChange: (value: string | null) => void;
    };
    required?: boolean;
};

const ImagePickerSingle: React.FC<ImagePickerSingleProps> = ({
    label,
    error,
    field,
    required = false,
}) => {
    const handleChooseImage = () => {
        openMediaPicker({
            maxSelectItem: 1,
            type: "photo",
            serverUploadUrl: "https://mini.zalo.me/upload/media",
            success: (res) => {
                // xử lý khi gọi api thành công
                const { data } = res;
                const result = JSON.parse(data);

                const path = result.urls[0];
                field.onChange(path);
            },
            fail: (error) => {
                // xử lý khi gọi api thất bại
                console.log(error);
            },
        });
    };

    const handleRemoveImage = () => {
        field.onChange(null); // Xóa ảnh
    };

    return (
        <div className="pb-4 relative">
            <Label text={label} required={required} />
            <div
                onClick={!field.value ? handleChooseImage : undefined}
                className={`relative flex items-center justify-center cursor-pointer rounded-lg border-dashed border-[2px] border-[#b9bdc1] min-h-[50px] h-auto w-full ${field.value ? 'border-none' : ''
                }`}
            >
                {field.value ? (
                    <div className="relative w-full h-full">
                        <img
                            src={field.value}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <span>Nhấn để chọn ảnh</span>
                )}
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

type FormImagePickerSingleProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: string;
    required?: boolean;
};

const FormImagePickerSingle: React.FC<FormImagePickerSingleProps> = ({
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
                <ImagePickerSingle
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

export default FormImagePickerSingle;