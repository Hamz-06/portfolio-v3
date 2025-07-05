'use client'

import { Project } from '@/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { setProject } from '../slice/projectSlice'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
}

export function ProjectProvider({ children, project }: ProviderProps) {
  StoreSingleton.getInstance().dispatch(setProject(project))

  console.log("ProjectProvider rendered")
  return <>{children}</>
}