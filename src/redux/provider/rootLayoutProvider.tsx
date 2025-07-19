'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { MainLayoutStore } from '../store/mainLayoutStore'
import { StoreSingleton } from '../store/storeSingleton'

type ProviderProps = {

  children: React.ReactNode,
}

export function RootLayoutProvider({ children }: ProviderProps) {
  const storeRef = useRef<MainLayoutStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = StoreSingleton.getInstance()
    // storeRef.current.dispatch(setShuffle(shuffleActive))
    // storeRef.current.dispatch(setCurrentProject(currentProject))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}