'use client'

import { CategorisedProject, Project } from '@/sanity/schema/schema-types'
import { useEffect } from 'react'
import { setClientCookie } from '@/helper/cookieHelperClient'
import { useLikedProjectsStore } from '@/zustand/likedProjects'
import { usePathname } from 'next/navigation'
import { setToggleSidebar } from '@/zustand/toggleSidebar'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
  isProjectLiked: boolean
}


export function ProjectProvider({ children, project, isProjectLiked }: ProviderProps) {
  const pathname = usePathname()
  const setCurrentProjectLiked = useLikedProjectsStore((state) => state.currentProjectLiked)

  useEffect(() => {
    saveCurrentProject(project)
    setCurrentProjectLiked(isProjectLiked)
  }, [project, isProjectLiked, setCurrentProjectLiked])

  useEffect(() => {

    setToggleSidebar(false)
  }, [pathname])

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