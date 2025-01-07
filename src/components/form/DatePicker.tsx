import React from "react";
import { Control, Controller } from "react-hook-form";
import { Box, DatePicker, Text } from "zmp-ui";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface FormDatePickerProps {
    name: string;
    label: string;
    value: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    placeholder?: string;
    dateFormat?: string;
    onChange: (value: string) => void;
}

const formatDate = (date: Date | null, format: string): string => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = format
        .split("/")
        .reduce((acc, part, index) => {
            if (part === "dd") acc.day = "2-digit";
            if (part === "mm") acc.month = "2-digit";
            if (part === "yyyy") acc.year = "numeric";
            return acc;
        }, {} as Intl.DateTimeFormatOptions);
    return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const parseDate = (dateStr: string, format: string): Date | undefined => {
    if (!dateStr) return undefined;
    const parts = dateStr.split("/");
    const formatParts = format.split("/");
    const day = parseInt(parts[formatParts.indexOf("dd")], 10);
    const month = parseInt(parts[formatParts.indexOf("mm")], 10) - 1;
    const year = parseInt(parts[formatParts.indexOf("yyyy")], 10);
    return new Date(year, month, day);
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
    name,
    label,
    value,
    required = false,
    error,
    helperText,
    placeholder = "Chọn ngày", // Sử dụng giá trị mặc định trực tiếp
    dateFormat = "dd/mm/yyyy", // Sử dụng giá trị mặc định trực tiếp
    onChange,
}) => {
    const dateValue = parseDate(value, dateFormat); // Chuyển giá trị chuỗi thành `Date`

    return (
        <Box pb={4} className="relative">
            <Label required={required} text={label} name={name} />

            <DatePicker
                title={label}
                value={dateValue || undefined} // Truyền giá trị kiểu `Date`
                placeholder={placeholder}
                helperText={helperText}
                dateFormat={dateFormat}
                mask
                maskClosable
                onChange={(newDate) =>
                    onChange(formatDate(newDate as Date | null, dateFormat))
                }
            />

            {error && <ErrorMessage message={error} />}
        </Box>
    );
};

type FormControllerDatePickerProps = {
    name: string;
    label: string;
    control: Control<any>;
    placeholder?: string;
    required?: boolean;
    dateFormat?: string;
    helperText?: string;
    error?: string;
};

const FormControllerDatePicker: React.FC<FormControllerDatePickerProps> = ({
    name,
    label,
    control,
    placeholder = "Chọn ngày",
    required = false,
    dateFormat = "dd/mm/yyyy",
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
                    dateFormat={dateFormat}
                    helperText={helperText}
                    onChange={field.onChange}
                    error={error}
                />
            )}
        />
    );
};

export default FormControllerDatePicker;