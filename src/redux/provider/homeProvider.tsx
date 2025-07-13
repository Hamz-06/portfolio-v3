'use client'

import { StoreSingleton } from '../store/storeSingleton'
import { Playlists } from '@/schema/schema-types'
import { setPlaylists } from '../slice/playlistSlice'

type ProviderProps = {
  children: React.ReactNode,
  playlists: Playlists
}

export function HomeProvider({ children, playlists }: ProviderProps) {
  // todo: investigate if we need to use useEffect here
  // useEffect(() => {
  // console.log("Setting playlists in HomeProvider", playlists)
  // StoreSingleton.getInstance().dispatch(setPlaylists(playlists))
  // }, [playlists])

  StoreSingleton.getInstance().dispatch(setPlaylists(playlists))
  return <>{children}</>
}