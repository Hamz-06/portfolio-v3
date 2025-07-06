'use client'

import { Project } from '@/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { setProject } from '../slice/projectSlice'
import { useEffect } from 'react'

type ProviderProps = {
  children: React.ReactNode,
  project: NonNullable<Project>
}

export function ProjectProvider({ children, project }: ProviderProps) {
  useEffect(() => {
    StoreSingleton.getInstance().dispatch(setProject(project))
  }, [project])

  return <>{children}</>
}