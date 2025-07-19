'use client'

import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { setPlaylists } from '../slice/playlistSlice'

type ProviderProps = {
  children: React.ReactNode,
  playlists: PlaylistsSummary
}

export function SidebarProvider({ children, playlists }: ProviderProps) {
  StoreSingleton.getInstance().dispatch(setPlaylists(playlists))
  return <>{children}</>
}