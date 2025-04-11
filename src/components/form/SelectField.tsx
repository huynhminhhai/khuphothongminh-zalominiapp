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

type SelectFieldProps = {
    label: string;
    placeholder?: string;
    required?: boolean;
    options: OptionSelect[],
    selectedValue: string | "" | 0 | null,
    setSelectedValue: React.Dispatch<React.SetStateAction<string | "" | 0 | null>>,
    onChange: (value: string | number | null) => void;
    errors: string,
    disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    placeholder = "",
    required = false,
    options,
    selectedValue,
    setSelectedValue,
    onChange,
    errors,
    disabled=false
}) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelection = (optionValue: string) => {

        if (selectedValue === optionValue) {
            setSelectedValue(null);
            onChange(null);
        } else {
            setSelectedValue(optionValue);
            onChange(optionValue);
        }
        setIsSheetOpen(false);
        setSearch("");
    };

    return (
        <Box pb={4} className="relative">
            <Label text={label} required={required} />
            <Box>
                <Input
                    readOnly
                    onClick={() => setIsSheetOpen(true)}
                    value={options.find((option) => option.value === selectedValue)?.label || ''}
                    style={{borderColor: errors ? 'red': '#b9bdc1'}}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <Icon style={{top: label || required ? '46%' : '26%'}} className="absolute right-3 top-[46%]" icon="formkit:down" fontSize={9} />
                {errors && (
                    <ErrorMessage message={errors} />
                )}
                <Sheet
                    visible={isSheetOpen}
                    onClose={() => {
                        setIsSheetOpen(false);
                        setSearch(""); // Reset search on close
                    }}
                    title="Chọn một giá trị"
                    className="z-20"
                >
                    <div className="p-4 pb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-[100%] p-2 border-[1px] border-[#ccc] rounded mb-4"
                        />
                        <div className="max-h-[60vh] overflow-y-auto">
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        // setSelectedValue(option.value);
                                        // onChange(option.value);
                                        // setIsSheetOpen(false);
                                        toggleSelection(option.value);
                                    }}
                                    className="flex justify-between items-center py-3 border-b-[1px] cursor-pointer"
                                >
                                    <span
                                        className={`${selectedValue === option.value && "text-[#006af5]"
                                            }`}
                                    >
                                        {option.label}
                                    </span>
                                    {selectedValue === option.value && (
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

type FormSelectFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    control: Control<any>;
    options: OptionSelect[]; // assuming your options have 'value' and 'label'
    error?: string;
    required?: boolean;
    disabled?: boolean;
};

const FormSelectField: React.FC<FormSelectFieldProps> = ({
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
            defaultValue=""
            render={({ field }) => (
                <SelectField
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    options={options}
                    selectedValue={field.value}
                    setSelectedValue={field.onChange}
                    onChange={field.onChange}
                    errors={error || ""}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default FormSelectField;
