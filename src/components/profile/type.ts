import * as yup from 'yup';

export const schemaProfile = (isHouseHold: boolean) => yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
    gender: yup.number().required('Chưa chọn giới tính').notOneOf([0], 'Chưa chọn mục này'),
    birthDate: yup.string().required('Chưa chọn ngày sinh'),
    numberCard: yup.string().typeError('CCCD phải là một số').required("CCCD phải là một số"),
    dateCard: yup.string().required("Chưa chọn mục này"),
    religion: yup.number().required('Chưa chọn tôn giáo').notOneOf([0], 'Chưa chọn mục này'),
    nation: yup.number().required('Chưa chọn dân tộc').notOneOf([0], 'Chưa chọn mục này'),
    residenceType: yup.number().required("Chưa chọn mục này"),
    residenceStatus: yup.number().required("Chưa chọn mục này"),
    economicStatus: yup.number().required("Mã bảo hiểm không được để trống"),
    culturalFamilyStatus: yup.boolean().required("Mã bảo hiểm không được để trống"),
    relationship: yup.number()
        .test('required-or-empty', 'Chưa chọn mục này', function (value) {

            if (!isHouseHold && (value === undefined || value === null || value === 0)) {
                return this.createError({ message: 'Chưa chọn mục này' });
            }

            return true;
        }),
    parentId: yup
        .number()
        .test('required-or-empty', 'Chưa chọn mục này', function (value) {

            if (!isHouseHold && (value === undefined || value === null || value === 0)) {
                return this.createError({ message: 'Chưa chọn mục này' });
            }

            return true;
        }),
    // Thường trú
    addressPermanent: yup.string().required('Địa chỉ không được để trống'),
    provincePermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    districtPermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    wardsPermanent: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    // quê quán
    address: yup.string().required('Địa chỉ không được để trống'),
    province: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    district: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
    ward: yup.number().required('Chưa chọn mục này').notOneOf([0], 'Chưa chọn mục này'),
});

export type FormDataProfile = {
    fullname: string;
    phoneNumber: string;
    numberCard: string;
    dateCard: string;
    gender: number;
    birthDate: string;
    nation: number;
    religion: number;
    relationship?: number;
    residenceStatus: number;
    residenceType: number;
    bhyt?: string;
    economicStatus: number;
    culturalFamilyStatus: boolean;
    parentId?: number;
    job?: number;
    // Thường trú
    addressPermanent: string;
    provincePermanent: number;
    districtPermanent: number;
    wardsPermanent: number;
    // quê quán
    address: string;
    province: number;
    district: number;
    ward: number;
}

const residenceSchema = yup.object().shape({
    // loaiCuTruId: yup.number().required('Loại cư trú là bắt buộc'),
    diaChi: yup.string().required('Địa chỉ là bắt buộc'),
    apId: yup.number().typeError('Không được để trống').required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    xa: yup.string().required('Xã là bắt buộc'),
    huyen: yup.string().required('Huyện là bắt buộc'),
    tinh: yup.string().required('Tỉnh là bắt buộc'),
    latitude: yup
        .number().nullable(),
    longitude: yup
        .number().nullable(),
    tuNgay: yup.string().nullable(),
    denNgay: yup.string().nullable(),
});

export const residentSchema = (isHouseHold: boolean) => yup.object().shape({
    laChuHo: yup.boolean().required('Trạng thái chủ hộ là bắt buộc'),
    chuHoId: yup
        .number()
        .typeError('Chưa chọn mục này')
        .test('required-or-empty', 'Chưa chọn mục này', function (value) {

            if (!isHouseHold && (value === undefined || value === null || value === 0)) {
                return this.createError({ message: 'Chưa chọn mục này' });
            }

            return true;
        }),
    hoTen: yup.string().required('Họ tên là bắt buộc'),
    ngaySinh: yup
        .string()
        .required('Ngày sinh là bắt buộc')
    // .matches(
    //     /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    //     'Ngày sinh phải theo định dạng ISO 8601'
    // )
    ,
    gioiTinh: yup.number().required('Giới tính là bắt buộc').notOneOf([0], 'Chưa chọn mục này'),
    soGiayTo: yup
        .string()
        .required('Số giấy tờ là bắt buộc')
        .matches(/^[0-9]{12}$/, 'Số định danh cá nhân phải bao gồm 12 số'),
    danToc: yup.string().required('Dân tộc là bắt buộc'),
    tonGiao: yup.string().required('Tôn giáo là bắt buộc'),
    // quocGia: yup.string().required('Quốc gia là bắt buộc'),
    ngheNghiep: yup.number().required('Giới tính là bắt buộc').notOneOf([0], 'Chưa chọn mục này'),
    // noiLamViec: yup.string().required('Nơi làm việc là bắt buộc'),
    email: yup
        .string()
        .email('Email không hợp lệ'),
    // .required('Email là bắt buộc'),
    // dienThoai: yup
    //     .string()
    //     .nullable()
    //     .notRequired()
    //     .matches(
    //         /^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/,
    //         'Số điện thoại không hợp lệ'
    //     ),
    moiQuanHeVoiChuHo: yup
        .number()
        .typeError('Chưa chọn mục này')
        .test('required-or-empty', 'Chưa chọn mục này', function (value) {

            if (!isHouseHold && (value === undefined || value === null || value === 0)) {
                return this.createError({ message: 'Chưa chọn mục này' });
            }

            return true;
        }),
    tinhTrangHoGiaDinhId: yup.number().required('Tình trạng hộ gia đình là bắt buộc').notOneOf([0], 'Chưa chọn mục này'),
    giaDinhVanHoa: yup.boolean().required('Gia đình văn hóa là bắt buộc'),
    noiThuongTru: residenceSchema.required('Nơi thường trú là bắt buộc'),
    // noiTamTru: residenceSchema.required('Nơi tạm trú là bắt buộc'),
    // noiTamTru: residenceSchema.nullable().notRequired(),
});

interface Residence {
    thongTinCuTruId?: any;
    danCuId?: number;
    loaiCuTruId?: number;
    diaChi: string;
    apId: number;
    xa: string;
    huyen: string;
    tinh: string;
    latitude?: number | null;
    longitude?: number | null;
    tuNgay?: string | null;
    denNgay?: string | null;
}

export interface FormResidentDetail {
    laChuHo: boolean;
    chuHoId?: number;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: number;
    soGiayTo: string;
    danToc: string;
    tonGiao: string;
    quocGia?: string;
    ngheNghiep: number;
    noiLamViec?: string;
    email?: string;
    dienThoai?: string | null;
    website?: string;
    moiQuanHeVoiChuHo?: number;
    tinhTrangHoGiaDinhId: number;
    giaDinhVanHoa: boolean;
    noiThuongTru: Residence;
    // noiTamTru: Residence;
    noiTamTru?: Residence | null;
}