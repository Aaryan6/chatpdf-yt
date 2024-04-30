import { create } from "zustand";

type Store = {
  IsSidebarOpen: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
  IsDialogOpen: boolean;
  onDialogOpen: () => void;
  onDialogClose: () => void;
};

const useStore = create<Store>()((set) => ({
  IsSidebarOpen: false,
  onSidebarOpen: () => set(() => ({ IsSidebarOpen: true })),
  onSidebarClose: () => set(() => ({ IsSidebarOpen: false })),
  IsDialogOpen: false,
  onDialogOpen: () => set(() => ({ IsDialogOpen: true })),
  onDialogClose: () => set(() => ({ IsDialogOpen: false })),
}));

export { useStore };
