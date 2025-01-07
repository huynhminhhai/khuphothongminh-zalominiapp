interface Option {
    value: any;
    label: string;
}

export function getLabelOptions(value: number | string, options: Option[]): string | undefined {
    const option = options.find(option => option.value === Number(value));
    return option ? option.label : undefined;
}
  