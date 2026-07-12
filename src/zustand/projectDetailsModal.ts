import { create } from 'zustand'

type ProjectDetailsModalState = {
  displayProjectDetailsModal: boolean
  toggleDisplayProjectDetailsModal: () => void
  setDisplayProjectDetailsModal: (value: boolean) => void
}

export const useProjectDetailsModalStore = create<ProjectDetailsModalState>((set) => ({
  displayProjectDetailsModal: true,
  toggleDisplayProjectDetailsModal: () =>
    set((state) => ({
      displayProjectDetailsModal: !state.displayProjectDetailsModal,
    })),
  setDisplayProjectDetailsModal: (value) =>
    set({
      displayProjectDetailsModal: value,
    }),
}))

export const useDisplayProjectDetailsModal = () =>
  useProjectDetailsModalStore((state) => state.displayProjectDetailsModal)

export const toggleDisplayProjectDetailsModal = () =>
  useProjectDetailsModalStore.getState().toggleDisplayProjectDetailsModal()
