import { Icon } from '@iconify/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Box, Picker } from 'zmp-ui';
import Label from './Label';
import ErrorMessage from './ErrorMessage';

interface PickerOption {
    value: number;
    displayName: string;
}

const genTimeData = (start: number, end: number, prefix: string): PickerOption[] => {
    const data: PickerOption[] = [];
    for (let i = start; i <= end; i++) {
        data.push({
            value: i,
            displayName: `${i < 10 ? `0${i}` : i} ${prefix}`,
        });
    }
    return data;
};

interface TimePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    dateFormat?: string;
    value: string;
    onChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
    name,
    label,
    placeholder = "00:00",
    required = false,
    error,
    helperText,
    value,
    onChange,
}) => {

    const timeValue = value.split(':');
    const hours = parseInt(timeValue[0], 10);
    const minutes = parseInt(timeValue[1], 10);

    return (
        <Box pb={4} className={`relative ${error && 'borderRed'}`}>
            <Label required={required} text={label} name={name} />

            <Picker
                placeholder={placeholder}
                helperText={helperText}
                mask
                maskClosable
                title={label}
                suffix={<Icon fontSize={22} className="mr-2" icon="weui:time-outlined" />}
                data={[
                    {
                        options: genTimeData(0, 23, "giờ"),
                        name: "hours",
                    },
                    {
                        options: genTimeData(0, 59, "phút"),
                        name: "minutes",
                    },
                ]}
                formatPickedValueDisplay={(value) => {
                    const hours = value.hours?.value.toString().padStart(2, "0") || "00";
                    const minutes = value.minutes?.value.toString().padStart(2, "0") || "00";
                    return `${hours}:${minutes}`;
                }}
                value={{
                    hours: hours,
                    minutes: minutes,
                }}
                onChange={(selectedValue) => {
                    const formattedTime = `${selectedValue.hours?.value.toString().padStart(2, '0')}:${selectedValue.minutes?.value.toString().padStart(2, '0')}`;
                    onChange(formattedTime); // Cập nhật giá trị vào form
                }}
            />

            {error && <ErrorMessage message={error} />}
        </Box>
    );
};

interface FormControllerTimePickerProps {
    name: string;
    label: string;
    control: Control<any>;
    required?: boolean;
    placeholder?: string;
    helperText?: string;
    error?: string;
}

const FormControllerTimePicker: React.FC<FormControllerTimePickerProps> = ({
    name,
    label,
    control,
    placeholder = "00:00",
    required = false,
    helperText,
    error,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue="00:00"
            render={({ field }) => (
                <TimePicker
                    name={name}
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    required={required}
                    placeholder={placeholder}
                    helperText={helperText}
                    error={error}
                />
            )}
        />
    );
};

export default FormControllerTimePicker;
