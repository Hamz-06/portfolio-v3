import { configureStore } from '@reduxjs/toolkit'
import projectDataProvider from '../slice/projectDataSlice'
import layoutProvider from '../slice/layoutSlice'
import styleProvider from '../slice/styleSlice'
import projectPageProvider from '../slice/projectPageSlice'
import profileProvider from '../slice/profileSlice'
import playlistsProvider from '../slice/playlistSlice'

export const mainLayoutStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectDataProvider,
      layoutProvider: layoutProvider,
      styleProvider: styleProvider,
      projectPageProvider: projectPageProvider,
      profileProvider: profileProvider,
      playlistsProvider: playlistsProvider
    },
  })
}

export type MainLayoutStore = ReturnType<typeof mainLayoutStore>

export type RootMainLayoutStore = ReturnType<MainLayoutStore['getState']>
export type AppMainLayoutStore = MainLayoutStore['dispatch']