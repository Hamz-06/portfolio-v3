'use client'

import { StoreSingleton } from '../store/storeSingleton'
import { setToggleSidebar } from '../slice/layoutSlice'
import { useEffect } from 'react'

type ProviderProps = {
  children: React.ReactNode,
}

// set the toggleSidebar to true when on the portfolio page
export function PortfolioProvider({ children }: ProviderProps) {
  useEffect(() => {
    StoreSingleton.getInstance().dispatch(setToggleSidebar(true))
  }, []);
  return <>{children}</>
}