import React, { useEffect, useState } from "react"
import { Box, Checkbox, Switch, useNavigate, useSnackbar } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormImageUploaderSingle, FormInputAreaField, FormInputField, FormSelectField, FormTextEditorField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataProfile, schemaProfile } from "./type"
import { economicStatus, ethnicOptions, gender, jobs, religionOptions, residentRealationships, residentStatus, residentType } from "constants/mock"
import FormControllerRadioGroup from "components/form/FormRadioGroup"
import { RESIDENT } from "constants/utinities"
import { useSearchParams } from "react-router-dom"
import useAddress from "utils/useAddress"

const defaultValues: FormDataProfile = {
    fullname: '',
    phoneNumber: '',
    residenceType: 1,
    residenceStatus: 1,
    relationship: 0,
    birthDate: '',
    gender: 0,
    numberCard: '',
    dateCard: '',
    religion: 0,
    nation: 0,
    bhyt: '',
    economicStatus: 1,
    culturalFamilyStatus: true,
    parentId: 0,
    // Thường trú
    addressPermanent: '',
    provincePermanent: 0,
    districtPermanent: 0,
    wardsPermanent: 0,
    // quê quán
    address: '',
    province: 0,
    district: 0,
    ward: 0
}

const ProfileUpdateForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const profileId = searchParams.get("id");

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataProfile>(defaultValues)
    const [isHouseHold, setIsHoldHouse] = useState<boolean>(false)
    const [houseHoldOptions, setHouseHoldOptions] = useState<{
        value: number;
        label: string;
    }[]>([])

    const { handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<FormDataProfile>({
        resolver: yupResolver(schemaProfile(isHouseHold)),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataProfile> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    // Thường trú
    const selectedPermanentProvince = watch("provincePermanent");
    const selectedPermanentDistrict = watch("districtPermanent");

    const { provinces: provincesPermanent, districts: districtsPermanent, wards: wardsPermanent } = useAddress(selectedPermanentProvince, selectedPermanentDistrict);

    // Quê quán
    const selectedProvince = watch("province");
    const selectedDistrict = watch("district");

    const { provinces, districts, wards } = useAddress(selectedProvince, selectedDistrict);

    useEffect(() => {
        if (isHouseHold) {
            setValue('districtPermanent', 0)
            setValue('wardsPermanent', 0)
        }
    }, [selectedPermanentProvince, setValue, isHouseHold])

    useEffect(() => {
        if (isHouseHold) {
            setValue('wardsPermanent', 0)
        }
    }, [selectedPermanentDistrict, setValue, isHouseHold])

    useEffect(() => {
        setValue('district', 0)
        setValue('ward', 0)
    }, [selectedProvince, setValue])

    useEffect(() => {
        setValue('ward', 0)
    }, [selectedDistrict, setValue])

    useEffect(() => {
        if (formData) {
            reset(formData);
            setValue("district", formData.district || 0);
            setValue("ward", formData.ward || 0);
            setValue("districtPermanent", formData.districtPermanent || 0);
            setValue("wardsPermanent", formData.wardsPermanent || 0);
        }
    }, [formData, reset, setValue]);

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchResidentData = async () => {
            setLoading(true);
            try {

                const data = RESIDENT.find(resident => resident.id === Number(profileId))

                if (data) {

                    if (!data.parentId) {
                        setIsHoldHouse(true)
                    }

                    setFormData({...data, parentId: data.parentId || 0})
                    reset({...data, parentId: data.parentId || 0})
                }

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
    }, [profileId]);

    useEffect(() => {

        if (isHouseHold) {
            setValue('parentId', defaultValues.parentId)
            setValue('relationship', defaultValues.relationship)
            // setValue('provincePermanent', defaultValues.provincePermanent)
            // setValue('districtPermanent', defaultValues.districtPermanent)
            // setValue('wardsPermanent', defaultValues.wardsPermanent)
            // setValue('addressPermanent', defaultValues.addressPermanent)
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
            console.log('call api update with: ', { ...formData });

            openSnackbar({
                icon: true,
                text: "Cập nhật thông tin hồ sơ thành công",
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

            if (data) {
                setValue('provincePermanent', data.provincePermanent)
                setValue('addressPermanent', data.addressPermanent)
                setValue('districtPermanent', data.districtPermanent)
                setValue('wardsPermanent', data.wardsPermanent)
                setValue('culturalFamilyStatus', data.culturalFamilyStatus)
                setValue('economicStatus', data.economicStatus)
            } else {
                setValue('provincePermanent', defaultValues.provincePermanent)
                setValue('addressPermanent', defaultValues.addressPermanent)
                setValue('districtPermanent', defaultValues.districtPermanent)
                setValue('wardsPermanent', defaultValues.wardsPermanent)
                setValue('culturalFamilyStatus', defaultValues.culturalFamilyStatus)
                setValue('economicStatus', defaultValues.economicStatus)
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
                        <FormSelectField
                            name="religion"
                            label="Tôn giáo"
                            placeholder="Nhập tôn giáo"
                            control={control}
                            options={religionOptions}
                            error={errors.religion?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="nation"
                            label="Dân tộc"
                            placeholder="Nhập dân tộc"
                            control={control}
                            options={ethnicOptions}
                            error={errors.nation?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <div className="flex items-center gap-2 mb-2">
                            <Switch checked={isHouseHold} label="" onChange={() => setIsHoldHouse(!isHouseHold)} />
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
                        <FormSelectField
                            name="province"
                            label="Quê quán"
                            placeholder="Chọn tỉnh/thành phố"
                            control={control}
                            options={provinces}
                            error={errors.province?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="district"
                            label=""
                            placeholder="Chọn quận/huyện"
                            control={control}
                            options={districts}
                            error={errors.district?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="ward"
                            label=""
                            placeholder="Chọn phường/xã"
                            control={control}
                            options={wards}
                            error={errors.ward?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="address"
                            label=""
                            placeholder="Nhập địa chỉ chi tiết"
                            control={control}
                            error={errors.address?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="provincePermanent"
                            label="Địa chỉ thường trú"
                            placeholder="Chọn tỉnh/thành phố"
                            control={control}
                            options={provincesPermanent}
                            error={errors.provincePermanent?.message}
                            required
                            disabled={!isHouseHold}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="districtPermanent"
                            label=""
                            placeholder="Chọn quận/huyện"
                            control={control}
                            options={districtsPermanent}
                            error={errors.districtPermanent?.message}
                            disabled={!isHouseHold}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="wardsPermanent"
                            label=""
                            placeholder="Chọn phường/xã"
                            control={control}
                            options={wardsPermanent}
                            error={errors.wardsPermanent?.message}
                            disabled={!isHouseHold}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="addressPermanent"
                            label=""
                            placeholder="Nhập địa chỉ chi tiết"
                            control={control}
                            error={errors.addressPermanent?.message}
                            disabled={!isHouseHold}
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
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Cập nhật thông tin hồ sơ"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn cập nhật thông tin hồ sơ này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ProfileUpdateForm