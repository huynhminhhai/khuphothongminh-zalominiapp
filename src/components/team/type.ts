import * as yup from 'yup';

export const schemaTeam = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    birthDate: yup.string().required('Ngày sinh không được để trống'),
    phoneNumber: yup.string().required('SĐT không được để trống'),
    officeAddress: yup.string().required('Không được để trống'),
    residential_group_id: yup.number().required('Không được để trống').notOneOf([0], 'Chưa chọn mục này'),
    term: yup.object().shape({
        position: yup.string().required('Chức vụ không được để trống'), 
        start_date: yup.string().required('Ngày bắt đầu không được để trống'), 
        end_date: yup.string().required('Ngày kết thúc không được để trống') 
    })
});


export const schemaTermAdd = yup.object().shape({
    position: yup.string().required('Chức vụ không được để trống'),
    start_date: yup.string().required('Không được để trống'),
    end_date: yup.string().required('Không được để trống'),
});

export type FormDataTerm = {
    position: string;
    start_date: string;
    end_date: string;
}

export type FormDataTeam = {
    fullname: string;
    birthDate: string;
    phoneNumber: string;
    email?: string;
    officeAddress: string;
    residential_group_id: number;
    term: FormDataTerm;
}

export const schemaTeamUpdate = yup.object().shape({
    fullname: yup.string().required('Họ tên không được để trống'),
    birthDate: yup.string().required('Ngày sinh không được để trống'),
    phoneNumber: yup.string().required('SĐT không được để trống'),
    officeAddress: yup.string().required('Không được để trống'),
    residential_group_id: yup.number().required('Không được để trống')
});

export type FormDataTeamUpdate = {
    fullname: string;
    birthDate: string;
    phoneNumber: string;
    email?: string;
    officeAddress: string;
    residential_group_id: number;
}

export type FormDataResidential = {
    name: string;
}

export const schemaResidential = yup.object().shape({
    name: yup.string().required('Tên tổ dân cư không được để trống'),
});

export interface BanDieuHanh {
    apId: number;
    banDieuHanhId: number;
    chucVuId: number;
    hoTen: string;
    hoatDong: boolean;
    maXa: string;
    nguoiDungId: number;
    tenAp: string;
    tenChucVu: string;
    tenXa: string;
    anhDaiDien?: string;
  }