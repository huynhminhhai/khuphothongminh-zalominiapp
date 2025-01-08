import React from "react";
import { Box, Input } from "zmp-ui";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

type InputFieldProps = {
    label: string;
    name: string;
    type?: 'text' | 'number' | 'password';
    error?: string;
    field: ControllerRenderProps<any, string>;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    error,
    field,
    required = false,
    placeholder,
    disabled=false,
    type='text'
}) => {
    return (
        <Box pb={4} className="relative">
            <Label name={name} text={label} required={required} />
            <Input
                {...field}
                id={name}
                className="mt-1 block w-full"
                style={{borderColor: error ? 'red': '#b9bdc1'}}
                placeholder={placeholder}
                disabled={disabled}
                type={type}
            />
            {error && <ErrorMessage message={error} />}
        </Box>
    );
};

type FormInputFieldProps = {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'password';
    placeholder: string;
    control: Control<any>;  // Type for the `control` prop
    error?: string;
    required?: boolean;
    disabled?: boolean;
};


const FormInputField: React.FC<FormInputFieldProps> = ({ name, label, placeholder, control, error, required, disabled, type }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputField
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    required={required}
                    field={field}
                    error={error}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default FormInputField;
