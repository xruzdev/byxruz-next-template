import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type Lenis from "lenis";
import type { ScrollToOptions } from "lenis";

interface LenisState {
  // Estado
  lenis: Lenis | null;
  scroll: number;
  scrollPercentage: number;
  limit: number;

  // Acciones
  setLenis: (lenis: Lenis) => void;
  stopScroll: () => void;
  startScroll: () => void;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void;
}

export const useLenisStore = create<LenisState>()(
  subscribeWithSelector((set, get) => ({
    // Estado inicial
    lenis: null,
    scroll: 0,
    scrollPercentage: 0,
    limit: 0,

    // Acciones
    setLenis: (lenis: Lenis) => {
      set({ lenis });
      lenis.on("scroll", (e) => {
        set({ scroll: e.scroll, scrollPercentage: e.scroll / e.limit });
      });
      set({ limit: lenis.limit });
    },

    stopScroll: () => {
      const { lenis } = get();
      lenis?.stop();
    },

    startScroll: () => {
      const { lenis } = get();
      lenis?.start();
    },

    scrollTo: (target, options) => {
      const { lenis } = get();
      lenis?.scrollTo(target, options);
    },
  }))
);

// Selectores específicos para mejor rendimiento
/* export const useLenisControls = () => useLenisStore((state) => ({
  stopScroll: state.stopScroll,
  startScroll: state.startScroll,
  scrollTo: state.scrollTo,
})); */
/*
export const useLenisStatus = () => useLenisStore((state) => ({
  isScrolling: state.isScrolling,
  scrollY: state.scrollY,
})); */
