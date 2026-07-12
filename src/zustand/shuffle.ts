
import { setClientCookie } from "@/helper/cookieHelperClient";
import { create } from "zustand";

type ShuffleState = {
  isShuffled: boolean;
  toggleShuffle: () => void;
  setShuffle: (value: boolean) => void;
};

export const useShuffleStore = create<ShuffleState>((set) => ({
  isShuffled: false,
  toggleShuffle: () =>
    set((state) => {
      const currentShuffleState = !state.isShuffled;
      setClientCookie('is-shuffling-enabled', currentShuffleState)
      return ({
        isShuffled: currentShuffleState,
      })
    }
    ),
  setShuffle: (value) =>
    set({
      isShuffled: value,
    }),
}));

