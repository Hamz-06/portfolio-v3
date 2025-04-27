'use client'
import { SanityHomeQuery } from '@/types/projects/projects'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStoreDashboard, homePageStore } from '../store/allProjectsStore'
import { setProjectsList } from '../slice/projectListSlice'


type ProviderProps = {
  projects: SanityHomeQuery,
  children: React.ReactNode,
}

export function DashboardProvider({ projects, children }: ProviderProps) {
  const storeRef = useRef<AppStoreDashboard | null>(null)

  if (!storeRef.current) {
    storeRef.current = homePageStore()
    storeRef.current.dispatch(setProjectsList(projects))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}