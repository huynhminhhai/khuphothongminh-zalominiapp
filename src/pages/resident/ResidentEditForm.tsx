import React, { useEffect, useState } from "react";
import { Box, useNavigate, useSnackbar } from "zmp-ui";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from "components/button";
import { FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField } from "components/form";
import FormControllerRadioGroup from "components/form/FormRadioGroup";
import { ConfirmModal } from "components/modal";
import { FormDataResident, schemaResident } from "./type";
import { useSearchParams } from "react-router-dom";
import { useGetResidentCategory, useGetResidentDetail } from "apiRequest/resident";
import MemberListSkeleton from "components/skeleton/info/MemberListSkeleton";
import { useStoreApp } from "store/store";
import { formatDate } from "utils/date";

const defaultValues: FormDataResident = {
    hoTen: '',
    dienThoai: '',
    loaiCuTruId: 1,
    moiQuanHeVoiChuHo: 0,
    ngaySinh: '',
    gioiTinh: 0,
    soGiayTo: '',
    tonGiao: 0,
    danToc: 0,
    bhyt: '',
    ngheNghiep: '',
    noiLamViec: '',
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
};

const ResidentEditForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { loaiCuTrus, gioiTinhs, danTocs, tonGiaos, moiQuanHeGiaDinhs, fetchResidentTypes } = useStoreApp()

    console.clear()
    console.log(tonGiaos)

    useEffect(() => {
        fetchResidentTypes();
    }, []);

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<any>({})


    const { handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<FormDataResident>({
        resolver: yupResolver(schemaResident),
        defaultValues
    });

    const [searchParams] = useSearchParams();
    const residentId = searchParams.get("id");

    const { data: residentDetailData, isLoading } = useGetResidentDetail((Number(residentId)));

    console.log(residentDetailData)

    useEffect(() => {
        if (residentDetailData) {
            reset({
                moiQuanHeVoiChuHo: residentDetailData.moiQuanHeVoiChuHo,
                hoTen: residentDetailData.hoTen,
                dienThoai: residentDetailData.dienThoai,
                email: residentDetailData.email,
                loaiCuTruId: residentDetailData.noiThuongTru.loaiCuTruId,
                gioiTinh: residentDetailData.gioiTinh,
                ngaySinh: formatDate(residentDetailData.ngaySinh),
                soGiayTo: residentDetailData.soGiayTo,
                ngheNghiep: residentDetailData.ngheNghiep,
                danToc: Number(residentDetailData.danToc),
                tonGiao: Number(residentDetailData.tonGiao),
            });
        }
    }, [reset, residentDetailData])

    const { data: residentCategoryData, } = useGetResidentCategory();

    console.log(residentCategoryData)

    if (isLoading) return <MemberListSkeleton />;

    const onSubmit: SubmitHandler<FormDataResident> = (data) => {

        const updatedData = {};

        let hasChanges = false;

        // Duyệt qua tất cả các trường và so sánh với giá trị mặc định
        Object.keys(data).forEach((key) => {
            if (data[key] !== formData[key]) {
                updatedData[key] = data[key];
                hasChanges = true;
            }
        });

        if (!hasChanges) {
            openSnackbar({
                icon: true,
                text: "Không có thay đổi nào để cập nhật.",
                type: 'warning',
                duration: 3000,
            });
            return; // Không thực hiện tiếp tục gửi yêu cầu
        }

        setConfirmVisible(true);

        setFormData({ ...updatedData, id: formData.id })
    };

    const handleConfirm = () => {
        setConfirmVisible(false);
        if (formData) {
            // fetchApi()
        }
    };

    const handleCancel = () => {
        console.log("Cancelled!");
        setConfirmVisible(false);
    };

    // // Thường trú
    // const selectedPermanentProvince = watch("provincePermanent");
    // const selectedPermanentDistrict = watch("districtPermanent");

    // const { provinces: provincesPermanent, districts: districtsPermanent, wards: wardsPermanent } = useAddress(selectedPermanentProvince, selectedPermanentDistrict);

    // // Quê quán
    // const selectedProvince = watch("province");
    // const selectedDistrict = watch("district");

    // const { provinces, districts, wards } = useAddress(selectedProvince, selectedDistrict);

    // useEffect(() => {
    //     setValue('districtPermanent', 0)
    //     setValue('wardsPermanent', 0)
    // }, [selectedPermanentProvince, setValue])

    // useEffect(() => {
    //     setValue('wardsPermanent', 0)
    // }, [selectedPermanentDistrict, setValue])

    // useEffect(() => {
    //     setValue('district', 0)
    //     setValue('ward', 0)
    // }, [selectedProvince, setValue])

    // useEffect(() => {
    //     setValue('ward', 0)
    // }, [selectedDistrict, setValue])

    // useEffect(() => {
    //     if (formData) {
    //         reset(formData);
    //         setValue("district", formData.district || 0);
    //         setValue("ward", formData.ward || 0);
    //         setValue("districtPermanent", formData.districtPermanent || 0);
    //         setValue("wardsPermanent", formData.wardsPermanent || 0);
    //     }
    // }, [formData, reset, setValue]);

    // useEffect(() => {
    //     // Hàm gọi API để lấy thông tin thành viên
    //     const fetchResidentData = async () => {
    //         setLoading(true);
    //         try {
    //             // Giả sử API trả về thông tin thành viên
    //             // const response = await fetch(`/api/residents/${residentId}`);
    //             // const data = await response.json();

    //             const data = RESIDENT.find(resident => resident.id === Number(residentId))

    //             if (data) {
    //                 setFormData(data)
    //                 reset(data)
    //             }

    //         } catch (error) {
    //             console.error("Failed to fetch resident data:", error);
    //             openSnackbar({
    //                 text: "Không thể tải thông tin thành viên. Vui lòng thử lại sau.",
    //                 type: "error",
    //                 duration: 5000,
    //             });
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchResidentData();
    // }, [residentId]);



    // const fetchApi = () => {
    //     setLoading(true);
    //     try {
    //         // Gọi API thêm thành viên
    //         console.log('call api update with: ', formData);
    //         // Thành công
    //         openSnackbar({
    //             icon: true,
    //             text: "Yêu cầu cập nhật thông tin thành viên thành công",
    //             type: 'success',
    //             action: { text: "Đóng", close: true },
    //             duration: 5000,
    //         });
    //         reset(defaultValues);
    //         navigate('/resident-member');
    //     } catch (error) {
    //         console.error('Error:', error);
    //         openSnackbar({
    //             icon: true,
    //             text: "Có lỗi xảy ra, vui lòng thử lại sau.",
    //             type: 'error',
    //             action: { text: "Đóng", close: true },
    //             duration: 5000,
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // }



    return (
        <Box p={4}>
            <form>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormSelectField
                            // disabled={getValues().moiQuanHeVoiChuHo === 0}
                            name="moiQuanHeVoiChuHo"
                            label="Quan hệ với chủ hộ"
                            placeholder={"Chọn quan hệ với chủ hộ"}
                            control={control}
                            options={moiQuanHeGiaDinhs}
                            error={errors.moiQuanHeVoiChuHo?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="hoTen"
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
                            control={control}
                            error={errors.hoTen?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="dienThoai"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            control={control}
                            error={errors.dienThoai?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="email"
                            label="Email"
                            placeholder="Nhập email"
                            control={control}
                            error={errors.email?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormControllerRadioGroup
                            name="loaiCuTruId"
                            control={control}
                            label="Loại cư trú"
                            options={loaiCuTrus}
                            required
                        />
                    </div>
                    {/* <div className="col-span-12 flexCol">
                        <FormControllerRadioGroup
                            name="residenceStatus"
                            control={control}
                            label="Tình trạng"
                            options={residentStatus}
                            required
                        />
                    </div> */}
                    {/* <div className="col-span-12">
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
                    </div> */}
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="address"
                            label=""
                            placeholder="Nhập địa chỉ chi tiết"
                            control={control}
                            error={errors.address?.message}
                        />
                    </div>
                    {/* <div className="col-span-12">
                        <FormSelectField
                            name="provincePermanent"
                            label="Địa chỉ thường trú"
                            placeholder="Chọn tỉnh/thành phố"
                            control={control}
                            options={provincesPermanent}
                            error={errors.provincePermanent?.message}
                            required
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
                        />
                    </div> */}
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="addressPermanent"
                            label=""
                            placeholder="Nhập địa chỉ chi tiết"
                            control={control}
                            error={errors.addressPermanent?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormControllerDatePicker
                            name="ngaySinh"
                            label="Ngày sinh"
                            control={control}
                            placeholder="Chọn ngày sinh"
                            required
                            dateFormat="dd/mm/yyyy"
                            error={errors.ngaySinh?.message}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="gioiTinh"
                            label="Giới tính"
                            placeholder="Chọn giới tính"
                            control={control}
                            options={gioiTinhs}
                            error={errors.gioiTinh?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="soGiayTo"
                            label="Số định danh cá nhân"
                            placeholder="Nhập số định danh cá nhân"
                            control={control}
                            error={errors.soGiayTo?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="tonGiao"
                            label="Tôn giáo"
                            placeholder="Nhập tôn giáo"
                            control={control}
                            options={tonGiaos}
                            error={errors.tonGiao?.message}
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <FormSelectField
                            name="danToc"
                            label="Dân tộc"
                            placeholder="Nhập dân tộc"
                            control={control}
                            options={danTocs}
                            error={errors.danToc?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="ngheNghiep"
                            label="Nghề nghiệp"
                            placeholder="Nhập nghề nghiệp"
                            control={control}
                            error={errors.ngheNghiep?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputField
                            name="noiLamViec"
                            label="Nơi làm việc"
                            placeholder="Nhập nơi làm việc"
                            control={control}
                            error={errors.noiLamViec?.message}
                            required
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
                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-1">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Gửi yêu cầu cập nhật thông tin"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </form>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn gửi yêu cầu cập nhật thông tin thành viên này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default ResidentEditForm;