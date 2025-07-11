'use client'

import { Project } from '@/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { setProject } from '../slice/projectSlice'
import { useEffect } from 'react'
import { currentProjectLiked, setLikedProjects } from '../slice/projectDataSlice'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
  isProjectLiked: boolean
  allLikedProjects: string[]
}

export function ProjectProvider({ children, project, isProjectLiked, allLikedProjects }: ProviderProps) {
  useEffect(() => {
    StoreSingleton.getInstance().dispatch(currentProjectLiked(isProjectLiked))
    StoreSingleton.getInstance().dispatch(setProject(project))
    StoreSingleton.getInstance().dispatch(setLikedProjects(allLikedProjects))
  }, [project])

  return <>{children}</>
}