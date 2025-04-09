import * as yup from 'yup';

export const schemaTransactions = yup.object().shape({
    loaiGiaoDichTaiChinhId: yup.number().required("Chưa chọn mục này").notOneOf([0], 'Chưa chọn mục này'),
    soTien: yup.number().transform((value, originalValue) => (originalValue === "" ? null : value))
            .nullable()
            .required("Không được để trống")
            .moreThan(0, "Số tiền phải lớn hơn 0"),
    ngayGiaoDich: yup.string().required("Ngày giao dịch là bắt buộc"),
    noiDung: yup.string().required("Nội dung là bắt buộc"),
    congKhai: yup.boolean().required("Trạng thái công khai là bắt buộc"),
    hoatDong: yup.boolean().required("Trạng thái hoạt động là bắt buộc"),
});

export type FormDataTranscations = {
    thuChiId?: number;
    loaiGiaoDichTaiChinhId: number;
    soTien: number;
    ngayGiaoDich: string;
    noiDung: string;
    congKhai: boolean;
    hoatDong: boolean;
}