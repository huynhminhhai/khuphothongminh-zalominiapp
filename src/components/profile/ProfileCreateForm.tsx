import React, { useEffect, useState } from "react"
import { Box, Checkbox, Switch, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploaderSingle, FormInputAreaField, FormInputField, FormSelectField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataProfile, schemaProfile } from "./type"
import { economicStatus, gender, jobs, residentRealationships, residentStatus, residentType } from "constants/mock"
import FormControllerRadioGroup from "components/form/FormRadioGroup"
import { RESIDENT } from "constants/utinities"

const defaultValues: FormDataProfile = {
    fullname: '',
    phoneNumber: '',
    residenceType: 1,
    residenceStatus: 1,
    address: '',
    relationship: 0,
    birthDate: '',
    gender: 0,
    numberCard: '',
    dateCard: '',
    religion: '',
    nation: '',
    bhyt: '',
    economicStatus: 1,
    culturalFamilyStatus: true,
    parentId: 0,
}

const ProfileAddForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataProfile>(defaultValues)
    const [isHouseHold, setIsHoldHouse] = useState<boolean>(false)
    const [houseHoldOptions, setHouseHoldOptions] = useState<{
        value: number;
        label: string;
    }[]>([])

    const { handleSubmit, reset, control, watch, formState: { errors } } = useForm<FormDataProfile>({
        resolver: yupResolver(schemaProfile(isHouseHold)),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataProfile> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        if (isHouseHold) {
            reset({
                ...watch(),
                parentId: defaultValues.parentId,
                relationship: defaultValues.relationship,
                address: defaultValues.address
            })
        }
    }, [isHouseHold])

    useEffect(() => {
        const household = RESIDENT.filter((item) => item.isHouseHold).map((item) => ({
            value: item.id,
            label: item.fullname
        }));

        setHouseHoldOptions(household)
    }, [])

    useEffect(() => {
        if (watch().parentId) {
            fetchApiResident()
        }
    }, [watch().parentId])

    const fetchApi = () => {
        setLoading(true);
        try {
            console.log('call api add with: ', { ...formData });

            openSnackbar({
                icon: true,
                text: "Thêm hồ sơ thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/resident-management');
        } catch (error) {
            console.error('Error:', error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    const fetchApiResident = () => {
        setLoading(true);
        try {
            const data = RESIDENT.find((item) => item.id === Number(watch().parentId))

            if ( data) {
                console.log(data)
                reset({
                    ...watch(),
                    address: data.address,
                    culturalFamilyStatus: data.culturalFamilyStatus,
                    economicStatus: data.economicStatus
                })
            } else {
                reset({
                    ...watch(),
                    address: defaultValues.address,
                    culturalFamilyStatus: defaultValues.culturalFamilyStatus,
                    economicStatus: defaultValues.economicStatus
                })
            }
        } catch (error) {
            console.error('Error:', error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            fetchApi()
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };
    
    return (
        <Box p={4}>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">

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
                    <div className="col-span-12">
                        <FormInputField
                            type="number"
                            name="numberCard"
                            label="Số định danh cá nhân"
                            placeholder="Nhập số định danh cá nhân"
                            control={control}
                            error={errors.numberCard?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
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
                        <div className="flex items-center gap-2 mb-2">
                            <Switch label="" onClick={() => setIsHoldHouse(!isHouseHold)} />
                            <span className="font-medium">Chủ hộ</span>
                        </div>
                    </div>
                    {
                        !isHouseHold &&
                        <>
                            <div className="col-span-12">
                                <FormSelectField
                                    name="parentId"
                                    label="Chủ hộ"
                                    placeholder="Chọn chủ hộ"
                                    control={control}
                                    options={houseHoldOptions}
                                    error={errors.parentId?.message as string}
                                    required
                                />
                            </div>
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
                                <FormControllerRadioGroup
                                    name="residenceType"
                                    control={control}
                                    label="Loại cư trú"
                                    options={residentType}
                                    required
                                />
                            </div>
                            <div className="col-span-12 flexCol">
                                <FormControllerRadioGroup
                                    name="residenceStatus"
                                    control={control}
                                    label="Tình trạng"
                                    options={residentStatus}
                                    required
                                />
                            </div>
                        </>
                    }
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="address"
                            disabled={!isHouseHold}
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            control={control}
                            error={errors.address?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormSelectField
                            name="job"
                            label="Nghề nghiệp"
                            placeholder="Chọn nghề nghiệp"
                            control={control}
                            options={jobs}
                            error={errors.job?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="bhyt"
                            label="Bảo hiểm y tế"
                            placeholder="Nhập mã bảo hiểm y tế"
                            control={control}
                            error={errors.bhyt?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormSelectField
                            disabled={!isHouseHold}
                            name="economicStatus"
                            label="Tình trạng hộ"
                            placeholder="Chọn tình trạng hộ"
                            control={control}
                            options={economicStatus}
                            error={errors.economicStatus?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">

                        <Controller
                            name={'culturalFamilyStatus'}
                            control={control}
                            defaultValue={undefined}
                            render={({ field }) => (
                                <div className="flex items-center gap-2 mb-2">
                                    <Checkbox disabled={!isHouseHold} value={''} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                    <span className="font-medium">Gia đình văn hóa</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm hồ sơ"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm hồ sơ này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ProfileAddForm