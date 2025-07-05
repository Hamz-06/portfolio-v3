'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { MainLayoutStore } from '../store/mainLayoutStore'
import { setCurrentProject, setProjectsList, setShuffle } from '../slice/projectDataSlice'
import { CurrentProjectKey } from '@/actions/server-actions/cookies/currentProjectCookie'
import { StoreSingleton } from '../store/storeSingleton'
import { CategorisedProjects } from '@/schema/schema-types'


type ProviderProps = {
  projects: CategorisedProjects,
  shuffleActive: boolean,
  currentProject: CurrentProjectKey | null,
  children: React.ReactNode,
}

export function RootLayoutProvider({ children, projects, shuffleActive, currentProject }: ProviderProps) {
  const storeRef = useRef<MainLayoutStore | null>(null)
  console.log("RootLayoutProvider rendered")
  if (!storeRef.current) {
    storeRef.current = StoreSingleton.getInstance()
    storeRef.current.dispatch(setShuffle(shuffleActive))
    storeRef.current.dispatch(setProjectsList(projects))
    storeRef.current.dispatch(setCurrentProject(currentProject))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}