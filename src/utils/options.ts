interface Option {
    value: any;
    label: string;
}

export interface OptionsType {
    value: any;
    label: string;
}

export function getLabelOptions(value: number | string, options: Option[]): string | undefined {
    const option = options.find(option => option.value === Number(value));
    return option ? option.label : undefined;
}


export const convertToValueLabel = (data: { id: number, name: string }[]) => {
    return data.map(item => ({
        value: item.id,
        label: item.name
    }));
};

export const convertResidentTypes = (data: any[]) => {
    return data.map(item => ({
        value: item.loaiCuTruId,
        label: item.tenLoaiCuTru
    }));
};