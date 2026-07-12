import { PlaylistsSummary } from '@/sanity/schema/schema-types'
import { create } from 'zustand'

type PlaylistsState = {
  playlists: PlaylistsSummary | null
  queryPlaylistsResults: PlaylistsSummary | null
  initialisePlaylists: (playlists: PlaylistsSummary) => void
  setQueryResults: (playlists: PlaylistsSummary) => void
}

export const usePlaylistsStore = create<PlaylistsState>((set) => ({
  playlists: null,
  queryPlaylistsResults: null,
  // Initializes base playlists and search results together from server data.
  initialisePlaylists: (playlists) =>
    set({
      playlists,
      queryPlaylistsResults: playlists,
    }),
  setQueryResults: (playlists) =>
    set({
      queryPlaylistsResults: playlists,
    }),
}))

export const usePlaylists = () =>
  usePlaylistsStore((state) => state.playlists)

export const useQueryPlaylistsResults = () =>
  usePlaylistsStore((state) => state.queryPlaylistsResults)
