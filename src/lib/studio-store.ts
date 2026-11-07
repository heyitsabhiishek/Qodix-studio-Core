"use client";

import { create } from "zustand";

type StudioState = {
  /** Preloader has finished and the hero intro may play */
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
  /** Mobile / fullscreen menu open state */
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

export const useStudioStore = create<StudioState>((set) => ({
  introDone: false,
  setIntroDone: (v) => set({ introDone: v }),
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
}));
