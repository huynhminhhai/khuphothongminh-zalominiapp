import React from "react";
import { Control, Controller } from "react-hook-form";
import { Box, DatePicker, Text } from "zmp-ui";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface FormDatePickerProps {
  name: string;
  label?: string;
  value: string; // Chuỗi ISO như "2000-12-12T00:00:00Z"
  required?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
  onChange: (value: string) => void; // Trả về chuỗi ISO
}

export const formatDate = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).replace(" ", "T") + "Z"; // "2000-12-12T00:00:00Z"
};

export const parseDate = (dateStr: string): Date | undefined => {
  if (!dateStr) return undefined;
  const date = new Date(dateStr); // Chuyển chuỗi ISO thành Date
  return isNaN(date.getTime()) ? undefined : date;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  value,
  required = false,
  error,
  helperText,
  placeholder = "Chọn ngày",
  onChange,
}) => {
  const dateValue = parseDate(value); // Chuyển chuỗi ISO thành Date

  return (
    <Box pb={4} className={`relative ${error && "borderRed"}`}>
      <Label required={required} text={label || ""} name={name} />

      <DatePicker
        title={label}
        value={dateValue || undefined}
        placeholder={placeholder}
        helperText={helperText}
        mask
        maskClosable
        onChange={(newDate) => onChange(formatDate(newDate as Date | null))}
      />

      {error && <ErrorMessage message={error} />}
    </Box>
  );
};

type FormControllerDatePickerProps = {
  name: string;
  label?: string;
  control: Control<any>;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
};

const FormControllerDatePicker: React.FC<FormControllerDatePickerProps> = ({
  name,
  label,
  control,
  placeholder = "Chọn ngày",
  required = false,
  helperText,
  error,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormDatePicker
          name={name}
          label={label}
          value={field.value}
          placeholder={placeholder}
          required={required}
          helperText={helperText}
          onChange={field.onChange}
          error={error}
        />
      )}
    />
  );
};

export default FormControllerDatePicker;