import { configureStore } from '@reduxjs/toolkit'
import projectDataProvider from '../slice/projectDataSlice'
import layoutProvider from '../slice/layoutSlice'
import styleProvider from '../slice/styleSlice'
import projectProvider from '../slice/projectSlice'
import profileProvider from '../slice/profileSlice'
import playlistsProvider from '../slice/playlists'

export const mainLayoutStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectDataProvider,
      layoutProvider: layoutProvider,
      styleProvider: styleProvider,
      projectProvider: projectProvider,
      profileProvider: profileProvider,
      playlistsProvider: playlistsProvider
    },
  })
}

export type MainLayoutStore = ReturnType<typeof mainLayoutStore>

export type RootMainLayoutStore = ReturnType<MainLayoutStore['getState']>
export type AppMainLayoutStore = MainLayoutStore['dispatch']