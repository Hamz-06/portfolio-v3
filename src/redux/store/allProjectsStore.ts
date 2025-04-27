import { configureStore } from '@reduxjs/toolkit'
import projectListProvider from '../slice/projectListSlice'


export const homePageStore = () => {
  return configureStore({
    reducer: {
      projectListProvider: projectListProvider,
    }
  })
}

export type AppStoreDashboard = ReturnType<typeof homePageStore>

export type RootStateDashboard = ReturnType<AppStoreDashboard['getState']>
export type AppDispatchDashboard = AppStoreDashboard['dispatch']