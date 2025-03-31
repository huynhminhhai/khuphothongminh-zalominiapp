import React, { useEffect, useState } from "react"
import { Box, Checkbox, Switch } from "zmp-ui"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "components/button"
import { FormCheckboxField, FormControllerDatePicker, FormInputAreaField, FormInputField, FormSelectField } from "components/form"
import { ConfirmModal } from "components/modal"
import { FormResidentDetail, residentSchema } from "./type"
import { useStoreApp } from "store/store"
import { useCreateResident, useGetChuHosList } from "apiRequest/resident"
import http from "services/http"

const ProfileAddForm: React.FC = () => {

  const { ngheNghieps, danTocs, gioiTinhs, loaiCuTrus, moiQuanHeGiaDinhs, tinhs, tonGiaos, tinhTrangHoGiaDinhs, account } = useStoreApp()

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
    ngheNghiep: '',
    noiLamViec: '',
    email: '',
    dienThoai: '',
    website: '',
    moiQuanHeVoiChuHo: 0,
    tinhTrangHoGiaDinhId: 0,
    giaDinhVanHoa: false,
    noiThuongTru: {
      loaiCuTruId: loaiCuTrus[0].value,
      diaChi: '',
      xa: '',
      huyen: '',
      tinh: '',
      latitude: null,
      longitute: null,
      tuNgay: null,
      denNgay: null,
    },
    noiTamTru: {
      loaiCuTruId: loaiCuTrus[1].value,
      diaChi: '',
      xa: '',
      huyen: '',
      tinh: '',
      latitude: null,
      longitute: null,
      tuNgay: null,
      denNgay: null,
    },
  };

  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState<FormResidentDetail>(defaultValues)
  const [isHouseHold, setIsHouseHold] = useState<boolean>(false)
  const [houseHoldOptions, setHouseHoldOptions] = useState<{
    value: number;
    label: string;
  }[]>([])

  const { handleSubmit, reset, control, watch, formState: { errors } } = useForm<FormResidentDetail>({
    resolver: yupResolver(residentSchema(isHouseHold)),
    defaultValues
  });

  const { data: chuHos } = useGetChuHosList();
  const { mutateAsync: createResident, isPending } = useCreateResident();

  useEffect(() => {
    if (chuHos) {
      setHouseHoldOptions(chuHos.map((item) => ({
        value: item.danCuId,
        label: item.hoTen
      })))
    }
  }, [chuHos])


  const onSubmit: SubmitHandler<FormResidentDetail> = (data) => {
    setConfirmVisible(true);
    setFormData(data)
  };

  useEffect(() => {
    if (watch().chuHoId) {
      fetchApiResident()
    }
  }, [watch().chuHoId])

  const fetchApiResident = async () => {
    try {
      const response = await http.get<any>(`/dancu/chitiet/${watch().chuHoId}`);
      const residentData = response.data;

      reset({
        ...watch(),
        noiThuongTru: {
          ...watch().noiThuongTru,
          ...residentData.noiThuongTru
        },
        noiTamTru: {
          ...watch().noiTamTru,
          ...residentData.noiTamTru
        },
        tinhTrangHoGiaDinhId: residentData.tinhTrangHoGiaDinhId,
        giaDinhVanHoa: residentData.giaDinhVanHoa
      });

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

      let dataSubmit = isHouseHold ?
        { ...formData, laChuHo: isHouseHold, apId: account.apId, moiQuanHeVoiChuHo: 1, chuHoId: null } :
        { ...formData, laChuHo: isHouseHold, apId: account.apId }

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
              type="number"
              name="soGiayTo"
              label="Số định danh cá nhân"
              placeholder="Nhập số định danh cá nhân"
              control={control}
              error={errors.soGiayTo?.message}
              required
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
            <div className="flex items-center gap-2 mb-2">
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
          <div className="col-span-6">
            <FormSelectField
              name="noiThuongTru.huyen"
              label=""
              placeholder="Chọn quận/huyện"
              control={control}
              options={
                [
                  {
                    value: "800",
                    label: "Huyện Thạnh Hóa"
                  }
                ]
              }
              error={errors.noiThuongTru?.huyen?.message}
              disabled={!isHouseHold}
            />
          </div>
          <div className="col-span-6">
            <FormSelectField
              name="noiThuongTru.xa"
              label=""
              placeholder="Chọn phường/xã"
              control={control}
              options={
                [
                  {
                    value: "27865",
                    label: "Thị trấn Thạnh Hóa"
                  }
                ]
              }
              error={errors.noiThuongTru?.xa?.message}
              disabled={!isHouseHold}
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
              name="noiThuongTru.longitute"
              placeholder="Nhập Longitute"
              control={control}
              error={errors.noiThuongTru?.longitute?.message}
              disabled={!isHouseHold}
            />
          </div>
          {/* Nơi tạm trú */}
          {/* {!isHouseHold && (
            <> */}
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
              <div className="col-span-6">
                <FormSelectField
                  name="noiTamTru.huyen"
                  label=""
                  placeholder="Chọn quận/huyện"
                  control={control}
                  options={
                    [
                      {
                        value: "800",
                        label: "Huyện Thạnh Hóa"
                      }
                    ]
                  }
                  error={errors.noiTamTru?.huyen?.message}
                />
              </div>
              <div className="col-span-6">
                <FormSelectField
                  name="noiTamTru.xa"
                  label=""
                  placeholder="Chọn phường/xã"
                  control={control}
                  options={
                    [
                      {
                        value: "27865",
                        label: "Thị trấn Thạnh Hóa"
                      }
                    ]
                  }
                  error={errors.noiTamTru?.xa?.message}
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
                  name="noiTamTru.longitute"
                  placeholder="Nhập Longitute"
                  control={control}
                  error={errors.noiTamTru?.longitute?.message}
                />
              </div>
            {/* </>
          )} */}
          <div className="col-span-12">
            <FormSelectField
              name="tinhTrangHoGiaDinhId"
              label="Tình trạng hộ gia đình"
              placeholder="Chọn tình trạng hộ gia đình"
              control={control}
              options={tinhTrangHoGiaDinhs}
              error={errors.tinhTrangHoGiaDinhId?.message}
              disabled={!isHouseHold}
            />
          </div>
          <div className="col-span-12">
            <FormCheckboxField
              name="giaDinhVanHoa"
              label="Gia đình văn hóa"
              control={control}
              defaultChecked={false}
              disabled={!isHouseHold}
            />
          </div>
          <div className="col-span-12">
            <FormInputField
              name="website"
              label="Website"
              placeholder="Nhập website"
              control={control}
              error={errors.website?.message}
            />
          </div>
          <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-3">
            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
              <PrimaryButton
                fullWidth
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