import React, { useEffect, useState } from 'react';
import { chooseImage } from 'zmp-sdk';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Control, Controller } from 'react-hook-form';

type ImageUploaderSingleProps = {
    label: string;
    name: string;
    error?: string;
    field: {
        value: string | null;
        onChange: (value: string | null | File) => void;
    };
    required?: boolean;
};

const ImageUploaderSingle: React.FC<ImageUploaderSingleProps> = ({
    label,
    error,
    field,
    required = false,
}) => {

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if ((field as any).value instanceof File) {
            const blobUrl = URL.createObjectURL((field as any).value);
            setPreview(blobUrl);

        } else if (typeof field.value === "string") {
            setPreview(field.value);
        } else {
            setPreview(null)
        }
    }, [field.value]);

    const handleChooseImage = () => {
        chooseImage({
            count: 1,
            sourceType: ["album", "camera"],
            success: async (res) => {
                const path = res.tempFiles[0].path;

                try {
                    const response = await fetch(path);
                    const blob = await response.blob();
                    const file = new File([blob], `upload_${Date.now()}.jpg`, { type: blob.type });

                    const blobUrl = URL.createObjectURL(file);

                    field.onChange(file);
                    setPreview(blobUrl); 
                } catch (error) {
                    console.error("Error converting blob to file:", error);
                }
            },
            fail: (err) => {
                console.error("Error choosing images:", err);
            },
        });
    };

    const handleRemoveImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        field.onChange(null);
        setPreview(null); 
    };

    return (
        <div className="pb-4 relative">
            <Label text={label} required={required} />
            <div
                onClick={!preview ? handleChooseImage : undefined}
                className={`relative flex items-center justify-center cursor-pointer rounded-lg border-dashed border-[2px] border-[#b9bdc1] min-h-[50px] h-auto w-full ${preview ? "border-none" : ""
                    }`}
            >
                {preview ? (
                    <div className="relative w-full h-full">
                        <img
                            src={preview} // Hiển thị ảnh từ blob URL
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