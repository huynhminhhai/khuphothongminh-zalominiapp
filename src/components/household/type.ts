import * as yup from 'yup';

export const schemaTransactions = yup.object().shape({
    tuNgay: yup.string().required("Ngày công nhận là bắt buộc"),
});

export type FormDataHouseHold = {
    thongTinHoGiaDinhId?: number,
    danCuId?: number,
    hoNgheo?: boolean,
    hoCanNgheo?: boolean,
    giaDinhVanHoa?: boolean,
    soHieu?: string,
    trichYeu?: string,
    coQuanBanHanh?: string,
    tuNgay: string,
    denNgay?: string
}
