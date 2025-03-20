import { create } from "zustand";

interface LoginState {
  login: any;
  user: any;
}

const useAuthStore = create<LoginState>((set) => ({
  user: JSON.parse(localStorage.getItem("user-info") as any),
  login: (user: any) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user: any) => set({ user }),
}));

export default useAuthStore;
