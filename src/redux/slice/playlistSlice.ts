import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";
import { PlaylistsSummary } from "@/sanity/schema/schema-types";

interface PlaylistsState {
  playlists: PlaylistsSummary | null,
  queryPlaylistsResults: PlaylistsSummary | null, //used for search results
}

const initialState: PlaylistsState = {
  playlists: null,
  queryPlaylistsResults: null
}

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<PlaylistsSummary>) => {
      state.playlists = action.payload;
      state.queryPlaylistsResults = action.payload
    },
    setQueryResults: (state, action: PayloadAction<PlaylistsSummary>) => {
      state.queryPlaylistsResults = action.payload;
    },
  }
})

export const { setPlaylists, setQueryResults } = playlistsSlice.actions;


export const usePlaylists = (): PlaylistsState['playlists'] =>
  useSelector((state: RootMainLayoutStore) => state.playlistsProvider.playlists)
export const useQueryPlaylistsResults = (): PlaylistsState['queryPlaylistsResults'] =>
  useSelector((state: RootMainLayoutStore) => state.playlistsProvider.queryPlaylistsResults)
export default playlistsSlice.reducer