import { configureStore } from '@reduxjs/toolkit'
import projectListProvider from '../slice/projectListSlice'
import layoutProvider from '../slice/layoutSlice'

export const layoutStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectListProvider,
      layoutProvider: layoutProvider
    }
  })
}

export type AppStoreDashboard = ReturnType<typeof layoutStore>

export type RootStateDashboard = ReturnType<AppStoreDashboard['getState']>
export type AppDispatchDashboard = AppStoreDashboard['dispatch']