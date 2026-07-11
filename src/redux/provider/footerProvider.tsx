'use client'

import React, { useEffect } from 'react'
import { StoreSingleton } from '../store/storeSingleton'
import { setProjectsArray, setShuffle } from '../slice/projectDataSlice'
import { CategorisedProject } from '@/sanity/schema/schema-types'

type FooterProviderProps = {
  children: React.ReactNode,
  projectsArray: CategorisedProject[]
  currentProject: CategorisedProject
  shuffleEnabled: boolean
}
function FooterProvider({ children, projectsArray, currentProject, shuffleEnabled }: FooterProviderProps) {
  StoreSingleton.getInstance().dispatch(setProjectsArray(projectsArray))
  StoreSingleton.getInstance().dispatch(setShuffle(shuffleEnabled))

  return (
    <>{children}</>
  )
}

export { FooterProvider }
