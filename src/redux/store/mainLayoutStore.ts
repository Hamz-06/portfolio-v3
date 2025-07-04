import { configureStore } from '@reduxjs/toolkit'
import projectListProvider from '../slice/projectListSlice'
import layoutProvider from '../slice/layoutSlice'
import styleProvider from '../slice/styleSlice'

export const mainLayoutStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectListProvider,
      layoutProvider: layoutProvider,
      styleProvider: styleProvider,
    },
    
  })
}

export type MainLayoutStore = ReturnType<typeof mainLayoutStore>

export type RootMainLayoutStore = ReturnType<MainLayoutStore['getState']>
export type AppMainLayoutStore = MainLayoutStore['dispatch']