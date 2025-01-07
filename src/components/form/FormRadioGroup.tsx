import React from "react";
import { Box, Radio } from "zmp-ui";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

type FormRadioGroupProps = {
    label: string;
    options: { value: any; label: string }[];
    field: ControllerRenderProps<any, string>;
    required?: boolean;
    error?: string;
  };
  
  const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
    label,
    options,
    field,
    required = false,
    error,
  }) => {
  
    return (
      <Box pb={4} className="relative">
        <Label name={''} text={label} required={required} />
  
        <div className="radio-group flex items-center gap-3 mt-3">
          {options.map((option) => (
            <Radio
              key={option.value}
              name={field.name}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => field.onChange(option.value)}

            >
              {option.label}
            </Radio>
          ))}
        </div>
  
        {error && <ErrorMessage message={error} />}
      </Box>
    );
  };

type FormControllerRadioGroupProps = {
    name: string;
    control: Control<any>;
    label: string;
    options: { value: any; label: string }[];
    required?: boolean;
    error?: string;
};

const FormControllerRadioGroup: React.FC<FormControllerRadioGroupProps> = ({
    name,
    control,
    label,
    options,
    required = false,
    error,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: required ? `${label} là bắt buộc` : false,
            }}
            render={({ field, fieldState }) => (
                <FormRadioGroup
                    label={label}
                    options={options}
                    field={field}
                    required={required}
                    error={fieldState.error?.message || error}
                />
            )}
        />
    );
};

export default FormControllerRadioGroup;
