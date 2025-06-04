import { useCallback } from "react";
import { useStoreApp } from "store/store";

export const PermissionActions = {
  XEM: 'XEM',
  XEMCONGKHAI: 'XEMCONGKHAI',
  SUA: 'SUA',
  XOA: 'XOA',
  THEM: 'THEM',
  XUATBAN: 'XUATBAN',
  BAOCAO: 'BAOCAO',
  TIEPNHAN: 'TIEPNHAN',
  XOACUATOI: 'XOACUATOI',
  THUCHIEN: 'THUCHIEN',
} as const;

export const permissionsList = {
  home: 'home',
  homeThongTinTaiKhoan: 'home_thong-tin-tai-khoan',
  homeDanhSachTaiKhoan: 'home_danh-sach-tai-khoan',
  homeThemTaiKhoan: 'home_them-moi-tai-khoan',
  homeChinhSuaTaiKhoan: 'home_chinh-sua-tai-khoan',
  homeBangDieuKhien: 'home_bang-dieu-khien',
  homeTinMoi: 'home_tin-moi',
  bandodancu: 'home_ban-do-so_phan-bo-dan-cu',

  thongKe: 'thong-ke',
  thongKeSoLieu: 'thong-ke_so-lieu',
  thongKeBieuDo: 'thong-ke_bieu-do',

  cauHinh: 'cau-hinh',
  cauHinhThongTin: 'cau-hinh_thong-tin',
  cauHinhPhanQuyen: 'cau-hinh_phan-quyen',

  khuPho: 'khu-pho',
  khuPhoToChucDanCu: 'khu-pho_to-chuc-dan-cu',
  khuPhoToChucDanCuBanDieuHanh: 'khu-pho_to-chuc-dan-cu_ban-dieu-hanh',
  khuPhoToChucDanCuDanCu: 'khu-pho_to-chuc-dan-cu_dan-cu',
  khuPhoToChucDanCuHoGiaDinh: 'khu-pho_to-chuc-dan-cu_ho-gia-dinh',

  khuPhoTuyenTruyenPhanAnh: 'khu-pho_tuyen-truyen-phan-anh',
  khuPhoTuyenTruyenPhanAnhTinTucSuKien: 'khu-pho_tuyen-truyen-phan-anh_tin-tuc-su-kien',
  khuPhoTuyenTruyenPhanAnhKhaoSat: 'khu-pho_tuyen-truyen-phan-anh_khao-sat',
  khuPhoTuyenTruyenPhanAnhPhanAnh: 'khu-pho_tuyen-truyen-phan-anh_phan-anh',
  khuPhoTuyenTruyenPhanAnhVanBan: 'khu-pho_tuyen-truyen-phan-anh_van-ban',
  khuPhoTuyenTruyenPhanAnhThongBao: 'khu-pho_tuyen-truyen-phan-anh_thong-bao',

  khuPhoCongViec: 'khu-pho_cong-viec',
  khuPhoCongViecCuocHop: 'khu-pho_cong-viec_cuoc-hop',
  khuPhoCongViecNhiemVu: 'khu-pho_cong-viec_nhiem-vu',
  khuPhoCongViecTaiChinh: 'khu-pho_cong-viec_tai-chinh',
  khuPhoCongViecBaoHiemYTe: 'khu-pho_cong-viec_bao-hiem-y-te',

  khuPhoNhiemVu: 'khu-pho_nhiem-vu',
  khuPhoNhiemVuGiaoNhiemVu: 'khu-pho_nhiem-vu_giao-nhiem-vu',
  khuPhoNhiemVuNhiemVuCuaToi: 'khu-pho_nhiem-vu_nhiem-vu-cua-toi',

  thongKeBaoCao: 'thong-ke-bao-cao',
  thongKeBaoCaoThongTinHoGiaDinh: 'thong-ke-bao-cao_thong-tin-ho-gia-dinh',
  thongKeBaoCaoTongHopTinhHinhDanCu: 'thong-ke-bao-cao_tong-hop-tinh-hinh-dan-cu',
} as const;

export const useCheckRequireApId = () => {
  const { account } = useStoreApp();
  const { setIsShowModalRegisterAp } = useStoreApp();

  const checkRequireApId = useCallback((action: () => void) => {
    if (!account?.maXa) {
      setIsShowModalRegisterAp(true);
      return;
    }
    action();
  }, [account?.maXa, setIsShowModalRegisterAp]);

  return checkRequireApId;
};