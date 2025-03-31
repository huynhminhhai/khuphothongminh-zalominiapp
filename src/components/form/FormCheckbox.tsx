import React from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

// Props cho FormCheckboxField
interface FormCheckboxFieldProps<T extends FieldValues> {
  name: Path<T>; // Tên trường trong form, khớp với interface
  label: string; // Nhãn hiển thị
  control: Control<T>; // Control từ useForm
  defaultChecked?: boolean; // Giá trị mặc định
  disabled?: boolean; // Trạng thái vô hiệu hóa
}

// Component FormCheckboxField
const FormCheckboxField = <T extends FieldValues>({
  name,
  label,
  control,
  defaultChecked = false,
  disabled = false,
}: FormCheckboxFieldProps<T>) => {
  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
    defaultValue: defaultChecked as any, // Ép kiểu để tương thích với type T
  });

  return (
    <div className="flex items-center gap-2 pb-4">
      <input
        type="checkbox"
        checked={!!value} // Chuyển đổi giá trị sang boolean
        onChange={(e) => onChange(e.target.checked)} // Truyền giá trị boolean
        ref={ref} // Tham chiếu để focus
        disabled={disabled}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label className="font-medium">{label}</label>
    </div>
  );
};

export default FormCheckboxField