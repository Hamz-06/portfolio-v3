import { configureStore } from '@reduxjs/toolkit'
import projectDataProvider from '../slice/projectDataSlice'
import layoutProvider from '../slice/layoutSlice'
import styleProvider from '../slice/styleSlice'
import projectProvider from '../slice/projectSlice'

export const mainLayoutStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectDataProvider,
      layoutProvider: layoutProvider,
      styleProvider: styleProvider,
      projectProvider: projectProvider
    },
    
  })
}

export type MainLayoutStore = ReturnType<typeof mainLayoutStore>

export type RootMainLayoutStore = ReturnType<MainLayoutStore['getState']>
export type AppMainLayoutStore = MainLayoutStore['dispatch']