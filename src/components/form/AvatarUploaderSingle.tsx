import React, { useEffect, useState } from 'react';
import { chooseImage } from 'zmp-sdk';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Control, Controller } from 'react-hook-form';
import { Avatar } from 'zmp-ui';
import { Icon } from '@iconify/react';

type AvatarUploaderSingleProps = {
    label: string;
    name: string;
    error?: string;
    field: {
        value: string | null | File;
        onChange: (value: string | null | File) => void;
    };
    required?: boolean;
};

const AvatarUploaderSingle: React.FC<AvatarUploaderSingleProps> = ({
    label,
    error,
    field,
    required = false,
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (field.value instanceof File) {
            const url = URL.createObjectURL(field.value);
            setPreview(url);
        } else if (typeof field.value === 'string') {
            setPreview(field.value);
        } else {
            setPreview(null);
        }

        return () => {
            if (preview && field.value instanceof File) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [field.value]);

    const handleChooseImage = () => {
        chooseImage({
            count: 1,
            sourceType: ['album', 'camera'],
            success: async (res) => {
                const path = res.tempFiles[0].path;
                try {
                    const response = await fetch(path);
                    const blob = await response.blob();
                    const file = new File([blob], `avatar_${Date.now()}.jpg`, { type: blob.type });

                    const blobUrl = URL.createObjectURL(file);
                    field.onChange(file);
                    setPreview(blobUrl);
                } catch (error) {
                    console.error('Error converting blob to file:', error);
                }
            },
            fail: (err) => {
                console.error('Error choosing images:', err);
            },
        });
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        field.onChange(null);
        setPreview(null);
    };

    return (
        <div className="pb-4 relative">
            <div className="flex justify-center items-center relative">
                <div onClick={handleChooseImage} className="cursor-pointer">
                    {preview ? (
                        <div className="relative w-36 h-36">
                            <img
                                src={preview}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-full !bg-slate-100"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <Avatar size={140} src="" className="!bg-slate-100" />
                    )}
                    <div className="absolute bottom-0 left-[60%] border-[1px] bg-white p-3 rounded-full">
                        <Icon fontSize={24} icon="mdi:camera-outline" />
                    </div>
                </div>
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

type FormAvatarUploaderSingleProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: string;
    required?: boolean;
};

const FormAvatarUploaderSingle: React.FC<FormAvatarUploaderSingleProps> = ({
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
                <AvatarUploaderSingle
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

export default FormAvatarUploaderSingle;
