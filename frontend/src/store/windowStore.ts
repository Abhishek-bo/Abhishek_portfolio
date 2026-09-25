import { create } from "zustand";
import type { AppId, WindowState } from "../types";

interface WindowStore {
  windows: WindowState[];
  activeWindow: AppId | null;

  openWindow: (window: WindowState) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  activeWindow: null,

  openWindow: (window) =>
    set((state) => {
      const exists = state.windows.some((item) => item.id === window.id);

      if (exists) {
        return {
          windows: state.windows.map((item) =>
            item.id === window.id
              ? { ...item, minimized: false }
              : item
          ),
          activeWindow: window.id,
        };
      }

      return {
        windows: [...state.windows, window],
        activeWindow: window.id,
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
      activeWindow:
        state.activeWindow === id ? null : state.activeWindow,
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? { ...window, minimized: true }
          : window
      ),
      activeWindow:
        state.activeWindow === id ? null : state.activeWindow,
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? { ...window, maximized: !window.maximized }
          : window
      ),
      activeWindow: id,
    })),

  restoreWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              minimized: false,
              maximized: false,
            }
          : window
      ),
      activeWindow: id,
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? { ...window, minimized: false }
          : window
      ),
      activeWindow: id,
    })),
}));