import { setClientCookie } from '@/helper/cookieHelperClient'
import { create } from 'zustand'

type LikedProjectsState = {
  likedProjects: string[]
  isCurrentProjectLiked: boolean
  setLikedProject: (projectSlug: string) => void
  initialiseLikedProjects: (projects: string[]) => void
  currentProjectLiked: (isProjectLiked: boolean) => void
}

export const useLikedProjectsStore = create<LikedProjectsState>((set) => ({
  likedProjects: [],
  isCurrentProjectLiked: false,
  setLikedProject: (projectSlug) =>
    set((state) => {
      const isExists = state.likedProjects.includes(projectSlug)
      const updatedLikedProjects = isExists
        ? state.likedProjects.filter((slug) => slug !== projectSlug)
        : [...state.likedProjects, projectSlug]

      setClientCookie('likes', updatedLikedProjects)

      return {
        likedProjects: updatedLikedProjects,
      }
    }),
  initialiseLikedProjects: (projects) =>
    set({
      likedProjects: projects,
    }),
  currentProjectLiked: (isProjectLiked) =>
    set({
      isCurrentProjectLiked: isProjectLiked,
    }),
}))

export const useLikedProjects = () =>
  useLikedProjectsStore((state) => state.likedProjects)

export const useCurrentProjectLiked = () =>
  useLikedProjectsStore((state) => state.isCurrentProjectLiked)
