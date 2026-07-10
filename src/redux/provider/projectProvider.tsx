'use client'

import { CategorisedProject, Project } from '@/sanity/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { currentProjectLiked } from '../slice/projectPageSlice'
import { useEffect } from 'react'
import { setToggleSidebar } from '../slice/layoutSlice'
import { setClientCookie } from '@/actions/cookies/cookieHelperClient'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
  isProjectLiked: boolean
}

export function ProjectProvider({ children, project, isProjectLiked }: ProviderProps) {
  useEffect(() => {
    saveCurrentProject(project)
    StoreSingleton.getInstance().dispatch(setToggleSidebar(false))
    StoreSingleton.getInstance().dispatch(currentProjectLiked(isProjectLiked))
  }, [])

  return <>{children}</>
}

const saveCurrentProject = (project: NonNullable<Project>): CategorisedProject => {
  const categorisedProject: CategorisedProject = {
    first_image_url: project.project_images[0],
    project_type: project.project_type,
    slug: project.slug,
    title: project.title,
    sub_title: project.sub_title,
  }
  setClientCookie('current-project', {
    category: categorisedProject.project_type,
    project_slug: categorisedProject.slug
  })
  return categorisedProject;
}