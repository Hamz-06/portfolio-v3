import { create } from 'zustand'

type TogglePlayState = {
  isPlaying: boolean
  setTogglePlay: (value: boolean) => void
}

export const useTogglePlayStore = create<TogglePlayState>((set) => ({
  isPlaying: false,
  setTogglePlay: (value) =>
    set({
      isPlaying: value,
    }),
}))

export const usePlayToggle = () =>
  useTogglePlayStore((state) => state.isPlaying)

export const setTogglePlay = (value: boolean) =>
  useTogglePlayStore.getState().setTogglePlay(value)
