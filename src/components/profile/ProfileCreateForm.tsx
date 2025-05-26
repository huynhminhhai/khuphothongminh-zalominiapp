import React, { useEffect, useMemo, useState } from "react"
import { Box, Switch } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormResidentDetail, residentSchema } from "./type"
import { useStoreApp } from "store/store"
import { useCreateResident, useGetChuHosList } from "apiRequest/resident"
import http from "services/http"
import { setAddressStepByStep, useResidentAddress } from "utils/useAddress"
import { omit } from "lodash"
import { MapPicker } from "components/maps"

const ProfileAddForm: React.FC = () => {

  const { ngheNghieps, tinhTrangHoGiaDinhs, danTocs, gioiTinhs, moiQuanHeGiaDinhs, tinhs, tonGiaos, account } = useStoreApp()

  const defaultValues: FormResidentDetail = {
    laChuHo: false,
    chuHoId: 0,
    hoTen: '',
    ngaySinh: '',
    gioiTinh: 0,
    soGiayTo: '',
    danToc: '',
    tonGiao: '',
    quocGia: 'VN',
    ngheNghiep: 1,
    noiLamViec: '',
    email: '',
    dienThoai: null,
    moiQuanHeVoiChuHo: 0,
    tinhTrangHoGiaDinhId: tinhTrangHoGiaDinhs[0]?.value ?? 29,
    giaDinhVanHoa: false,
    noiThuongTru: {
      diaChi: '',
      apId: 0,
      xa: '',
      huyen: '',
      tinh: '',
      latitude: null,
      longitude: null,
      tuNgay: null,
      denNgay: null,
    },
    noiTamTru: {
      diaChi: '',
      apId: 0,
      xa: '',
      huyen: '',
      tinh: '',
      latitude: null,
      longitude: null,
      tuNgay: null,
      denNgay: null,
    },
  };

  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState<FormResidentDetail>(defaultValues)
  const [isHouseHold, setIsHouseHold] = useState<boolean>(false)

  const { handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<FormResidentDetail>({
    resolver: yupResolver(residentSchema(isHouseHold)),
    defaultValues
  });

  const { data: chuHos } = useGetChuHosList();
  const { mutateAsync: createResident, isPending } = useCreateResident();

  const thuongTruAddress = useResidentAddress("noiThuongTru", tinhs, watch, setValue);
  const tamTruAddress = useResidentAddress("noiTamTru", tinhs, watch, setValue);

  const houseHoldOptions = useMemo(() => {
    return chuHos?.map((item) => ({
      value: item.danCuId,
      label: item.hoTen
    })) || [];
  }, [chuHos]);


  const onSubmit: SubmitHandler<FormResidentDetail> = (data) => {
    setConfirmVisible(true);
    setFormData(data)
  };

  useEffect(() => {
    if (account) {

      const {
        maTinh = "",
        maXa = "",
        maHuyen = "",
        apId = 0
      } = account || {};

      reset({
        ...watch(),
        noiThuongTru: {
          ...watch().noiThuongTru,
          apId,
          xa: maXa,
          huyen: maHuyen,
          tinh: maTinh,
        }
      });

      setAddressStepByStep("noiThuongTru", { tinh: '80', huyen: maHuyen, xa: maXa, apId }, setValue);
    }
  }, [account])

  /**
  * CALL CHU HO API
  **/

  useEffect(() => {
    if (watch().chuHoId) {
      fetchApiResident()
    }
  }, [watch().chuHoId])

  const fetchApiResident = async () => {
    try {
      const response = await http.get<any>(`/dancu/chitiet/${watch().chuHoId}`);
      const chuHoData = response.data;

      const {
        diaChi = '',
        apId = 0,
        xa = '',
        huyen = '',
        tinh = '',
        latitude = null,
        longitude = null,
        tuNgay = null,
        denNgay = null,
      } = chuHoData.noiThuongTru || {};

      reset({
        ...watch(),
        noiThuongTru: {
          ...watch().noiThuongTru,
          diaChi,
          apId,
          xa,
          huyen,
          tinh,
          latitude,
          longitude,
          tuNgay,
          denNgay,
        },
        tinhTrangHoGiaDinhId: chuHoData.tinhTrangHoGiaDinhId,
        giaDinhVanHoa: chuHoData.giaDinhVanHoa
      });

      await setAddressStepByStep("noiThuongTru", { tinh, huyen, xa, apId }, setValue);

    } catch (error) {
      console.error('Lỗi khi gọi API resident detail:', error);
    }
  }

  const handleConfirm = async () => {
    setConfirmVisible(false);
    try {

      if (!account) {
        console.error("Error: account is null");
        return;
      }

      if (!formData) {
        console.error("Error: formData is null");
        return;
      }

      let dataSubmit = {
        ...formData,
        laChuHo: isHouseHold,
        apId: account.apId,
        ...(isHouseHold
          ? { moiQuanHeVoiChuHo: 1, chuHoId: null }
          : {}),
      };

      if (isHouseHold || !formData.noiTamTru || formData.noiTamTru.apId === 0 || (formData.noiTamTru.apId as any) === "") {
        dataSubmit = {
          ...omit(dataSubmit, ['noiTamTru']),
          tinhTrangHoGiaDinhId: defaultValues.tinhTrangHoGiaDinhId,
          giaDinhVanHoa: defaultValues.giaDinhVanHoa
        };
      }

      await createResident(dataSubmit);

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
            <div className="text-[20px] font-semibold mb-3 text-primary-color">Thông tin cá nhân</div>
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
              type="number"
              name="soGiayTo"
              label="Số định danh cá nhân"
              placeholder="Nhập số định danh cá nhân"
              control={control}
              error={errors.soGiayTo?.message}
              required
            />
          </div>
          <div className="col-span-6">
            <FormControllerDatePicker
              name="ngaySinh"
              label="Ngày sinh"
              control={control}
              placeholder="Chọn ngày sinh"
              required
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
          <div className="col-span-12">
            <FormInputField
              name="dienThoai"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              control={control}
              error={errors.dienThoai?.message}
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="email"
              label="Email"
              placeholder="Nhập email"
              control={control}
              error={errors.email?.message}
            />
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="ngheNghiep"
              label="Nghề nghiệp"
              placeholder="Chọn nghề nghiệp"
              control={control}
              options={ngheNghieps}
              error={errors.ngheNghiep?.message}
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="noiLamViec"
              label="Nơi làm việc"
              placeholder="Nhập nơi làm việc"
              control={control}
              error={errors.noiLamViec?.message}
            />
          </div>
          <div className="col-span-12">
            <div className="flex items-center gap-2 mb-2 mt-3">
              <Switch label="" onClick={() => setIsHouseHold(!isHouseHold)} />
              <span className="font-medium">Chủ hộ</span>
            </div>
          </div>
          {!isHouseHold && (
            <>
              <div className="col-span-12">
                <FormSelectField
                  name="chuHoId"
                  label="Chủ hộ"
                  placeholder="Chọn chủ hộ"
                  control={control}
                  options={houseHoldOptions}
                  error={errors.chuHoId?.message}
                  required
                />
              </div>
              <div className="col-span-12">
                <FormSelectField
                  name="moiQuanHeVoiChuHo"
                  label="Quan hệ với chủ hộ"
                  placeholder="Chọn quan hệ với chủ hộ"
                  control={control}
                  options={moiQuanHeGiaDinhs}
                  error={errors.moiQuanHeVoiChuHo?.message}
                  required
                />
              </div>
            </>
          )}
          <div className="col-span-12">
            <div className="text-[20px] font-semibold mb-3 mt-2 text-primary-color">Nơi thường trú</div>
          </div>
          {/* Nơi thường trú */}
          <div className="col-span-12">
            <FormSelectField
              name="noiThuongTru.tinh"
              label="Địa chỉ thường trú"
              placeholder="Chọn tỉnh/thành phố"
              control={control}
              options={tinhs}
              error={errors.noiThuongTru?.tinh?.message}
              required
              disabled={!isHouseHold}
            />
          </div>
          <div className="col-span-12">
            <FormSelectField
              name="noiThuongTru.huyen"
              label=""
              placeholder="Chọn quận/huyện"
              control={control}
              options={thuongTruAddress.huyenOptions}
              error={errors.noiThuongTru?.huyen?.message}
              disabled={!isHouseHold || !thuongTruAddress.watchedTinh}
            />
          </div>
          <div className="col-span-6">
            <FormSelectField
              name="noiThuongTru.xa"
              label=""
              placeholder="Chọn phường/xã"
              control={control}
              options={thuongTruAddress.xaOptions}
              error={errors.noiThuongTru?.xa?.message}
              disabled={!isHouseHold || !thuongTruAddress.watchedHuyen}
            />
          </div>
          <div className="col-span-6">
            <FormSelectField
              name="noiThuongTru.apId"
              label=""
              placeholder="Chọn khu phố/ấp"
              control={control}
              options={thuongTruAddress.apOptions}
              error={errors.noiThuongTru?.apId?.message}
              disabled={!isHouseHold || !thuongTruAddress.watchedXa}
            />
          </div>
          <div className="col-span-12">
            <FormInputAreaField
              name="noiThuongTru.diaChi"
              label=""
              placeholder="Nhập địa chỉ chi tiết"
              control={control}
              error={errors.noiThuongTru?.diaChi?.message}
              disabled={!isHouseHold}
            />
          </div>
          <div className="col-span-6">
            <FormInputField
              type="number"
              name="noiThuongTru.latitude"
              placeholder="Nhập latitude"
              control={control}
              error={errors.noiThuongTru?.latitude?.message}
              disabled={!isHouseHold}
            />
          </div>
          <div className="col-span-6">
            <FormInputField
              type="number"
              name="noiThuongTru.longitude"
              placeholder="Nhập Longitute"
              control={control}
              error={errors.noiThuongTru?.longitude?.message}
              disabled={!isHouseHold}
            />
          </div>
          {
            isHouseHold &&
            <div className="col-span-12">
              <MapPicker
                onPick={(lat, lng) => {
                  setValue("noiThuongTru.latitude", lat);
                  setValue("noiThuongTru.longitude", lng);
                }}
                lat={watch("noiThuongTru.latitude") || undefined}
                lng={watch("noiThuongTru.longitude") || undefined}
              />
            </div>
          }
          <div className="col-span-6">
            <FormControllerDatePicker
              name="noiThuongTru.tuNgay"
              control={control}
              placeholder="Ngày bắt đầu"
              error={errors.noiThuongTru?.tuNgay?.message}
            />
          </div>
          <div className="col-span-6">
            <FormControllerDatePicker
              name="noiThuongTru.denNgay"
              control={control}
              placeholder="Ngày kết thúc"
              error={errors.noiThuongTru?.denNgay?.message}
            />
          </div>
          {/* Nơi tạm trú */}
          {!isHouseHold && (
            <>
              <div className="col-span-12">
                <div className="text-[20px] font-semibold mb-3 mt-2 text-primary-color">Nơi tạm trú</div>
              </div>
              <div className="col-span-12">
                <FormSelectField
                  name="noiTamTru.tinh"
                  label="Địa chỉ tạm trú"
                  placeholder="Chọn tỉnh/thành phố"
                  control={control}
                  options={tinhs}
                  error={errors.noiTamTru?.tinh?.message}
                />
              </div>
              <div className="col-span-12">
                <FormSelectField
                  name="noiTamTru.huyen"
                  label=""
                  placeholder="Chọn quận/huyện"
                  control={control}
                  options={tamTruAddress.huyenOptions}
                  error={errors.noiTamTru?.huyen?.message}
                  disabled={!tamTruAddress.watchedTinh}
                />
              </div>
              <div className="col-span-6">
                <FormSelectField
                  name="noiTamTru.xa"
                  label=""
                  placeholder="Chọn phường/xã"
                  control={control}
                  options={tamTruAddress.xaOptions}
                  error={errors.noiTamTru?.xa?.message}
                  disabled={!tamTruAddress.watchedHuyen}
                />
              </div>
              <div className="col-span-6">
                <FormSelectField
                  name="noiTamTru.apId"
                  label=""
                  placeholder="Chọn khu phố/ấp"
                  control={control}
                  options={tamTruAddress.apOptions}
                  error={errors.noiTamTru?.apId?.message}
                  disabled={!tamTruAddress.watchedXa}
                />
              </div>
              <div className="col-span-12">
                <FormInputAreaField
                  name="noiTamTru.diaChi"
                  label=""
                  placeholder="Nhập địa chỉ chi tiết"
                  control={control}
                  error={errors.noiTamTru?.diaChi?.message}
                />
              </div>
              <div className="col-span-6">
                <FormInputField
                  type="number"
                  name="noiTamTru.latitude"
                  placeholder="Nhập latitude"
                  control={control}
                  error={errors.noiTamTru?.latitude?.message}
                />
              </div>
              <div className="col-span-6">
                <FormInputField
                  type="number"
                  name="noiTamTru.longitude"
                  placeholder="Nhập Longitute"
                  control={control}
                  error={errors.noiTamTru?.longitude?.message}
                />
              </div>
              <div className="col-span-12">
                <MapPicker
                  onPick={(lat, lng) => {
                    setValue("noiTamTru.latitude", lat);
                    setValue("noiTamTru.longitude", lng);
                  }}
                  lat={watch("noiTamTru.latitude") || undefined}
                  lng={watch("noiTamTru.longitude") || undefined}
                />
              </div>
              <div className="col-span-6">
                <FormControllerDatePicker
                  name="noiTamTru.tuNgay"
                  control={control}
                  placeholder="Ngày bắt đầu"
                  error={errors.noiTamTru?.tuNgay?.message}
                />
              </div>
              <div className="col-span-6">
                <FormControllerDatePicker
                  name="noiTamTru.denNgay"
                  control={control}
                  placeholder="Ngày kết thúc"
                  error={errors.noiTamTru?.denNgay?.message}
                />
              </div>
            </>
          )}
          <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
              <PrimaryButton
                fullWidth
                disabled={isPending}
                label={isPending ? 'Đang xử lý...' : 'Thêm dân cư'}
                handleClick={handleSubmit(onSubmit)}
              />
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