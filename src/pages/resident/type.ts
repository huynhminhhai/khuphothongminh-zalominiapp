import * as yup from 'yup';

const residenceSchema = yup.object().shape({
    loaiCuTruId: yup.number().required('Loại cư trú là bắt buộc'),
    diaChi: yup.string().required('Địa chỉ là bắt buộc'),
    xa: yup.string().required('Xã là bắt buộc'),
    huyen: yup.string().required('Huyện là bắt buộc'),
    tinh: yup.string().required('Tỉnh là bắt buộc'),
    latitude: yup
        .number().nullable(),
    longitute: yup
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
    ,
    gioiTinh: yup.number().required('Giới tính là bắt buộc').notOneOf([0], 'Chưa chọn mục này'),
    soGiayTo: yup
        .string()
        .required('Số giấy tờ là bắt buộc')
        .matches(/^[0-9]{12}$/, 'Số định danh cá nhân phải bao gồm 12 số'),
    danToc: yup.string().required('Dân tộc là bắt buộc'),
    tonGiao: yup.string().required('Tôn giáo là bắt buộc'),
    // quocGia: yup.string().required('Quốc gia là bắt buộc'),
    ngheNghiep: yup.string().required('Nghề nghiệp là bắt buộc'),
    // noiLamViec: yup.string().required('Nơi làm việc là bắt buộc'),
    // email: yup
    //     .string()
    //     .email('Email không hợp lệ')
    //     .required('Email là bắt buộc'),
    dienThoai: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/^(\+84|0)(9|3|7|8|5|6)[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
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
});

interface Residence {
    thongTinCuTruId?: any;
    loaiCuTruId: number;
    diaChi: string;
    xa: string;
    huyen: string;
    tinh: string;
    latitude?: number | null;
    longitute?: number | null;
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
    ngheNghiep: string;
    noiLamViec?: string;
    email?: string;
    dienThoai: string;
    website?: string;
    moiQuanHeVoiChuHo?: number;
    tinhTrangHoGiaDinhId: number;
    giaDinhVanHoa: boolean;
    noiThuongTru: Residence;
    // noiTamTru: Residence;
    noiTamTru?: Residence | null;
}