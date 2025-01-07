import React from "react";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { Box, Input, Text } from "zmp-ui";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface InputAreaFieldProps {
    label: string;
    name: string;
    error?: string;
    field: ControllerRenderProps<any, string>;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

export const InputAreaField: React.FC<InputAreaFieldProps> = ({
    label,
    name,
    error,
    field,
    required = false,
    placeholder,
    disabled=false
}) => {
    return (
        <Box pb={4} className="relative">
            <Label name={name} text={label} required={required} />
            <Input.TextArea
                {...field}
                id={name}
                className="mt-1 block w-full"
                style={{ borderColor: error ? 'red' : '#b9bdc1' }}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <ErrorMessage message={error} />}
        </Box>
    );
};

type FormInputAreaFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    control: Control<any>;  // Type for the `control` prop
    error?: string;
    required?: boolean;
    disabled?: boolean;
};


const FormInputAreaField: React.FC<FormInputAreaFieldProps> = ({ name, label, placeholder, control, error, required, disabled }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputAreaField
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    field={field}
                    error={error}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default FormInputAreaField;