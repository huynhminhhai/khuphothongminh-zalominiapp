import React, { useEffect, useMemo, useState } from "react"
import { Box, Switch } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormDataTeam, schemaTeam } from "./type"
import { setAddressWithoutPrefixStepByStep, useAddressSelectorWithoutPrefix } from "utils/useAddress"
import { useStoreApp } from "store/store"
import { useCreateTeam, useGetTeamType } from "apiRequest/team"
import { omit } from "lodash"

const defaultValues: FormDataTeam = {
    maHuyen: '',
    maXa: '',
    apId: 0,
    hoTen: '',
    chucVuId: 0,
    tuNgay: '',
    denNgay: '',
    hoatDong: true,
    nguoiTao: 0,
    tenDangNhap: '',
    matKhau: ''
}

const TeamAddForm: React.FC = () => {

    const { account, tinhs, hasRole } = useStoreApp();

    const [loading, setLoading] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataTeam>(defaultValues)
    const [isUpdateAccount, setIsUpdateAccount] = useState(true);

    const { handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<FormDataTeam>({
        resolver: yupResolver(schemaTeam(isUpdateAccount)),
        defaultValues
    });

    const { mutateAsync: createTeam, isPending } = useCreateTeam();
    const { data: teamStatus } = useGetTeamType();

    const chucVus = useMemo(() => {
        return teamStatus?.chucVus?.map((item) => ({
            value: item.chucVuId,
            label: item.tenChucVu
        })) || [];
    }, [teamStatus]);

    const teamAddress = useAddressSelectorWithoutPrefix({
        tinhOptions: tinhs,
        watch,
        setValue,
    });

    const onSubmit: SubmitHandler<FormDataTeam> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    useEffect(() => {
        if (account) {

            const {
                maXa = "",
                maHuyen = "",
                apId = 0,
            } = account || {};

            reset({
                ...watch(),
                maXa: maXa,
                maHuyen: maHuyen,
                apId: apId,
            })

            setAddressWithoutPrefixStepByStep(
                { maTinh: '80', maHuyen, maXa, apId },
                setValue
            );
        }
    }, [account])



    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {

            const dataSubmit = {
                ...(isUpdateAccount ? formData : omit(formData, ['tenDangNhap', 'matKhau'])),
                nguoiTao: account?.nguoiDungId,
            };

            await createTeam(dataSubmit);

            reset(defaultValues);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    return (
        <Box p={4}>
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <h3 className="text-[16px] font-semibold mb-3">Thông tin cơ bản</h3>
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="maHuyen"
                            label="Quận/Huyện"
                            placeholder="Chọn quận/huyện"
                            control={control}
                            options={teamAddress.huyenOptions}
                            error={errors.maHuyen?.message}
                            required
                            disabled={!hasRole('Administrators')}
                        />
                    </div>
                    <div className="col-span-12">
                        <FormSelectField
                            name="maXa"
                            label="Phường/Xã"
                            placeholder="Chọn phường/xã"
                            control={control}
                            options={teamAddress.xaOptions}
                            error={errors.maXa?.message}
                            required
                            disabled={!teamAddress.watchedHuyen || !hasRole('Administrators')}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormSelectField
                            name="apId"
                            label="Ấp"
                            placeholder="Chọn ấp"
                            control={control}
                            options={teamAddress.apOptions}
                            error={errors.apId?.message}
                            required
                            disabled={!teamAddress.watchedXa || !hasRole('Administrators')}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormInputField
                            name="hoTen"
                            label="Họ tên"
                            placeholder="Nhập họ tên"
                            control={control}
                            error={errors.hoTen?.message}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <FormSelectField
                            name="chucVuId"
                            label="Chức vụ"
                            placeholder="Chọn chức vụ"
                            control={control}
                            options={chucVus}
                            error={errors.chucVuId?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="tuNgay"
                            label="Ngày bắt đầu nhiệm kỳ"
                            control={control}
                            placeholder="Chọn ngày bắt đầu nhiệm kỳ"
                            required
                            error={errors.tuNgay?.message}
                        />
                    </div>

                    <div className="col-span-12">
                        <FormControllerDatePicker
                            name="denNgay"
                            label="Ngày kết thúc nhiệm kỳ"
                            control={control}
                            placeholder="Chọn ngày kết thúc nhiệm kỳ"
                            required
                            error={errors.denNgay?.message}
                        />
                    </div>
                    <div className="col-span-12">
                        <div className="flex items-center gap-2 mb-2">
                            <Switch checked={isUpdateAccount} onClick={() => setIsUpdateAccount(!isUpdateAccount)} />
                            <span className="font-medium"> (Chọn để tạo/sửa tài khoản đăng nhập) </span>
                        </div>
                    </div>
                    {
                        isUpdateAccount &&
                        <>
                            <div className="col-span-12">
                                <h3 className="text-[16px] font-semibold mt-3 mb-3">Thông tin tài khoản</h3>
                            </div>
                            <div className="col-span-12">
                                <FormInputField
                                    name="tenDangNhap"
                                    label="Tên đăng nhập"
                                    placeholder="Nhập tên đăng nhập"
                                    control={control}
                                    error={errors.tenDangNhap?.message}
                                    required
                                />
                            </div>

                            <div className="col-span-12">
                                <FormInputField
                                    name="matKhau"
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    control={control}
                                    error={errors.matKhau?.message}
                                    required
                                />
                            </div>

                            <div className="col-span-12">
                                <strong>Yêu cầu mật khẩu:</strong>
                                <ul>
                                    <li>+ Tối thiểu 8 ký tự</li>
                                    <li>+ Có ít nhất 1 chữ viết hoa</li>
                                    <li>+ Có ít nhất 1 chữ viết thường</li>
                                    <li>+ Có ít nhất 1 chữ số (0-9)</li>
                                    <li>+ Có ít nhất 1 ký tự đặc biệt (!, @, #, $, %)</li>
                                </ul>
                            </div>
                        </>
                    }

                    <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
                        <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                            <PrimaryButton fullWidth label={loading ? "Đang xử lý..." : "Thêm thành viên"} handleClick={handleSubmit(onSubmit)} />
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm nhân sự này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default TeamAddForm