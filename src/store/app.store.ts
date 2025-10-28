import {create} from "zustand";

interface AppState {
  startPageAnimation: boolean;
  setStartPageAnimation: (value: boolean) => void;
  openNavMenu: boolean;
  setOpenNavMenu: (value: boolean) => void;
  isTouchDevice: boolean;
  setIsTouchDevice: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  startPageAnimation: false,
  setStartPageAnimation: (value) => set({ startPageAnimation: value }),
  openNavMenu: false,
  setOpenNavMenu: (value) => set({ openNavMenu: value }),
  isTouchDevice: false,
  setIsTouchDevice: (value) => set({ isTouchDevice: value }),
}));
