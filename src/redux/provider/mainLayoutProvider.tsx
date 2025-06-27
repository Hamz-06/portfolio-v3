'use client'
import { SanityHomeQuery } from '@/types/projects/projects'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { MainLayoutStore, mainLayoutStore } from '../store/mainLayoutStore'
import { setCurrentProject, setProjectsList } from '../slice/projectListSlice'


type ProviderProps = {
  projects: SanityHomeQuery,
  currentProject: number | null,
  children: React.ReactNode,
}

export function MainLayoutProvider({ projects, currentProject, children }: ProviderProps) {
  const storeRef = useRef<MainLayoutStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = mainLayoutStore()
    storeRef.current.dispatch(setProjectsList(projects))
    storeRef.current.dispatch(setCurrentProject(currentProject))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}