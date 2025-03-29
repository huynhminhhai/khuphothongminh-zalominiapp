import { create } from 'zustand';
import { AppSliceType, createAppSlice } from './appSlice';
import { AuthSliceType, createAuthSlice } from './authSlice';
import { ResidentSliceType ,createResidentSlice } from './residentCategoriesSlice';

type StoreState = AppSliceType & AuthSliceType & ResidentSliceType;

export const useStoreApp = create<StoreState>()((set, get) => ({
  ...createAppSlice(set),
  ...createAuthSlice(set, get),
  ...createResidentSlice(set),
}));