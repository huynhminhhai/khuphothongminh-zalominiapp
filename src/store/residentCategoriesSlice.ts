import { O } from "framer-motion/dist/types.d-6pKw1mTI";
import http from "services/http";

export interface LoaiCuTruType {
    loaiCuTruId: number;
    tenLoaiCuTru: string;
}

export interface GioiTinhType {
    gioiTinhId: number;
    tenGioiTinh: string;
}

export interface TinhType {
    tinhId: number;
    cap: string;
    maTinh: string;
    tenTinh: string;
}

export interface MoiQuanHeGiaDinhType {
    moiQuanHeGiaDinhId: number;
    tenMoiQuanHeGiaDinh: string;
}

export interface DanTocType {
    danTocId: number;
    maDanToc: string;
    tenDanToc: string;
}

export interface TonGiaosType {
    tonGiaoId: number;
    maTonGiao: string;
    tenTonGiao: string;
}

export interface ngheNghiepsType {
    ngheNghiepId: number;
    tenNgheNghiep: string;
    thuTu: number;
    hoatDong: boolean;
}

export interface tinhTrangHoGiaDinhsType {
    tinhTrangId: number;
    loaiTinhTrang: string;
    tenTinhTrang: string;
}

export interface OptionsType {
    value: any;
    label: string;
}

export interface ResidentSliceType {
    loaiCuTrus: OptionsType[];
    gioiTinhs: OptionsType[];
    tinhs: OptionsType[];
    moiQuanHeGiaDinhs: OptionsType[];
    danTocs: OptionsType[];
    tonGiaos: OptionsType[];
    ngheNghieps: OptionsType[];
    tinhTrangHoGiaDinhs: OptionsType[];
    fetchResidentTypes: () => Promise<void>;
}

export const createResidentSlice = (set: any): ResidentSliceType => ({
    loaiCuTrus: [],
    gioiTinhs: [],
    tinhs: [],
    moiQuanHeGiaDinhs: [],
    danTocs: [],
    tonGiaos: [],
    ngheNghieps: [],
    tinhTrangHoGiaDinhs: [],
    fetchResidentTypes: async () => {
        try {
            const { data: residentCategoryData } = await http.get<any>(`/dancu/danhmuc`);

            if (residentCategoryData) {
                const convertedResidentTypes = residentCategoryData.loaiCuTrus.map((item: any) => ({
                    value: item.loaiCuTruId,
                    label: item.tenLoaiCuTru,
                }));

                const convertedGioiTinhs = residentCategoryData.gioiTinhs.map((item: any) => ({
                    value: item.gioiTinhId,
                    label: item.tenGioiTinh,
                }));

                const convertedTinhs = residentCategoryData.tinhs.map((item: any) => ({
                    value: item.maTinh,
                    label: item.tenTinh,
                }));

                const convertedMoiQuanHeGiaDinhs = residentCategoryData.moiQuanHeGiaDinhs.map((item: any) => ({
                    value: item.moiQuanHeGiaDinhId,
                    label: item.tenMoiQuanHeGiaDinh,
                }));

                const convertedDanTocs = residentCategoryData.danTocs.map((item: any) => ({
                    value: item.maDanToc,
                    label: item.tenDanToc,
                }));

                const convertedTonGiaos = residentCategoryData.tonGiaos.map((item: any) => ({
                    value: item.maTonGiao,
                    label: item.tenTonGiao,
                }));

                const convertedGheNghieps = residentCategoryData.ngheNghieps
                    .filter((item: any) => item.hoatDong === true)
                    .map((item: any) => ({
                        value: item.ngheNghiepId,
                        label: item.tenNgheNghiep,
                    }));

                const convertedTinhTrangHoGiaDinhs = residentCategoryData.tinhTrangHoGiaDinhs.map((item: any) => ({
                    value: item.tinhTrangId,
                    label: item.tenTinhTrang,
                }));

                set({
                    loaiCuTrus: convertedResidentTypes,
                    gioiTinhs: convertedGioiTinhs,
                    tinhs: convertedTinhs,
                    moiQuanHeGiaDinhs: convertedMoiQuanHeGiaDinhs,
                    danTocs: convertedDanTocs,
                    tonGiaos: convertedTonGiaos,
                    ngheNghieps: convertedGheNghieps,
                    tinhTrangHoGiaDinhs: convertedTinhTrangHoGiaDinhs
                });
            }
        } catch (error) {
            console.error("Lỗi khi gọi API danh mục cư trú:", error);
        }
    },
});