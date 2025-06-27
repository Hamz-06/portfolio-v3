import { configureStore } from '@reduxjs/toolkit'
import projectListProvider from '../slice/projectListSlice'
import layoutProvider from '../slice/layoutSlice'

export const mainLayoutStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectListProvider,
      layoutProvider: layoutProvider
    }
  })
}

export type MainLayoutStore = ReturnType<typeof mainLayoutStore>

export type RootMainLayoutStore = ReturnType<MainLayoutStore['getState']>
export type AppMainLayoutStore = MainLayoutStore['dispatch']