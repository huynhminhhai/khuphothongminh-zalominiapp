import React from "react";
import { Switch } from "zmp-ui"; // Giả sử bạn dùng Switch từ zmp-ui
import { Control, Controller } from "react-hook-form";
import Label from "./Label"; // Component Label của bạn
import ErrorMessage from "./ErrorMessage"; // Component ErrorMessage của bạn

type FormSwitchFieldProps = {
    name: string;
    label?: string;
    control: Control<any>;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    size?: "small" | "medium";
};

const FormSwitchField: React.FC<FormSwitchFieldProps> = ({
    name,
    label,
    control,
    error,
    disabled = false,
    required = false,
    size = "small",
}) => {
    return (
        <div className="pb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col items-start gap-2">
                        <Label text={label ?? ""} required={required} />
                        <Switch
                            size={size}
                            checked={field.value ?? false} // Giá trị boolean, mặc định false nếu undefined
                            onChange={(e) => field.onChange(e.target.checked)} // Trả về boolean
                            disabled={disabled}
                        />
                    </div>
                )}
            />
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default FormSwitchField;