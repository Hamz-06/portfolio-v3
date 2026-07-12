import { create } from 'zustand'

type LayoutState = {
  toggleSidebar: boolean
  mainLayoutBar: boolean
  switchToggleSidebar: () => void
  setToggleSidebar: (value: boolean) => void
}

export const useToggleSidebarStore = create<LayoutState>((set) => ({
  toggleSidebar: false,
  toggleMobileSidebar: false,
  mainLayoutBar: true,
  switchToggleSidebar: () =>
    set((state) => {
      const nextValue = !state.toggleSidebar
      return {
        toggleSidebar: nextValue,
      }
    }),
  setToggleSidebar: (value) =>
    set(() => {
      return {
        toggleSidebar: value,
      }
    }),

})
)

export const useToggleSidebar = () =>
  useToggleSidebarStore((state) => state.toggleSidebar)

// Non-hook helpers for event handlers/providers.
export const switchToggleSidebar = () =>
  useToggleSidebarStore.getState().switchToggleSidebar()

export const setToggleSidebar = (value: boolean) =>
  useToggleSidebarStore.getState().setToggleSidebar(value)

