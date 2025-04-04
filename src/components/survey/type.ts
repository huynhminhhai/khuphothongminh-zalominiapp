export interface ChiTietCauHoiKhaoSat {
    chiTietCauHoiKhaoSatId: number;
    cauHoiKhaoSatId: number;
    noiDungChiTiet: string;
    coYKienKhac: boolean;
}

export interface CauHoiKhaoSat {
    cauHoiKhaoSatId: number;
    khaoSatId: number;
    noiDung: string;
    loaiCauHoiKhaoSatId: number;
    chiTietCauHoiKhaoSats: ChiTietCauHoiKhaoSat[];
}

export interface SurveyTypeAPI {
    khaoSatId: number;
    apId: number;
    tieuDe: string;
    noiDung: string;
    tuNgay: string;
    denNgay: string;
    cauHoiKhaoSats: CauHoiKhaoSat[];
    tinhTrangId: number;
}

// Type cho form frontend
export interface QuestionType {
    questionId: number;
    type: 'text' | 'multiple-choice' | 'one-choice';
    question: string;
    options?: string[];
}

export interface SurveyType {
    id?: number;
    title: string;
    description: string;
    expiryDate: string;
    questions: QuestionType[];
}

export interface SurveyDetail {
    khaoSatId: number;
    apId: number;
    tieuDe: string;
    noiDung: string;
    tuNgay: string;
    denNgay: string;
    tinhTrangId: number;
    cauHoiKhaoSats: CauHoiKhaoSat[];
}

export interface SurveyUpdateAPI {
    khaoSatId: number;
    tieuDe: string;
    noiDung: string;
    tuNgay: string;
    denNgay: string;
    tinhTrangId: number;
    cauHoiKhaoSats: {
        cauHoiKhaoSatId: number;
        khaoSatId: number;
        noiDung: string;
        loaiCauHoiKhaoSatId: number;
        chiTietCauHoiKhaoSats: {
            chiTietCauHoiKhaoSatId: number;
            cauHoiKhaoSatId: number;
            noiDungChiTiet: string;
            coYKienKhac: boolean;
            thuTu: number;
        }[];
    }[];
}