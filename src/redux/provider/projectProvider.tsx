'use client'

import { Project } from '@/sanity/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { currentProjectLiked, initialiseLikedProjects, setProject } from '../slice/projectPageSlice'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
  isProjectLiked: boolean
  allLikedProjects: string[]
}

export function ProjectProvider({ children, project, isProjectLiked, allLikedProjects }: ProviderProps) {
  // useEffect(() => {
  // StoreSingleton.getInstance().dispatch(currentProjectLiked(isProjectLiked))
  // StoreSingleton.getInstance().dispatch(setProject(project))
  // StoreSingleton.getInstance().dispatch(setLikedProjects(allLikedProjects))
  // }, [project])
  StoreSingleton.getInstance().dispatch(currentProjectLiked(isProjectLiked))
  StoreSingleton.getInstance().dispatch(setProject(project))
  StoreSingleton.getInstance().dispatch(initialiseLikedProjects(allLikedProjects))

  return <>{children}</>
}