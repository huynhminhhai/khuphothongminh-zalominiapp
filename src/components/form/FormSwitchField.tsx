import React from "react";
import { Control, Controller } from "react-hook-form";
import Label from "./Label"; // Component Label của bạn
import ErrorMessage from "./ErrorMessage"; // Component ErrorMessage của bạn

// Component CanToggle đã chỉnh sửa
const CanToggle = ({
    checked = false,
    disabled = false,
    onChange,
    labelOff = "Không",
    labelOn = "Có",
}) => {

    const handleToggle = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div
            className={`border border-[#b9bdc1] p-1 relative w-full h-[38px] rounded-full cursor-pointer transition-colors duration-300 ${disabled ? "opacity-40 pointer-events-none" : ""}`}
            onClick={handleToggle}
        >
            <div className="relative h-full flex items-center justify-center gap-2">
                {[labelOff, labelOn].map((text, index) => {
                    const isActive = checked ? index === 1 : index === 0;
                    return (
                        <div
                            key={text}
                            className={`transition-all duration-300 w-full h-full flex items-center justify-center rounded-full text-center text-[14px] leading-[1] font-medium ${isActive ? "text-white bg-[#222222]" : "text-[#222222]"
                                }`}
                        >
                            {text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

type FormSwitchFieldProps = {
    name: string;
    label?: string;
    control: Control<any>;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    labelOff?: string,
    labelOn?: string,
};

const FormSwitchField: React.FC<FormSwitchFieldProps> = ({
    name,
    label,
    control,
    error,
    disabled = false,
    required = false,
    labelOff = "Không",
    labelOn = "Có",
}) => {

    return (
        <div className="pb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex flex-col items-start">
                        <Label text={label ?? ""} required={required} />
                        <CanToggle
                            checked={field.value ?? false} // Giá trị boolean, mặc định false nếu undefined
                            onChange={(value) => field.onChange(value)} // Trả về boolean
                            disabled={disabled}
                            labelOff={labelOff}
                            labelOn={labelOn}
                        />
                    </div>
                )}
            />
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default FormSwitchField;