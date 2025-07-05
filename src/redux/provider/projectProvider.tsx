'use client'
import { useRef } from 'react'
import { MainLayoutStore } from '../store/mainLayoutStore'

type ProviderProps = {
  children: React.ReactNode,
}

export function ProjectProvider({ children }: ProviderProps) {
  const storeRef = useRef<MainLayoutStore | null>(null)

  if (!storeRef.current) {


  }

  return <>{children}</>
}