'use client'

import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { setPlaylists } from '../slice/playlistSlice'
import { setMobileToggleSidebar } from '../slice/layoutSlice'

type ProviderProps = {
  children: React.ReactNode,
  playlists: PlaylistsSummary
  toggleMobileSidebar: boolean
}

export function SidebarProvider({ children, playlists, toggleMobileSidebar }: ProviderProps) {
  StoreSingleton.getInstance().dispatch(setMobileToggleSidebar(toggleMobileSidebar))
  StoreSingleton.getInstance().dispatch(setPlaylists(playlists))
  return <>{children}</>
}