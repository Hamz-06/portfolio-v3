'use client'

import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { usePlaylistsStore } from '@/zustand/playlistQuery'
import { useEffect } from 'react'

type PlaylistProviderProps = {
  children: React.ReactNode
  playlists: PlaylistsSummary
}

export function PlaylistProvider({ children, playlists }: PlaylistProviderProps) {
  const initialisePlaylists = usePlaylistsStore((state) => state.initialisePlaylists)

  useEffect(() => {
    initialisePlaylists(playlists)
  }, [playlists, initialisePlaylists])

  return <>{children}</>
}
