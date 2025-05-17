'use client'
import { SanityHomeQuery } from '@/types/projects/projects'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStoreDashboard, layoutStore } from '../store/mainLayoutStore'
import { setCurrentProject, setProjectsList } from '../slice/projectListSlice'


type ProviderProps = {
  projects: SanityHomeQuery,
  currentProject: number | null,
  children: React.ReactNode,
}

export function MainLayoutProvider({ projects, currentProject, children }: ProviderProps) {
  const storeRef = useRef<AppStoreDashboard | null>(null)

  if (!storeRef.current) {
    storeRef.current = layoutStore()
    storeRef.current.dispatch(setProjectsList(projects))
    storeRef.current.dispatch(setCurrentProject(currentProject))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}