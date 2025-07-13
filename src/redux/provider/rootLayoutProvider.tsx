'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { MainLayoutStore } from '../store/mainLayoutStore'
import { setCurrentProject, setProjectsList, setShuffle } from '../slice/projectDataSlice'
import { StoreSingleton } from '../store/storeSingleton'
import { CategorisedProjects, Profile } from '@/schema/schema-types'
import { setProfile } from '../slice/profileSlice'
import { CurrentProjectCookieKey } from '@/types/cookieTypes'


type ProviderProps = {
  projects: CategorisedProjects,
  shuffleActive: boolean,
  currentProject: CurrentProjectCookieKey | null,
  userProfile: NonNullable<Profile>,
  children: React.ReactNode,
}

export function RootLayoutProvider({ children, projects, shuffleActive, currentProject, userProfile }: ProviderProps) {
  const storeRef = useRef<MainLayoutStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = StoreSingleton.getInstance()
    storeRef.current.dispatch(setShuffle(shuffleActive))
    storeRef.current.dispatch(setProjectsList(projects))
    storeRef.current.dispatch(setCurrentProject(currentProject))
    storeRef.current.dispatch(setProfile(userProfile))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}