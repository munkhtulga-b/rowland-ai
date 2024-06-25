import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import TypeUser from "../_types/auth/TypeUser";

interface UserState {
  user: TypeUser | null;
  setUser: (_user: TypeUser | null) => void;
  getUser: () => TypeUser | null;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (_payload: TypeUser | null) => set({ user: _payload }),
      getUser: () => get().user,
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
