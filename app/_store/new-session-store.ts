import { create } from "zustand";
import { TypePromtChat } from "../_types/chat/TypeChat";

type TypeNewSession = {
  id: string;
  session: TypePromtChat[] | null;
};

interface TypeNewSessionState {
  session: TypeNewSession | null;
  getSession: () => TypeNewSession | null;
  setSession: (_payload: TypeNewSession | null) => void;
}

export const useNewSessionStore = create<TypeNewSessionState>()((set, get) => ({
  session: null,
  getSession: () => get().session,
  setSession: (_payload: TypeNewSession | null) => set({ session: _payload }),
}));
