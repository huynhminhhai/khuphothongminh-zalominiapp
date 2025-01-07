import React from "react";
import { Control, Controller } from "react-hook-form";
import { Box, Checkbox, Text } from "zmp-ui";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type FormCheckboxProps = {
    label: string;
    name: string;
    required?: boolean;
    checked: boolean;
    error?: string;
    onChange: (checked: boolean) => void;
    value?: string; // Thêm giá trị cho thuộc tính `value`
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
    label,
    name,
    required = false,
    checked,
    error,
    onChange,
    value = "on", // Giá trị mặc định cho `value`
}) => {
    return (
        <Box mb={5} className="relative">
            <Label name={name} text={label} required={required} />

            <Checkbox
                id={name}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                value={value}
            >
                {label}
            </Checkbox>

            {error && <ErrorMessage message={error} />}
        </Box>
    );
};

type FormControllerCheckboxProps = {
    name: string;
    label: string;
    control: Control<any>;
    required?: boolean;
    error?: string;
};

const FormControllerCheckbox: React.FC<FormControllerCheckboxProps> = ({
    name,
    label,
    control,
    required = false,
    error,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <FormCheckbox
                    label={label}
                    name={name}
                    required={required}
                    checked={field.value}
                    onChange={field.onChange}
                    error={error}
                />
            )}
        />
    );
};

export default FormControllerCheckbox;