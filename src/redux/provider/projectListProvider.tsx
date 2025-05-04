'use client'
import { SanityHomeQuery, SanityProject } from '@/types/projects/projects'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStoreDashboard, homePageStore } from '../store/allProjectsStore'
import { setCurrentProject, setProjectsList } from '../slice/projectListSlice'


type ProviderProps = {
  projects: SanityHomeQuery,
  currentProject: SanityProject | null,
  children: React.ReactNode,
}

export function DashboardProvider({ projects, currentProject, children }: ProviderProps) {
  const storeRef = useRef<AppStoreDashboard | null>(null)

  if (!storeRef.current) {
    storeRef.current = homePageStore()
    storeRef.current.dispatch(setProjectsList(projects))
    storeRef.current.dispatch(setCurrentProject(currentProject))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}