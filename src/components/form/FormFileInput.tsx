import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Icon } from '@iconify/react';

type FormFileInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  maxSizeMB?: number; // thêm giới hạn dung lượng tùy chỉnh
};

const FormFileInput: React.FC<FormFileInputProps> = ({
  name,
  label,
  control,
  error,
  required = false,
  maxSizeMB = 10, // mặc định 5MB
}) => {
  const [sizeError, setSizeError] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => {
        const files: File[] = Array.isArray(value) ? value : [];

        const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newFiles = Array.from(e.target.files || []);
          const MAX_SIZE = maxSizeMB * 1024 * 1024;

          const oversizedFiles = newFiles.filter(file => file.size > MAX_SIZE);
          const validFiles = newFiles.filter(file => file.size <= MAX_SIZE);

          if (oversizedFiles.length > 0) {
            setSizeError(
              `${oversizedFiles
                .map(f => `${f.name} (${(f.size / (1024 * 1024)).toFixed(2)} MB)`)
                .join(', ')} có kích thước vượt quá ${maxSizeMB}MB`
            );
          } else {
            setSizeError(null);
          }

          if (validFiles.length > 0) {
            onChange([...files, ...validFiles]);
          }

          e.target.value = ''; // reset input để có thể chọn lại cùng file
        };

        const handleRemoveFile = (index: number) => {
          const updatedFiles = files.filter((_, i) => i !== index);
          onChange(updatedFiles);
        };

        return (
          <div style={{ paddingBottom: '16px', position: 'relative' }}>
            <Label name={name} text={label} required={required} />

            <label className="block w-full cursor-pointer bg-white border border-gray-300 rounded px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
              📁 Thêm tập tin
              <input
                type="file"
                multiple
                onChange={handleAddFiles}
                className="hidden"
              />
            </label>

            {files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                {files.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="ml-2 text-red-500 hover:underline text-xs"
                    >
                      <Icon icon='mingcute:close-square-fill' fontSize={26} className="text-[#c46574]" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {sizeError && <p className="mt-1 text-red-500 text-sm">{sizeError}</p>}
            {error && <ErrorMessage message={error} />}
          </div>
        );
      }}
    />
  );
};

export default FormFileInput;
