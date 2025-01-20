import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Box, Input, Sheet, Text } from "zmp-ui";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { Control, Controller } from "react-hook-form";

type OptionSelect = {
    value: any,
    label: string
}

type SelectFieldMultipeProps = {
    label: string;
    placeholder?: string;
    required?: boolean;
    options: OptionSelect[];
    selectedValue: string[]; 
    setSelectedValue: React.Dispatch<React.SetStateAction<string[]>>;
    onChange: (value: string[]) => void;
    errors: string;
    disabled?: boolean;
};

export const SelectFieldMultipe: React.FC<SelectFieldMultipeProps> = ({
    label,
    placeholder = "",
    required = false,
    options,
    selectedValue, // Chuyển sang string[]
    setSelectedValue,
    onChange,
    errors,
    disabled = false
}) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Hàm kiểm tra xem giá trị đã được chọn chưa
    const isSelected = (value: string) => selectedValue.includes(value);

    // Hàm chọn hoặc bỏ chọn giá trị
    const toggleSelection = (value: string) => {
        let newSelection;
        if (isSelected(value)) {
            newSelection = selectedValue.filter((v) => v !== value);
        } else {
            newSelection = [...selectedValue, value];
        }
        setSelectedValue(newSelection);
        onChange(newSelection);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box pb={4} className="relative">
            <Label text={label} required={required} />
            <Box>
                <Input
                    readOnly
                    onClick={() => setIsSheetOpen(true)}
                    value={(selectedValue || []).map(val => options.find(opt => opt.value === val)?.label || '').join(", ")}
                    style={{ borderColor: errors ? 'red' : '#b9bdc1' }}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <Icon className="absolute right-3 top-[46%]" icon="formkit:down" fontSize={9} />
                {errors && <ErrorMessage message={errors} />}
                <Sheet
                    visible={isSheetOpen}
                    onClose={() => {
                        setIsSheetOpen(false);
                        setSearch(""); // Reset search on close
                    }}
                    title="Chọn giá trị"
                    className="z-20"
                >
                    <div className="p-4 pb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 border border-[#ccc] rounded mb-4"
                        />
                        <div className="max-h-[60vh] overflow-y-auto">
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => toggleSelection(option.value)}
                                    className="flex justify-between items-center py-3 border-b cursor-pointer"
                                >
                                    <span className={`${isSelected(option.value) && "text-[#006af5]"}`}>
                                        {option.label}
                                    </span>
                                    {isSelected(option.value) && (
                                        <Icon className="text-[#006af5]" icon="teenyicons:tick-outline" />
                                    )}
                                </div>
                            ))}
                            {filteredOptions.length === 0 && (
                                <div style={{ padding: "8px", color: "#999" }}>
                                    Không tìm thấy kết quả phù hợp.
                                </div>
                            )}
                        </div>
                    </div>
                </Sheet>
            </Box>
        </Box>
    );
};

type FormSelectMultipleFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    control: Control<any>;
    options: OptionSelect[]; // assuming your options have 'value' and 'label'
    error?: string;
    required?: boolean;
    disabled?: boolean;
};

const FormSelectMultipleField: React.FC<FormSelectMultipleFieldProps> = ({
    name,
    label,
    placeholder,
    control,
    options,
    error,
    required,
    disabled
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}  // Chuyển default thành mảng rỗng
            render={({ field }) => (
                <SelectFieldMultipe
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    options={options}
                    selectedValue={field.value || []}
                    setSelectedValue={field.onChange}
                    onChange={field.onChange}
                    errors={error || ""}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default FormSelectMultipleField;
