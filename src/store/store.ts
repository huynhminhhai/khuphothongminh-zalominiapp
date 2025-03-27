import { create } from 'zustand';
import { AppSliceType, createAppSlice } from './appSlice';
import { AuthSliceType, createAuthSlice } from './authSlice';

type StoreState = AppSliceType & AuthSliceType;

export const useStoreApp = create<StoreState>()((set, get) => ({
  ...createAppSlice(set),
  ...createAuthSlice(set, get),
}));