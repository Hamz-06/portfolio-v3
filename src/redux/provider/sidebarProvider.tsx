'use client'

import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { StoreSingleton } from '../store/storeSingleton'
import { setPlaylists } from '../slice/playlistSlice'
import { setToggleSidebar } from '../slice/layoutSlice'
import { Provider } from 'react-redux'

type ProviderProps = {
  children: React.ReactNode,
  playlists: PlaylistsSummary
  toggleSideBar: boolean
}


export function SidebarProvider({ children, playlists, toggleSideBar }: ProviderProps) {
  StoreSingleton.getInstance().dispatch(setToggleSidebar(toggleSideBar))
  StoreSingleton.getInstance().dispatch(setPlaylists(playlists))
  return <Provider store={StoreSingleton.getInstance()}>{children}</Provider>
}