import React from 'react';
import { Controller, Control, FieldValues, ControllerRenderProps } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import Label from './Label';
import ErrorMessage from './ErrorMessage';

type TextEditorFieldProps = {
  label: string;
  name: string;
  error?: string;
  field: ControllerRenderProps<any, string>;
  required?: boolean;
  placeholder?: string;
};

const TextEditorField: React.FC<TextEditorFieldProps> = ({
  label,
  name,
  error,
  field,
  required = false,
  placeholder
}) => {
  return (
    <div style={{ paddingBottom: '16px', position: 'relative' }}>
      <Label name={name} text={label} required={required} />
      <ReactQuill
        modules={{
          toolbar: {
            container: [
              [{ header: "1" }, { header: "2" }, { header: "3" }],
              // [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["image"],
            ],
          },
          clipboard: {
            matchVisual: false,
          },
        }}
        value={field.value || ''}
        onChange={(value) => field.onChange(value)}
        placeholder={placeholder || "Nhập nội dung..."}
        style={{ borderColor: error ? 'red' : '#b9bdc1' }}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

type FormTextEditorProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  placeholder?: string;
};

const FormTextEditor: React.FC<FormTextEditorProps> = ({
  name,
  label,
  control,
  error,
  required = false,
  placeholder
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextEditorField
          label={label}
          name={name}
          required={required}
          field={field}
          error={error}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default FormTextEditor;
