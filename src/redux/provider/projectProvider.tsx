'use client'

import { Project } from '@/sanity/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { currentProjectLiked, setProject } from '../slice/projectPageSlice'
import { useEffect } from 'react'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
  isProjectLiked: boolean
}

export function ProjectProvider({ children, project, isProjectLiked }: ProviderProps) {
  useEffect(() => {
    StoreSingleton.getInstance().dispatch(currentProjectLiked(isProjectLiked))
    StoreSingleton.getInstance().dispatch(setProject(project))
  }, [project])
  // StoreSingleton.getInstance().dispatch(currentProjectLiked(isProjectLiked))
  // StoreSingleton.getInstance().dispatch(setProject(project))
  // StoreSingleton.getInstance().dispatch(initialiseLikedProjects(allLikedProjects))

  return <>{children}</>
}