import React from 'react';
import { chooseImage } from 'zmp-sdk';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Control, Controller } from 'react-hook-form';

type ImageUploaderSingleProps = {
    label: string;
    name: string;
    error?: string;
    field: {
        value: string | null; // Lưu một đường dẫn ảnh
        onChange: (value: string | null) => void;
    };
    required?: boolean;
};

const ImageUploaderSingle: React.FC<ImageUploaderSingleProps> = ({
    label,
    error,
    field,
    required = false,
}) => {
    const handleChooseImage = () => {
        chooseImage({
            count: 1, // Chỉ chọn 1 ảnh
            sourceType: ['album', 'camera'],
            success: (res) => {
                const path = res.tempFiles[0].path; // Đường dẫn ảnh

                field.onChange(path); // Cập nhật giá trị mới
            },
            fail: (err) => {
                console.error('Error choosing images:', err);
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

type FormImageUploaderSingleProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: string;
    required?: boolean;
};

const FormImageUploaderSingle: React.FC<FormImageUploaderSingleProps> = ({
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
                <ImageUploaderSingle
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

export default FormImageUploaderSingle;