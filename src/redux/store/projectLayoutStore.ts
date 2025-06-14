import { configureStore } from '@reduxjs/toolkit'
import exampleSlice from '../slice/exampleSlice'

export const projectStore = () => {
  return configureStore({
    reducer: {
      exampleSlice: exampleSlice,
    }
  })
}

export type MainProjectStore = ReturnType<typeof projectStore>

export type RootProjectStore = ReturnType<MainProjectStore['getState']>
export type AppProjectStore = MainProjectStore['dispatch']