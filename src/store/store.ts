import { create } from 'zustand';
import { AppSliceType, createAppSlice } from './appSlice';

type StoreState = AppSliceType;

export const useStoreApp = create<StoreState>()((set) => ({
  ...createAppSlice(set),
}));