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
};

const FormFileInput: React.FC<FormFileInputProps> = ({
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
      defaultValue={[]} // đảm bảo có giá trị khởi tạo
      render={({ field: { onChange, value } }) => {
        const [files, setFiles] = useState<File[]>(value || []);

        const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newFiles = Array.from(e.target.files || []);
          const updatedFiles = [...files, ...newFiles];
          setFiles(updatedFiles);
          onChange(updatedFiles);
        };

        const handleRemoveFile = (index: number) => {
          const updatedFiles = files.filter((_, i) => i !== index);
          setFiles(updatedFiles);
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
                    <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
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

            {error && <ErrorMessage message={error} />}
          </div>
        );
      }}
    />
  );
};

export default FormFileInput;
