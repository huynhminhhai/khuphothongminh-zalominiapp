import React from 'react';
import { chooseImage } from 'zmp-sdk';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Control, Controller } from 'react-hook-form';
import { Avatar } from 'zmp-ui';
import { Icon } from '@iconify/react';
import images from 'assets/images';

type AvatarUploaderSingleProps = {
    label: string;
    name: string;
    error?: string;
    field: {
        value: string | null; // Lưu một đường dẫn ảnh
        onChange: (value: string | null) => void;
    };
    required?: boolean;
};

const AvatarUploaderSingle: React.FC<AvatarUploaderSingleProps> = ({
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

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        field.onChange(null); // Xóa ảnh
    };

    return (
        <div className="pb-4 relative">
            <div>
                <div className="flex justify-center items-center relative">
                    <div
                        onClick={handleChooseImage}
                        className="cursor-pointer"
                    >
                        {field.value ? (
                            <div className="relative w-36 h-36">
                                <img
                                    src={field.value}
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
                            <Avatar size={140} src={field.value || ''} className='!bg-slate-100' />
                        )}
                            <div
                                className="absolute bottom-0 left-[60%] border-[1px] bg-white p-3 rounded-full"
                            >
                                <Icon fontSize={24} icon="mdi:camera-outline" />
                            </div>
                        
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