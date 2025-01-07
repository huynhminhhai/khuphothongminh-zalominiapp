import React from "react";
import { Box } from "zmp-ui";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PrimaryButton } from "components/button";
import { FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField } from "components/form";
import { gender, residentRealationships } from "constants/mock";
import FormControllerRadioGroup from "components/form/FormRadioGroup";

const schema = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    address: yup.string().required('Địa chỉ không được để trống'),
    gender: yup.string().required('Chưa chọn giới tính'),
    birthDate: yup.string().required('Chưa chọn ngày sinh'),
    relationship: yup.string().required("Chưa chọn mục này"),
    numberCard: yup.number().required("CCCD không được để trống"),
    dateCard: yup.string().required("Chưa chọn mục này"),
    religion: yup.string().required("Không được để trống"),
    nation: yup.string().required("Không được để trống"),
    residenceType: yup.number().required("Chưa chọn mục này"),

});

type FormData = {
    fullname: string;
    phoneNumber: string;
    residenceType: number;
    address: string;
    relationship: string;
    birthDate: string;
    gender: string;
    numberCard: number;
    dateCard: string;
    religion: string;
    nation: string;
};

const ResidentAddForm: React.FC = () => {

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            residenceType: 1
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    return (
        <Box p={4}>
            <form>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormSelectField
                            name="relationship"
                            label="Quan hệ với chủ hộ"
                            placeholder="Chọn quan hệ với chủ hộ"
                            control={control}
                            options={residentRealationships}
                            error={errors.relationship?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="fullname"
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
                            control={control}
                            error={errors.fullname?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="phoneNumber"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            control={control}
                            error={errors.phoneNumber?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerRadioGroup
                            name="residenceType"
                            control={control}
                            label="Loại cư trú"
                            options={[
                                { value: 1, label: "Thường trú" },
                                { value: 2, label: "Tạm trú" },
                            ]}
                            required
                        />
                    </div>
                    <div className="col-span-12 flexCol">
                        <FormControllerRadioGroup
                            name="status"
                            control={control}
                            label="Tình trạng"
                            options={[
                                { value: 1, label: "Rời khỏi nơi cư trú" },
                                { value: 2, label: "Tham gia nghĩa vụ quân sự" },
                                { value: 3, label: "Khai tử" },
                            ]}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="address"
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            control={control}
                            error={errors.address?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerDatePicker
                            name="birthDate"
                            label="Ngày sinh"
                            control={control}
                            placeholder="Chọn ngày sinh"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.birthDate?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="gender"
                            label="Giới tính"
                            placeholder="Chọn giới tính"
                            control={control}
                            options={gender}
                            error={errors.gender?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            name="numberCard"
                            label="CCCD/Mã định danh"
                            placeholder="Nhập CCCD/Mã định danh"
                            control={control}
                            error={errors.numberCard?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerDatePicker
                            name="dateCard"
                            label="Ngày cấp"
                            control={control}
                            placeholder="Chọn ngày cấp"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.dateCard?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            name="religion"
                            label="Tôn giáo"
                            placeholder="Nhập tôn giáo"
                            control={control}
                            error={errors.religion?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputField
                            name="nation"
                            label="Dân tộc"
                            placeholder="Nhập dân tộc"
                            control={control}
                            error={errors.nation?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <Box py={4} pt={6} flex alignItems="center" justifyContent="center">
                            <PrimaryButton label="Gửi yêu cầu thêm thành viên" handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </form>
        </Box>
    )
}

export default ResidentAddForm;